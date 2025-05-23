import { useEffect, useRef, useState } from "react";
import * as THREE from "three";
import { OrbitControls } from "./OrbitControls.js";
import { CSS2DRenderer, CSS2DObject } from "./CSS2DRenderer.js";
import { CSS3DRenderer, CSS3DObject } from "./CSS3DRenderer.js";
import { useNavigate } from "react-router-dom";
import { Loader } from "./Loader.js";

export function TestThree({ pagetype, loadingText, additionalLoading }) {
  const [isLoading, setIsLoading] = useState(true);
  const [count, setCount] = useState(0);
  const mountRef = useRef(null);
  const timerRef = useRef(null);
  const navigate = useNavigate();

  useEffect(() => {
    setIsLoading(true);
    setCount(0);
  }, [pagetype]);

  useEffect(() => {
    console.log(count);
    if (
      (pagetype === "" && count === 6) ||
      (pagetype === "Culture" && count === 19) ||
      (pagetype === "Ecology" && count === 16) ||
      (pagetype === "Technology" && count === 17) ||
      (pagetype === "Social" && count === 21) ||
      (pagetype === "People" && count === 54) ||
      count === 54
    ) {
      console.log("loaded");
      additionalLoading && setIsLoading(false);
    }
  }, [count, pagetype, additionalLoading]);

  useEffect(() => {
    const mountRefCurr = mountRef.current;
    const renderer = new THREE.WebGL1Renderer({
      antialias: true,
      alpha: true,
    });

    let camera, scene;
    let scene2, renderer2, sceneC;
    let labelRenderer;
    const frustumSize = 250;

    init();
    animate();

    function init() {
      const aspect = window.innerWidth / window.innerHeight;
      camera = new THREE.OrthographicCamera(
        (frustumSize * aspect) / -2,
        (frustumSize * aspect) / 2,
        frustumSize / 2,
        frustumSize / -2,
        1,
        1000
      );
      camera.position.set(-200, 200, 200);
      scene = new THREE.Scene();
      scene.background = null;
      scene2 = new THREE.Scene();
      sceneC = new THREE.Scene();

      const buttonType = [
        "Culture",
        "Ecology",
        "Social",
        "Technology",
        "People",
      ];
      const index = buttonType.indexOf(pagetype);
      if (pagetype !== buttonType[index]) {
        // left
        createPlane(
          100,
          100,
          "transparent",
          new THREE.Vector3(-50, 0, 0),
          new THREE.Euler(0, -90 * THREE.MathUtils.DEG2RAD, 0),
          require("../assets/mapped_images/cplain.jpg"),
          require("../assets/mapped_images/white.jpg"),
          "MSCP L8<br>Parklane Shopping Mall",
          "center",
          "https://www.parklaneshoppingmall.com/location/"
        );
        // right
        createPlane(
          100,
          100,
          "transparent",
          new THREE.Vector3(0, 0, 50),
          new THREE.Euler(0, 0, 0),
          require("../assets/mapped_images/bplain.jpg"),
          require("../assets/mapped_images/white.jpg"),
          "Countdown",
          "center",
          ""
        );
        // top
        createPlane(
          100,
          100,
          "white",
          new THREE.Vector3(0, 50, 0),
          new THREE.Euler(-90 * THREE.MathUtils.DEG2RAD, 0, 0),
          require("../assets/mapped_images/a.jpg"),
          require("../assets/mapped_images/a_hover.png"),
          "", //title alr on image
          "right",
          "about"
        );
        // bottom
        createPlane(
          100,
          100,
          "transparent",
          new THREE.Vector3(0, -50, 0),
          new THREE.Euler(-90 * THREE.MathUtils.DEG2RAD, 0, 0),
          require("../assets/mapped_images/f.jpg"),
          require("../assets/mapped_images/f.jpg"), //bottom so no text needed
          "",
          "center",
          ""
        );

        // front
        createPlane(
          100,
          100,
          "transparent",
          new THREE.Vector3(50, 0, 0),
          new THREE.Euler(0, 90 * THREE.MathUtils.DEG2RAD, 0),
          require("../assets/mapped_images/eplain.jpg"),
          require("../assets/mapped_images/white.jpg"),
          "Projects",
          "center",
          "projects"
        );

        // back
        createPlane(
          100,
          100,
          "transparent",
          new THREE.Vector3(0, 0, -50),
          new THREE.Euler(0, -180 * THREE.MathUtils.DEG2RAD, 0),
          require("../assets/mapped_images/dplain.jpg"),
          require("../assets/mapped_images/white.jpg"),
          "People",
          "center",
          "students"
        );
      }
      let texture = new THREE.TextureLoader().load();
      texture.generateMipmaps = false;
      texture.minFilter = THREE.LinearFilter;
      texture.needsUpdate = true;

      //				renderer = new THREE.WebGLRenderer(); //defined on top
      renderer.setPixelRatio(window.devicePixelRatio);
      renderer.setSize(window.innerWidth, window.innerHeight);
      renderer.setClearColor(0x000000, 0);
      mountRefCurr.appendChild(renderer.domElement);

      //
      labelRenderer = new CSS2DRenderer();
      labelRenderer.setSize(window.innerWidth, window.innerHeight);
      labelRenderer.domElement.style.position = "absolute";
      labelRenderer.domElement.style.top = "0px";
      mountRefCurr.appendChild(labelRenderer.domElement);
      ////
      const controls2d = new OrbitControls(camera, labelRenderer.domElement);
      //                   controls2d.minDistance = 5;
      //                  controls2d.maxDistance = 100;

      //                       controls2d.addEventListener( 'dragstart', offLabel ); //does not work, just set to timer
      //                    function offLabel(){
      //                        console.log("removelabel");
      ////                        object.remove(objectLabel);
      //                        labelRenderer.dispose();
      //                    }

      renderer2 = new CSS3DRenderer();
      renderer2.setSize(window.innerWidth, window.innerHeight);
      renderer2.domElement.style.position = "absolute";
      renderer2.domElement.style.top = 0;
      mountRefCurr.appendChild(renderer2.domElement);

      const controls = new OrbitControls(camera, renderer2.domElement);
      controls.minZoom = 0.5;
      controls.maxZoom = 2;

      function createPlane(
        width,
        height,
        cssColor,
        pos,
        rot,
        backgroundImageUrl,
        newImageUrl,
        text,
        alignment,
        pageUrl
      ) {
        let img = new Image();
        img.src = backgroundImageUrl;
        if (img.complete) {
          setCount((c) => (c += 1));
        } else {
          img.onload = function () {
            setCount((c) => (c += 1));
          };
        }

        const element = document.createElement("div");
        element.style.width = width + "px";
        element.style.height = height + "px";
        element.style.opacity = 1;
        element.style.background = cssColor;
        element.style.backgroundImage = `url(${backgroundImageUrl})`;
        element.style.backgroundSize = "cover";
        element.innerHTML = text;
        element.classList.add("plane-text-class");
        element.style.textAlign = alignment;
        element.addEventListener("mouseover", function () {
          element.style.backgroundImage = `url(${newImageUrl})`;
        });
        element.addEventListener("mouseout", function () {
          element.style.backgroundImage = `url(${backgroundImageUrl})`;
        });

        if (pageUrl) {
          element.style.cursor = "pointer";
          element.addEventListener("mousedown", function () {
            pageUrl.includes("https://")
              ? window.open(pageUrl)
              : navigate(pageUrl);
          });
        }

        if (text === "Countdown") {
          const countdownElement = document.createElement("div");
          setInterval(function () {
            countdownElement.innerHTML = timerRef.innerHTML;
            element.innerHTML = countdownElement.innerHTML;
          }, 1000);
        } else {
          element.innerHTML = text;
        }

        function countdown() {
          var countDownDate = new Date("10 Mar 2023 00:00:00").getTime();
          var x = setInterval(function () {
            var now = new Date().getTime();
            var distance = countDownDate - now;
            var days = Math.floor(distance / (1000 * 60 * 60 * 24));
            var hours = Math.floor(
              (distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)
            );
            var minutes = Math.floor(
              (distance % (1000 * 60 * 60)) / (1000 * 60)
            );
            var seconds = Math.floor((distance % (1000 * 60)) / 1000);
            timerRef.innerHTML =
              days +
              "days " +
              hours +
              "hours " +
              minutes +
              "mins " +
              seconds +
              "secs ";
            if (distance < 0) {
              clearInterval(x);
              timerRef.innerHTML = "10-31 March 2023";
            }
          }, 1000);
        }
        countdown();

        const object = new CSS3DObject(element);
        object.position.copy(pos);
        object.rotation.copy(rot);
        scene2.add(object);

        if (element.style.textAlign !== "center") {
          const objDiv = document.createElement("div");
          objDiv.className = "label";
          objDiv.textContent = "💡 Drag the space around me to rotate!";
          const objectLabel = new CSS2DObject(objDiv);
          objectLabel.position.set(50, 55, 5);
          object.add(objectLabel);

          function disappear() {
            object.remove(objectLabel);
          }
          setInterval(() => {
            disappear();
          }, 10000); //label to disappear after 10sec
        }
      }

      const planes = [];
      const frontPos = [
        new THREE.Vector3(100 / 3, -100 / 3, 50),
        new THREE.Vector3(0, -100 / 3, 50),
        new THREE.Vector3(-100 / 3, -100 / 3, 50),
        new THREE.Vector3(100 / 3, 0, 50),
        new THREE.Vector3(0, 0, 50),
        new THREE.Vector3(-100 / 3, 0, 50),
        new THREE.Vector3(100 / 3, 100 / 3, 50),
        new THREE.Vector3(0, 100 / 3, 50),
        new THREE.Vector3(-100 / 3, 100 / 3, 50),
      ];

      const leftPos = [
        new THREE.Vector3(-50, -100 / 3, 100 / 3),
        new THREE.Vector3(-50, -100 / 3, 0),
        new THREE.Vector3(-50, -100 / 3, -100 / 3),
        new THREE.Vector3(-50, 0, 100 / 3),
        new THREE.Vector3(-50, 0, 0),
        new THREE.Vector3(-50, 0, -100 / 3),
        new THREE.Vector3(-50, 100 / 3, 100 / 3),
        new THREE.Vector3(-50, 100 / 3, 0),
        new THREE.Vector3(-50, 100 / 3, -100 / 3),
      ];

      const rightPos = [
        new THREE.Vector3(50, -100 / 3, -100 / 3),
        new THREE.Vector3(50, -100 / 3, 0),
        new THREE.Vector3(50, -100 / 3, 100 / 3),
        new THREE.Vector3(50, 0, -100 / 3),
        new THREE.Vector3(50, 0, 0),
        new THREE.Vector3(50, 0, 100 / 3),
        new THREE.Vector3(50, 100 / 3, -100 / 3),
        new THREE.Vector3(50, 100 / 3, 0),
        new THREE.Vector3(50, 100 / 3, 100 / 3),
      ];

      const backPos = [
        new THREE.Vector3(-100 / 3, -100 / 3, -50),
        new THREE.Vector3(0, -100 / 3, -50),
        new THREE.Vector3(100 / 3, -100 / 3, -50),
        new THREE.Vector3(-100 / 3, 0, -50),
        new THREE.Vector3(0, 0, -50),
        new THREE.Vector3(100 / 3, 0, -50),
        new THREE.Vector3(-100 / 3, 100 / 3, -50),
        new THREE.Vector3(0, 100 / 3, -50),
        new THREE.Vector3(100 / 3, 100 / 3, -50),
      ];

      const topPos = [
        new THREE.Vector3(100 / 3, 50, 100 / 3),
        new THREE.Vector3(100 / 3, 50, 0),
        new THREE.Vector3(100 / 3, 50, -100 / 3),
        new THREE.Vector3(0, 50, 100 / 3),
        new THREE.Vector3(0, 50, 0),
        new THREE.Vector3(0, 50, -100 / 3),
        new THREE.Vector3(-100 / 3, 50, 100 / 3),
        new THREE.Vector3(-100 / 3, 50, 0),
        new THREE.Vector3(-100 / 3, 50, -100 / 3),
      ];

      const bottomPos = [
        new THREE.Vector3(-100 / 3, -50, 100 / 3),
        new THREE.Vector3(-100 / 3, -50, 0),
        new THREE.Vector3(-100 / 3, -50, -100 / 3),
        new THREE.Vector3(0, -50, 100 / 3),
        new THREE.Vector3(0, -50, 0),
        new THREE.Vector3(0, -50, -100 / 3),
        new THREE.Vector3(100 / 3, -50, 100 / 3),
        new THREE.Vector3(100 / 3, -50, 0),
        new THREE.Vector3(100 / 3, -50, -100 / 3),
      ];

      const topImg_hover = [
        require("../assets/mapped_images/top9.jpg"),
        require("../assets/mapped_images/top8.jpg"),
        require("../assets/mapped_images/top7.jpg"),
        require("../assets/mapped_images/top6.jpg"),
        require("../assets/mapped_images/top5.jpg"),
        require("../assets/mapped_images/top4.jpg"),
        require("../assets/mapped_images/top3.jpg"),
        require("../assets/mapped_images/top2.jpg"),
        require("../assets/mapped_images/top1.jpg"),
      ];

      const frontImg_hover = [
        require("../assets/mapped_images/front9.jpg"),
        require("../assets/mapped_images/front8.jpg"),
        require("../assets/mapped_images/front7.jpg"),
        require("../assets/mapped_images/front6.jpg"),
        require("../assets/mapped_images/front5.jpg"),
        require("../assets/mapped_images/front4.jpg"),
        require("../assets/mapped_images/front3.jpg"),
        require("../assets/mapped_images/front2.jpg"),
        require("../assets/mapped_images/front1.jpg"),
      ];

      const backImg_hover = [
        require("../assets/mapped_images/back9.jpg"),
        require("../assets/mapped_images/back8.jpg"),
        require("../assets/mapped_images/back7.jpg"),
        require("../assets/mapped_images/back6.jpg"),
        require("../assets/mapped_images/back5.jpg"),
        require("../assets/mapped_images/back4.jpg"),
        require("../assets/mapped_images/back3.jpg"),
        require("../assets/mapped_images/back2.jpg"),
        require("../assets/mapped_images/back1.jpg"),
      ];

      const leftImg_hover = [
        require("../assets/mapped_images/left9.jpg"),
        require("../assets/mapped_images/left8.jpg"),
        require("../assets/mapped_images/left7.jpg"),
        require("../assets/mapped_images/left6.jpg"),
        require("../assets/mapped_images/left5.jpg"),
        require("../assets/mapped_images/left4.jpg"),
        require("../assets/mapped_images/left3.jpg"),
        require("../assets/mapped_images/left2.jpg"),
        require("../assets/mapped_images/left1.jpg"),
      ];

      const rightImg_hover = [
        require("../assets/mapped_images/right9.jpg"),
        require("../assets/mapped_images/right8.jpg"),
        require("../assets/mapped_images/right7.jpg"),
        require("../assets/mapped_images/right6.jpg"),
        require("../assets/mapped_images/right5.jpg"),
        require("../assets/mapped_images/right4.jpg"),
        require("../assets/mapped_images/right3.jpg"),
        require("../assets/mapped_images/right2.jpg"),
        require("../assets/mapped_images/right1.jpg"),
      ];

      const bottomImg_hover = [
        require("../assets/mapped_images/bottom9.jpg"),
        require("../assets/mapped_images/bottom8.jpg"),
        require("../assets/mapped_images/bottom7.jpg"),
        require("../assets/mapped_images/bottom6.jpg"),
        require("../assets/mapped_images/bottom5.jpg"),
        require("../assets/mapped_images/bottom4.jpg"),
        require("../assets/mapped_images/bottom3.jpg"),
        require("../assets/mapped_images/bottom2.jpg"),
        require("../assets/mapped_images/bottom1.jpg"),
      ];

      //culture: 19, ecology: 16, social: 21, tech: 17

      const c_frontTitle = [
        "",
        "Komorebi",
        "",
        "EC(H)O",
        "",
        "MoMA: The Winding Gallery",
        "",
        "Interweaving Places",
        "",
      ];
      const c_frontImg_og = [
        "",
        require("../assets/project_images/ct01/ct01-thumbnail.jpg"),
        "",
        require("../assets/project_images/ct02/ct02-thumbnail.jpg"),
        "",
        require("../assets/project_images/ct03/ct03-thumbnail.jpg"),
        "",
        require("../assets/project_images/ct04/ct04-thumbnail.jpg"),
        "",
      ];

      const c_leftTitle = [
        "Singularity",
        "",
        "",
        "",
        "Open Library",
        "",
        "",
        "",
        "Tripartite Library",
      ];
      const c_leftImg_og = [
        require("../assets/project_images/ct05/ct05-thumbnail.jpg"),
        "",
        "",
        "",
        require("../assets/project_images/ct06/ct06-thumbnail.jpg"),
        "",
        "",
        "",
        require("../assets/project_images/ct07/ct07-thumbnail.jpg"),
      ];

      const c_rightTitle = [
        "Dream Theatre",
        "",
        "",
        "",
        "The Dualistic Museum",
        "",
        "",
        "",
        "The River of Falls",
      ];
      const c_rightImg_og = [
        require("../assets/project_images/ct08/ct08-thumbnail.jpg"),
        "",
        "",
        "",
        require("../assets/project_images/ct09/ct09-thumbnail.jpg"),
        "",
        "",
        "",
        require("../assets/project_images/ct10/ct10-thumbnail.jpg"),
      ];
      const c_backTitle = [
        "Creative Quarters",
        "",
        "",
        "",
        "Bio-Flux",
        "",
        "",
        "",
        "Baptism Of Water",
      ];
      const c_backImg_og = [
        require("../assets/project_images/ct11/ct11-thumbnail.jpg"),
        "",
        "",
        "",
        require("../assets/project_images/ct12/ct12-thumbnail.jpg"),
        "",
        "",
        "",
        require("../assets/project_images/ct13/ct13-thumbnail.jpg"),
      ];

      const c_topTitle = [
        "Intervention à l' unité d'habitation",
        "",
        "",
        "",
        "Scaffold: Reconstruction of the post fire Cathédrale Notre Dame...",
        "",
        "",
        "",
        "Restoration | Notre Dame: Celebration of History",
      ];
      const c_topImg_og = [
        require("../assets/project_images/ct14/ct14-thumbnail.jpg"),
        "",
        "",
        "",
        require("../assets/project_images/ct15/ct15-thumbnail.jpg"),
        "",
        "",
        "",
        require("../assets/project_images/ct16/ct16-thumbnail.jpg"),
      ];

      const c_bottomTitle = [
        "The Isolation Room",
        "",
        "",
        "",
        "Eras",
        "",
        "",
        "",
        "Latter Rain",
      ];
      const c_bottomImg_og = [
        require("../assets/project_images/ct17/ct17-thumbnail.jpg"),
        "",
        "",
        "",
        require("../assets/project_images/ct18/ct18-thumbnail.jpg"),
        "",
        "",
        "",
        require("../assets/project_images/ct19/ct19-thumbnail.jpg"),
      ];
      //testing for culture project links
      const c_frontUrl = [
        "",
        "komorebi",
        "",
        "echo",
        "",
        "winding-museum",
        "",
        "interweaving-places",
        "",
      ];
      const c_backUrl = [
        "creative-quarters",
        "",
        "",
        "",
        "bio-flux",
        "",
        "",
        "",
        "baptism-of-water",
      ];
      const c_leftUrl = [
        "singularity",
        "",
        "",
        "",
        "open-library",
        "",
        "",
        "",
        "tripartite-library",
      ];
      const c_rightUrl = [
        "dream-theatre",
        "",
        "",
        "",
        "dualistic-museum",
        "",
        "",
        "",
        "river-of-falls",
      ];
      const c_topUrl = [
        "united-habitation-intervention",
        "",
        "",
        "",
        "scaffold",
        "",
        "",
        "",
        "celebration-of-history",
      ];
      const c_bottomUrl = [
        "isolation-room",
        "",
        "",
        "",
        "eras",
        "",
        "",
        "",
        "latter-rain",
      ];

      //for ecology
      const e_frontTitle = [
        "Memoirs of Spaces",
        "",
        "",
        "",
        "Checkpoint",
        "",
        "",
        "",
        "Middle Grounds",
      ];
      const e_frontImg_og = [
        require("../assets/project_images/ec01/ec01-thumbnail.jpg"),
        "",
        "",
        "",
        require("../assets/project_images/ec02/ec02-thumbnail.jpg"),
        "",
        "",
        "",
        require("../assets/project_images/ec03/ec03-thumbnail.jpg"),
      ];

      const e_leftTitle = [
        "Inter-gen Terraces",
        "",
        "",
        "",
        "Fractal Forest",
        "",
        "",
        "",
        "ONBOARD",
      ];
      const e_leftImg_og = [
        require("../assets/project_images/ec04/ec04-thumbnail.jpg"),
        "",
        "",
        "",
        require("../assets/project_images/ec05/ec05-thumbnail.jpg"),
        "",
        "",
        "",
        require("../assets/project_images/ec06/ec06-thumbnail.jpg"),
      ];

      const e_rightTitle = [
        "Volant Visions",
        "",
        "",
        "",
        "WEAVE",
        "",
        "",
        "",
        "Filter Farm",
      ];
      const e_rightImg_og = [
        require("../assets/project_images/ec07/ec07-thumbnail.jpg"),
        "",
        "",
        "",
        require("../assets/project_images/ec08/ec08-thumbnail.jpg"),
        "",
        "",
        "",
        require("../assets/project_images/ec09/ec09-thumbnail.jpg"),
      ];

      const e_topTitle = [
        "Bio-Bridge",
        "",
        "",
        "",
        "Re-Growth",
        "",
        "",
        "",
        "The Urban Shrub Expansion",
      ];
      const e_topImg_og = [
        require("../assets/project_images/ec10/ec10-thumbnail.jpg"),
        "",
        "",
        "",
        require("../assets/project_images/ec11/ec11-thumbnail.jpg"),
        "",
        "",
        "",
        require("../assets/project_images/ec12/ec12-thumbnail.jpg"),
      ];

      const e_backTitle = [
        "Intervention | The Convent of La Tourette",
        "",
        "",
        "",
        "",
        "",
        "",
        "",
        "Sitting Conveniences",
      ];

      const e_backImg_og = [
        require("../assets/project_images/ec13/ec13-thumbnail.jpg"),
        "",
        "",
        "",
        "",
        "",
        "",
        "",
        require("../assets/project_images/ec14/ec14-thumbnail.jpg"),
      ];

      const e_bottomTitle = [
        "Regrowth",
        "",
        "",
        "",
        "",
        "",
        "",
        "",
        "Beach Lamp",
      ];
      const e_bottomImg_og = [
        require("../assets/project_images/ec15/ec15-thumbnail.jpg"),
        "",
        "",
        "",
        "",
        "",
        "",
        "",
        require("../assets/project_images/ec16/ec16-thumbnail.jpg"),
      ];
      //testing for ecology project links
      const e_frontUrl = [
        "memoirs-of-spaces",
        "",
        "",
        "",
        "checkpoint",
        "",
        "",
        "",
        "middle-grounds",
      ];
      const e_backUrl = [
        "convent-of-la-tourette",
        "",
        "",
        "",
        "",
        "",
        "",
        "",
        "sitting-conveniences",
      ];
      const e_leftUrl = [
        "inter-gen-terraces",
        "",
        "",
        "",
        "fractal-forest",
        "",
        "",
        "",
        "onboard",
      ];
      const e_rightUrl = [
        "volant-visions",
        "",
        "",
        "",
        "weave",
        "",
        "",
        "",
        "filter-farm",
      ];
      const e_topUrl = [
        "bio-bridge",
        "",
        "",
        "",
        "re-growth",
        "",
        "",
        "",
        "urban-shrub-expansion",
      ];
      const e_bottomUrl = [
        "regrowth",
        "",
        "",
        "",
        "",
        "",
        "",
        "",
        "beach-lamp",
      ];

      //for social
      const s_frontTitle = [
        "",
        "Heart in a Heart",
        "",
        "Wellness",
        "",
        "The Urban Stitch",
        "",
        "Regrowth",
        "",
      ];
      const s_frontImg_og = [
        "",
        require("../assets/project_images/sc01/sc01-thumbnail.jpg"),
        "",
        require("../assets/project_images/sc02/sc02-thumbnail.jpg"),
        "",
        require("../assets/project_images/sc03/sc03-thumbnail.jpg"),
        "",
        require("../assets/project_images/sc04/sc04-thumbnail.jpg"),
        "",
      ];

      const s_leftTitle = [
        "",
        "Flora Scapes",
        "",
        "Unspoken Interactions",
        "",
        "Wellness2",
        "",
        "dis(connect)",
        "",
      ];
      const s_leftImg_og = [
        "",
        require("../assets/project_images/sc05/sc05-thumbnail.jpg"),
        "",
        require("../assets/project_images/sc06/sc06-thumbnail.jpg"),
        "",
        require("../assets/project_images/sc07/sc07-thumbnail.jpg"),
        "",
        require("../assets/project_images/sc08/sc08-thumbnail.jpg"),
        "",
      ];

      const s_rightTitle = [
        "",
        "Co-Nectar",
        "",
        "Kinetic Forest",
        "",
        "STEPS",
        "",
        "Roundabouts",
        "",
      ];
      const s_rightImg_og = [
        "",
        require("../assets/project_images/sc09/sc09-thumbnail.jpg"),
        "",
        require("../assets/project_images/sc10/sc10-thumbnail.jpg"),
        "",
        require("../assets/project_images/sc11/sc11-thumbnail.jpg"),
        "",
        require("../assets/project_images/sc12/sc12-thumbnail.jpg"),
        "",
      ];

      const s_topTitle = [
        "A Million Holes",
        "",
        "",
        "",
        "WeCare",
        "",
        "",
        "",
        "Deafspace @DDDK",
      ];

      const s_topImg_og = [
        require("../assets/project_images/sc13/sc13-thumbnail.jpg"),
        "",
        "",
        "",
        require("../assets/project_images/sc14/sc14-thumbnail.jpg"),
        "",
        "",
        "",
        require("../assets/project_images/sc15/sc15-thumbnail.jpg"),
      ];

      const s_backTitle = [
        "Starchamps Playground",
        "",
        "",
        "",
        "The Hidden Cave Respite",
        "",
        "",
        "",
        "Curly Cove",
      ];
      const s_backImg_og = [
        require("../assets/project_images/sc16/sc16-thumbnail.jpg"),
        "",
        "",
        "",
        require("../assets/project_images/sc17/sc17-thumbnail.jpg"),
        "",
        "",
        "",
        require("../assets/project_images/sc18/sc18-thumbnail.jpg"),
      ];

      const s_bottomTitle = [
        "Unearthed",
        "",
        "",
        "",
        "Blamp",
        "",
        "",
        "",
        "Speculating Self-governing Robotics...",
      ];
      const s_bottomImg_og = [
        require("../assets/project_images/sc19/sc19-thumbnail.jpg"),
        "",
        "",
        "",
        require("../assets/project_images/sc20/sc20-thumbnail.jpg"),
        "",
        "",
        "",
        require("../assets/project_images/sc21/sc21-thumbnail.jpg"),
      ];
      //testing for social project links
      const s_frontUrl = [
        "",
        "heart-in-a-heart",
        "",
        "wellness",
        "",
        "urban-stitch",
        "",
        "regrowth2",
        "",
      ];
      const s_backUrl = [
        "starchamps-playground",
        "",
        "",
        "",
        "hidden-cave-respite",
        "",
        "",
        "",
        "curly-cove",
      ];
      const s_leftUrl = [
        "",
        "flora-scapes",
        "",
        "unspoken-interactions",
        "",
        "wellness2",
        "",
        "disconnect",
        "",
      ];
      const s_rightUrl = [
        "",
        "co-nectar",
        "",
        "kinetic-forest",
        "",
        "steps",
        "",
        "roundabouts",
        "",
      ];
      const s_topUrl = [
        "a-million-holes",
        "",
        "",
        "",
        "wecare",
        "",
        "",
        "",
        "deafspace-dddk",
      ];
      const s_bottomUrl = [
        "unearthed",
        "",
        "",
        "",
        "blamp",
        "",
        "",
        "",
        "speculating-self-governing-robotics",
      ];

      //for technology
      const t_frontTitle = [
        "Lucidity",
        "",
        "",
        "",
        "White Silence",
        "",
        "",
        "",
        "The Sinister Library",
      ];
      const t_frontImg_og = [
        require("../assets/project_images/tc01/tc01-thumbnail.jpg"),
        "",
        "",
        "",
        require("../assets/project_images/tc02/tc02-thumbnail.jpg"),
        "",
        "",
        "",
        require("../assets/project_images/tc03/tc03-thumbnail.jpg"),
      ];

      const t_leftTitle = [
        "Stewards of the Forest",
        "",
        "",
        "",
        "OTW Through T2",
        "",
        "",
        "",
        "Lux Plantae",
      ];
      const t_leftImg_og = [
        require("../assets/project_images/tc04/tc04-thumbnail.jpg"),
        "",
        "",
        "",
        require("../assets/project_images/tc05/tc05-thumbnail.jpg"),
        "",
        "",
        "",
        require("../assets/project_images/tc06/tc06-thumbnail.jpg"),
      ];

      const t_rightTitle = [
        "Aurora",
        "",
        "",
        "",
        "Build a Lamp",
        "",
        "",
        "",
        "Bloom",
      ];
      const t_rightImg_og = [
        require("../assets/project_images/tc07/tc07-thumbnail.jpg"),
        "",
        "",
        "",
        require("../assets/project_images/tc08/tc08-thumbnail.jpg"),
        "",
        "",
        "",
        require("../assets/project_images/tc09/tc09-thumbnail.jpg"),
      ];
      const t_backTitle = [
        "Crux",
        "",
        "",
        "",
        "Arboreal",
        "",
        "",
        "",
        "Danger Zone",
      ];
      const t_backImg_og = [
        require("../assets/project_images/tc10/tc10-thumbnail.jpg"),
        "",
        "",
        "",
        require("../assets/project_images/tc11/tc11-thumbnail.jpg"),
        "",
        "",
        "",
        require("../assets/project_images/tc12/tc12-thumbnail.jpg"),
      ];

      const t_topTitle = [
        "Siteless+",
        "",
        "",
        "",
        "Building Clouds",
        "",
        "",
        "",
        "Katana",
      ];
      const t_topImg_og = [
        require("../assets/project_images/tc13/tc13-thumbnail.jpg"),
        "",
        "",
        "",
        require("../assets/project_images/tc14/tc14-thumbnail.jpg"),
        "",
        "",
        "",
        require("../assets/project_images/tc15/tc15-thumbnail.jpg"),
      ];

      const t_bottomTitle = [
        "DreamScape",
        "",
        "",
        "",
        "",
        "",
        "",
        "",
        "Casa Sabio",
      ];
      const t_bottomImg_og = [
        require("../assets/project_images/tc16/tc16-thumbnail.jpg"),
        "",
        "",
        "",
        "",
        "",
        "",
        "",
        require("../assets/project_images/tc17/tc17-thumbnail.jpg"),
      ];
      //testing for technology project links
      const t_frontUrl = [
        "lucidity",
        "",
        "",
        "",
        "white-silence",
        "",
        "",
        "",
        "sinister-library",
      ];
      const t_backUrl = [
        "crux",
        "",
        "",
        "",
        "arboreal",
        "",
        "",
        "",
        "danger-zone",
      ];
      const t_leftUrl = [
        "stewards-of-the-forest",
        "",
        "",
        "",
        "otw-through-t2",
        "",
        "",
        "",
        "lux-plantae",
      ];
      const t_rightUrl = [
        "aurora",
        "",
        "",
        "",
        "build-a-lamp",
        "",
        "",
        "",
        "bloom",
      ];
      const t_topUrl = [
        "siteless-plus",
        "",
        "",
        "",
        "building-clouds",
        "",
        "",
        "",
        "katana",
      ];
      const t_bottomUrl = [
        "dreamscape",
        "",
        "",
        "",
        "",
        "",
        "",
        "",
        "casa-sabio",
      ];

      //for PEOPLE
      const p_frontTitle = [
        "Aaron Soares",
        "Julius Ang",
        "Ariyana Arnold",
        "Benjo Lim",
        "Levona Chan",
        "Cheryl Soh",
        "Jonathan Chong",
        "David Chung",
        "Chung Zhi Xue",
      ];
      const p_frontImg_og = [
        require("../assets/student_images/1004280-avatar.jpg"),
        require("../assets/student_images/1004092-avatar.jpg"),
        require("../assets/student_images/1004454-avatar.jpg"),
        require("../assets/student_images/1004098-avatar.jpg"),
        require("../assets/student_images/1004460-avatar.jpg"),
        require("../assets/student_images/1004231-avatar.jpg"),
        require("../assets/student_images/1004140-avatar.jpg"),
        require("../assets/student_images/1004110-avatar.jpg"),
        require("../assets/student_images/1003583-avatar.jpg"),
      ];

      const p_leftTitle = [
        "Fera Tandiawan",
        "Serene Huang",
        "Ian Chung",
        "Jane Phua",
        "Janelle Ho",
        "Janus Lim",
        "Joshua Ng",
        "Jovin Lim",
        "Keith Tan",
      ];
      const p_leftImg_og = [
        require("../assets/student_images/1004477-avatar.jpg"),
        require("../assets/student_images/1004577-avatar.jpg"),
        require("../assets/student_images/1004139-avatar.jpg"),
        require("../assets/student_images/1004672-avatar.jpg"),
        require("../assets/student_images/1004646-avatar.jpg"),
        require("../assets/student_images/1004109-avatar.jpg"),
        require("../assets/student_images/1004320-avatar.jpg"),
        require("../assets/student_images/1004259-avatar.jpg"),
        require("../assets/student_images/1004129-avatar.jpg"),
      ];

      const p_rightTitle = [
        "Kuan Yi Heng",
        "Lance Yu",
        "Benji Lim",
        "Andrea Ling",
        "Lyvia Simano",
        "Sheryl Mah",
        "Megan Lee",
        "Melissa Tan",
        "Nasrin Fotohi",
      ];
      const p_rightImg_og = [
        require("../assets/student_images/1004102-avatar.jpg"),
        require("../assets/student_images/1004470-avatar.jpg"),
        require("../assets/student_images/1004245-avatar.jpg"),
        require("../assets/student_images/1004667-avatar.jpg"),
        require("../assets/student_images/1004441-avatar.jpg"),
        require("../assets/student_images/1004336-avatar.jpg"),
        require("../assets/student_images/1004425-avatar.jpg"),
        require("../assets/student_images/1004432-avatar.jpg"),
        require("../assets/student_images/1004462-avatar.jpg"),
      ];
      const p_topTitle = [
        "Christopher Ooi",
        "Peter David",
        "Phua Kai Jie",
        "Rachel Cheah",
        "Ryan Chua",
        "Ryann Yeo",
        "Saw Man Lin",
        "Maryann Seah",
        "Sharmayne Lim",
      ];
      const p_topImg_og = [
        require("../assets/student_images/1004146-avatar.jpg"),
        require("../assets/student_images/1004325-avatar.jpg"),
        require("../assets/student_images/1004253-avatar.jpg"),
        require("../assets/student_images/1004593-avatar.jpg"),
        require("../assets/student_images/1004279-avatar.jpg"),
        require("../assets/student_images/1004433-avatar.jpg"),
        require("../assets/student_images/1004614-avatar.jpg"),
        require("../assets/student_images/1004450-avatar.jpg"),
        require("../assets/student_images/1004491-avatar.jpg"),
      ];

      const p_backTitle = [
        "Tan Eng Khang",
        "Mark Tay",
        "Teo Jiawen",
        "Teoh Ming Huan",
        "Valent Tan",
        "Wong Siong Min",
        "Yap Yi Tong",
        "Sheryl Yeap",
        "Janice Yong",
      ];
      const p_backImg_og = [
        require("../assets/student_images/1004323-avatar.jpg"),
        require("../assets/student_images/1004297-avatar.jpg"),
        require("../assets/student_images/1004346-avatar.jpg"),
        require("../assets/student_images/1004591-avatar.jpg"),
        require("../assets/student_images/1004378-avatar.jpg"),
        require("../assets/student_images/1004675-avatar.jpg"),
        require("../assets/student_images/1004407-avatar.jpg"),
        require("../assets/student_images/1004624-avatar.jpg"),
        require("../assets/student_images/1004625-avatar.jpg"),
      ];

      const p_bottomTitle = [
        "Hello",
        "you",
        "batch's",
        "there,",
        "enjoy",
        "aRcHitecTuRe",
        "hope",
        "our",
        "pErsPEctiVes!",
      ];
      const p_bottomImg_og = [
        require("../assets/student_images/tgt1.jpg"),
        require("../assets/student_images/tgt4.jpg"),
        require("../assets/student_images/tgt7.jpg"),
        require("../assets/student_images/tgt2.jpg"),
        require("../assets/student_images/tgt5.jpg"),
        require("../assets/student_images/tgt8.jpg"),
        require("../assets/student_images/tgt3.jpg"),
        require("../assets/student_images/tgt6.jpg"),
        require("../assets/student_images/tgt9.jpg"),
      ];
      //testing for PEOPLE PROFILE links
      const p_frontUrl = [
        "aaron-soares",
        "julius-ang",
        "ariyana-tiara-arnold",
        "benjamin-lim-enhow",
        "levona-chan",
        "cheryl-soh",
        "jonathan-chong",
        "david-chung",
        "zhixue-chung",
      ];
      const p_backUrl = [
        "engkhang-tan",
        "mark-tay",
        "jiawen-teo",
        "minghuan-teoh",
        "valent-tan",
        "siongmin-wong",
        "yitong-yap",
        "sheryl-yeap",
        "janice-yong",
      ];
      const p_leftUrl = [
        "fera-tandiawan",
        "serene-huang",
        "ian-chung",
        "jane-phua",
        "janelle-ho",
        "janus-lim",
        "joshua-ng",
        "jovin-lim",
        "keith-tan",
      ];
      const p_rightUrl = [
        "yiheng-kuan",
        "lance-marco",
        "benjamin-lim-shangzhi",
        "andrea-ling",
        "lyvia-simano",
        "sheryl-mah",
        "megan-lee",
        "melissa-tan",
        "nasrin-fotohi",
      ];
      const p_topUrl = [
        "christopher-ooi",
        "peter-david",
        "kaijie-phua",
        "rachel-cheah",
        "ryan-chua",
        "ryann-yeo",
        "manlin-saw",
        "maryann-seah",
        "sharmayne-lim",
      ];
      const p_bottomUrl = ["", "", "", "", "", "", "", "", ""];

      const frontUrl = [
        c_frontUrl,
        e_frontUrl,
        s_frontUrl,
        t_frontUrl,
        p_frontUrl,
      ];
      const backUrl = [c_backUrl, e_backUrl, s_backUrl, t_backUrl, p_backUrl];
      const leftUrl = [c_leftUrl, e_leftUrl, s_leftUrl, t_leftUrl, p_leftUrl];
      const rightUrl = [
        c_rightUrl,
        e_rightUrl,
        s_rightUrl,
        t_rightUrl,
        p_rightUrl,
      ];
      const topUrl = [c_topUrl, e_topUrl, s_topUrl, t_topUrl, p_topUrl];
      const bottomUrl = [
        c_bottomUrl,
        e_bottomUrl,
        s_bottomUrl,
        t_bottomUrl,
        p_bottomUrl,
      ];

      const frontTitle = [
        c_frontTitle,
        e_frontTitle,
        s_frontTitle,
        t_frontTitle,
        p_frontTitle,
      ];

      const frontImg_og = [
        c_frontImg_og,
        e_frontImg_og,
        s_frontImg_og,
        t_frontImg_og,
        p_frontImg_og,
      ];

      const backTitle = [
        c_backTitle,
        e_backTitle,
        s_backTitle,
        t_backTitle,
        p_backTitle,
      ];

      const backImg_og = [
        c_backImg_og,
        e_backImg_og,
        s_backImg_og,
        t_backImg_og,
        p_backImg_og,
      ];

      const leftTitle = [
        c_leftTitle,
        e_leftTitle,
        s_leftTitle,
        t_leftTitle,
        p_leftTitle,
      ];

      const leftImg_og = [
        c_leftImg_og,
        e_leftImg_og,
        s_leftImg_og,
        t_leftImg_og,
        p_leftImg_og,
      ];

      const rightTitle = [
        c_rightTitle,
        e_rightTitle,
        s_rightTitle,
        t_rightTitle,
        p_rightTitle,
      ];

      const rightImg_og = [
        c_rightImg_og,
        e_rightImg_og,
        s_rightImg_og,
        t_rightImg_og,
        p_rightImg_og,
      ];

      const topTitle = [
        c_topTitle,
        e_topTitle,
        s_topTitle,
        t_topTitle,
        p_topTitle,
      ];

      const topImg_og = [
        c_topImg_og,
        e_topImg_og,
        s_topImg_og,
        t_topImg_og,
        p_topImg_og,
      ];

      const bottomTitle = [
        c_bottomTitle,
        e_bottomTitle,
        s_bottomTitle,
        t_bottomTitle,
        p_bottomTitle,
      ];

      const bottomImg_og = [
        c_bottomImg_og,
        e_bottomImg_og,
        s_bottomImg_og,
        t_bottomImg_og,
        p_bottomImg_og,
      ];

      //      const buttonType = [
      //        "Culture",
      //        "Ecology",
      //        "Social",
      //        "Technology",
      //        "People",
      //      ];
      //      const index = buttonType.indexOf(pagetype);
      //      console.log(pagetype);
      //      console.log(index);
      if (pagetype === buttonType[index]) {
        const frontPlanes = [];
        for (let i = 0; i < 9; i++) {
          const plane = createsmallPlane(
            "transparent",
            frontPos[i],
            new THREE.Euler(0, 0, 0),
            frontImg_og[index][i],
            frontImg_hover[i],
            frontTitle[index][i],
            "center",
            frontUrl[index][i]
          );
          const cssObject = new CSS3DObject(plane);
          frontPlanes.push(cssObject);
        }
        planes.push(frontPlanes);

        const leftPlanes = [];
        for (let i = 0; i < 9; i++) {
          const plane = createsmallPlane(
            "transparent",
            leftPos[i],
            new THREE.Euler(0, -90 * THREE.MathUtils.DEG2RAD, 0),
            leftImg_og[index][i],
            leftImg_hover[i],
            leftTitle[index][i],
            "center",
            leftUrl[index][i]
          );
          const cssObject = new CSS3DObject(plane);
          leftPlanes.push(cssObject);
        }
        planes.push(leftPlanes);

        const rightPlanes = [];
        for (let i = 0; i < 9; i++) {
          const plane = createsmallPlane(
            "transparent",
            rightPos[i],
            new THREE.Euler(0, 90 * THREE.MathUtils.DEG2RAD, 0),
            rightImg_og[index][i],
            rightImg_hover[i],
            rightTitle[index][i],
            "center",
            rightUrl[index][i]
          );
          const cssObject = new CSS3DObject(plane);
          rightPlanes.push(cssObject);
        }
        planes.push(rightPlanes);

        const backPlanes = [];
        for (let i = 0; i < 9; i++) {
          const plane = createsmallPlane(
            "transparent",
            backPos[i],
            new THREE.Euler(0, -180 * THREE.MathUtils.DEG2RAD, 0),
            backImg_og[index][i],
            backImg_hover[i],
            backTitle[index][i],
            "center",
            backUrl[index][i]
          );
          const cssObject = new CSS3DObject(plane);
          backPlanes.push(cssObject);
        }
        planes.push(backPlanes);

        const topPlanes = [];
        for (let i = 0; i < 9; i++) {
          const plane = createsmallPlane(
            "transparent",
            topPos[i],
            new THREE.Euler(-90 * THREE.MathUtils.DEG2RAD, 0, 0),
            topImg_og[index][i],
            topImg_hover[i],
            topTitle[index][i],
            "center",
            topUrl[index][i]
          );
          const cssObject = new CSS3DObject(plane);
          topPlanes.push(cssObject);
        }
        planes.push(topPlanes);

        const bottomPlanes = [];
        for (let i = 0; i < 9; i++) {
          const plane = createsmallPlane(
            "transparent",
            bottomPos[i],
            new THREE.Euler(90 * THREE.MathUtils.DEG2RAD, 0, 0),
            bottomImg_og[index][i],
            bottomImg_hover[i],
            bottomTitle[index][i],
            "center",
            bottomUrl[index][i]
          );
          const cssObject = new CSS3DObject(plane);
          bottomPlanes.push(cssObject);
        }
        planes.push(bottomPlanes);
      }

      function createsmallPlane(
        cssColor,
        pos,
        rot,
        backgroundImageUrl,
        newImageUrl,
        text,
        alignment,
        pageUrl
      ) {
        let img = new Image();
        img.src = backgroundImageUrl;
        if (img.complete) {
          setCount((c) => (c += 1));
        } else {
          img.onload = function () {
            setCount((c) => (c += 1));
          };
        }

        const smelement = document.createElement("div");
        smelement.style.width = "33.3333px";
        smelement.style.height = "33.3333px";
        smelement.style.opacity = 1;
        smelement.style.background = cssColor;
        smelement.style.backgroundImage = `url(${backgroundImageUrl}),url(${newImageUrl})`;
        smelement.style.backgroundSize = "cover";
        smelement.innerHTML = text;

        //    smelement.classList.add("small-text-class");
        if (pagetype === buttonType[4]) {
          smelement.classList.add("small-text-class-people");
          console.log(pagetype);
        } else {
          smelement.classList.add("small-text-class");
        }

        smelement.style.textAlign = alignment;
        smelement.addEventListener("mouseover", function () {
          smelement.style.backgroundImage = `url(${newImageUrl})`;
        });
        smelement.addEventListener("mouseout", function () {
          smelement.style.backgroundImage = `url(${backgroundImageUrl}),url(${newImageUrl})`;
        });

        // smelement.addEventListener("mousedown", function () {
        //   window.location.href = pageUrl;
        // });
        if (pageUrl) {
          smelement.style.cursor = "pointer";
          smelement.addEventListener("mousedown", function () {
            navigate(pageUrl);
          });
        }

        const smObject = new CSS3DObject(smelement);
        smObject.position.copy(pos);
        smObject.rotation.copy(rot);
        if (pagetype === buttonType[index]) {
          sceneC.add(smObject);
        }
      }

      window.addEventListener("resize", onWindowResize);
    }

    function onWindowResize() {
      const aspect = window.innerWidth / window.innerHeight;
      camera.left = (-frustumSize * aspect) / 2;
      camera.right = (frustumSize * aspect) / 2;
      camera.top = frustumSize / 2;
      camera.bottom = -frustumSize / 2;
      camera.updateProjectionMatrix();
      renderer.setSize(window.innerWidth, window.innerHeight);
      renderer2.setSize(window.innerWidth, window.innerHeight);
      labelRenderer.setSize(window.innerWidth, window.innerHeight);
    }

    function animate() {
      requestAnimationFrame(animate);
      camera.rotation.z += 0.0015; //for spinning
      //camera.rotation.y += 0.005; //test y-dir
      //camera.rotation.x += 0.001; //test x-dir
      renderer.render(scene, camera);
      renderer2.render(scene2, camera);
      renderer2.render(sceneC, camera);
      labelRenderer.render(scene2, camera);
    }

    return () => {
      mountRefCurr.removeChild(renderer.domElement);
      mountRefCurr.removeChild(renderer2.domElement);
      mountRefCurr.removeChild(labelRenderer.domElement);
    };
  }, [pagetype]);

  return (
    <>
      <div className="relative top-0 left-0" ref={mountRef}>
        <p className="opacity-0 absolute" id="timer"></p>
      </div>
      {isLoading && <Loader text={loadingText} />}
    </>
  );
}
