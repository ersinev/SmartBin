import React from "react";
import { animated } from "react-spring";

const GarbageAnimation = ({ fillPercentage, maxFillLevel }) => {
  const parentHeight = 300; // Height of the parent container
  const filledHeight = (fillPercentage / 100) * parentHeight;
  const emptyHeight = parentHeight - filledHeight;

  return (
    <div
      className="garbage-container"
      style={{ height: `${parentHeight}px`, backgroundColor: "lightblue" }}
    >
      <div className="garbage">
        <div
          className="empty-part"
          style={{ height: `${emptyHeight}px`, backgroundColor: "lightblue" }}
        ></div>
        <animated.div
          className="filled-part"
          style={{
            height: `${filledHeight}px`,
            backgroundColor: "red",
            position: "relative", // Position images within the red part
          }}
        >
          {/* Display the bottle.png image */}
          <img
            className="item-image"
            src={process.env.PUBLIC_URL + "/soda.png"} // Corrected path
            alt="Soda"
            style={{
              maxWidth: "100%", // Limit the width to fit within the container
              height: "auto", // Maintain aspect ratio
            }}
          />
          <img
            className="item-image"
            src={process.env.PUBLIC_URL + "/cola.png"} // Corrected path
            alt="Cola"
            style={{
              maxWidth: "100%", // Limit the width to fit within the container
              height: "auto", // Maintain aspect ratio
            }}
          />
        </animated.div>
      </div>
      
    </div>
    
  );
};

export default GarbageAnimation;
