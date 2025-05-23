export const NavRoutes = [
  {
    name: "Home",
    path: "/",
    external: false,
  },
  {
    name: "About",
    path: "/about",
    external: false,
    children: [
      { name: "about", path: "", external: false },
      { name: "message", path: "message", external: false },
      { name: "donor / venue partner", path: "donor", external: false },
      { name: "curatorial team", path: "team", external: false },
    ],
  },
  {
    name: "Projects",
    path: "/projects",
    external: false,
  },
  {
    name: "Students",
    path: "/students",
    external: false,
  },
  {
    name: "Past Year Showcase",
    path: "https://asd.sutd.edu.sg/gradshow/ug/2022",
    external: true,
  },
  {
    name: "ASD Website",
    path: "https://asd.sutd.edu.sg/home/",
    external: true,
  },
  {
    name: "SUTD Website",
    path: "https://www.sutd.edu.sg/",
    external: true,
  },
];
