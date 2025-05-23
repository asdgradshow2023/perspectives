export const AboutPage = () => {
  return (
    <>
      <p className="lg:pl-0 md:pl-5 sm:pl-2 min-h-0 font-bold lg:text-[90px] md:text-[50px] sm:text-[36px] xs:tracking-[0.35em] xs:text-[28px] text-[20px] tracking-[0.30em] uppercase w-full text-center mb-4">
        perspectives
      </p>
      <div className="min-h-0 sm:mt-10 mt-5">
        <div className="lg:flex lg:flex-row lg:justify-center lg:items-center lg:space-x-8">
          <p className="text-justify lg:w-[660px] md:w-[600px] sm:w-[420px] xs:w-[320px] 2xs:w-[260px] w-[220px] lg:mx-0 mx-auto sm:text-base text-sm">
            Perspectives, the eighth iteration of SUTD’s Architecture &
            Sustainable Design (ASD) Gradshow, is a consolidation of the works
            by B.Sc (ASD) students from the Class of 2022. It is a glimpse into
            how their perspectives of Architecture was formed and their take on
            architecture briefs.
            <br />
            <br /> It is also an ongoing conversation with you, the audience, on
            your thoughts and perspectives on what Architecture is, can and will
            be as you explore and understand the thoughts behind every project
            and idea.
          </p>

          <div className="flex justify-center md:scale-100 md:mt-5 scale-[0.8]">
            <div className="relative w-80 h-[280px] mb-5">
              <Circle
                text={"showcase"}
                position="left-0 top-0 right-0 bottom-0 mx-auto my-0"
              />
              <Circle text={"conversation"} position="top-[40%] left-3" />
              <Circle text={"framing"} position="top-[40%] right-3" />
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

const Circle = ({ text, position }) => {
  return (
    <div
      className={
        "capitalize origin-center absolute flex items-center justify-center h-40 w-40 rounded-full border-white border-2 bg-[rgba(255,255,255,0.25)] " +
        position
      }
    >
      <p>{text}</p>
    </div>
  );
};

//export default AboutPage
