import { useState, useRef, useEffect } from "react";
import "./landing.css";
import Slide from "@mui/material/Slide";
import AboutMe from "./AboutMe";
import ContactMe from "./ContactMe";
import Projects from "./Projects";
import Spherograph from "./Spherograph";

function Landing() {
  const [centeredCard, setCenteredCard] = useState(null);
  const [clickedLink, setClickedLink] = useState(null);
  const handleClick = (card) => {
    setClickedLink(card);
    setCenteredCard(card);
  };

  const meCardRef = useRef(null);
  const [spherographWidth, setSpherographWidth] = useState(null);
  useEffect(() => {
    if (meCardRef.current) {
      console.log(meCardRef.current.clientWidth);
      setSpherographWidth(meCardRef.current.clientWidth);
    }
  }, []);

  return (
    <>
      <div className="mainContainer" ref={meCardRef}>
        <Spherograph cardWidth={spherographWidth} />
        <div className="meCard">
          <h1>Alex Li</h1>
          <p>Hey,</p>
          <p>Thanks for checking out my portfolio! </p>
        </div>
        <div className="cardDisplay">
          <Slide direction="left" in={centeredCard == "About me" && true}>
            <div>
              <AboutMe />
            </div>
          </Slide>
          <Slide direction="left" in={centeredCard == "Projects" && true}>
            <div>
              <Projects />
            </div>
          </Slide>
          <Slide direction="left" in={centeredCard == "Contact me" && true}>
            <div>
              <ContactMe />
            </div>
          </Slide>
        </div>
        <div className="clickList">
          {}
          <a
            onClick={() => handleClick("About me")}
            className={
              clickedLink == "About me" ? "clickItem clicked" : "clickItem"
            }
          >
            About me
          </a>
          <a
            onClick={() => handleClick("Projects")}
            className={
              clickedLink == "Projects" ? "clickItem clicked" : "clickItem"
            }
          >
            Projects
          </a>
          <a
            onClick={() => handleClick("Contact me")}
            className={
              clickedLink == "Contact me" ? "clickItem clicked" : "clickItem"
            }
          >
            Contact me
          </a>
        </div>
      </div>
    </>
  );
}

export default Landing;
