import { useState, useEffect } from "react";

function AboutMe() {
  const [weather, setWeather] = useState("Stormy");
  useEffect(() => {
    document.body.setAttribute("data-theme", "Stormy");
  }, []);
  //   add themes to states that change the look of the site
  const weatherStates = ["Sunny", "Rainy", "Cloudy", "Snowy", "Stormy"];
  function handleWeatherClick() {
    let weatherIndex = weatherStates.findIndex((state) => state === weather);
    weatherIndex === weatherStates.length - 1
      ? (weatherIndex = 0)
      : (weatherIndex += 1);
    setWeather(weatherStates[weatherIndex]);
    document.body.setAttribute("data-theme", weatherStates[weatherIndex]);
    // TODO: set switch statement that chenges background based on weatherstate
  }
  return (
    <>
      <p>
        Web developer based in{" "}
        <a onClick={() => handleWeatherClick()}>{weather}</a> Vancouver, BC.{" "}
      </p>
      <p>Trying my best to make the web more beautiful.</p>
    </>
  );
}

export default AboutMe;
