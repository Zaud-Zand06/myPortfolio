import React, { useState, useEffect, useRef } from "react";
import { vec3 } from "gl-matrix";

const Spherograph = ({ cardWidth }) => {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;

    const ctx = canvas.getContext("2d");
    let camX = 0.01,
      camY = 0.01,
      camZ = 0.01;
    let proX = Math.random(2),
      proY = Math.random(2),
      proZ = Math.random(2);
    let speedX = 0.001,
      speedY = 0.001,
      speedZ = 0.001;
    let scale = 100.0,
      speedOff = 0.01,
      speedOffSign = 0.01,
      lineWidth = 3,
      offset = 2.5,
      maxOffset = 4.0,
      loops = 20.0,
      raf;

    const main = () => {
      if (!ctx) return alert("Your browser doesn't support something.");

      drawScene();
    };

    const drawScene = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      ctx.save();
      ctx.translate(canvas.width * 0.5, canvas.height * 0.5);
      ctx.beginPath();

      let angleX = 0.0,
        angleY = 0.0;
      let center = [0.0, 0.0, 0.0];

      for (let angleZ = 0.0; angleZ < loops * Math.PI; angleZ += 0.01) {
        angleX += proX / 1000.0;
        angleY += proY / 1000.0;

        // start with a circle
        let xyz = [
          scale * parseFloat(offset + Math.cos(angleZ)),
          scale * parseFloat(Math.sin(angleZ)),
          125.0,
        ];

        // rotate around Z to create a basic spirograph
        vec3.rotateZ(xyz, xyz, center, angleZ * proZ);

        // rotate around X and Y to move into 3d
        vec3.rotateX(xyz, xyz, center, angleX);
        vec3.rotateY(xyz, xyz, center, angleY);

        // account for rotation of the camera
        vec3.rotateX(xyz, xyz, center, camX);
        vec3.rotateY(xyz, xyz, center, camY);
        vec3.rotateZ(xyz, xyz, center, camZ);

        if (angleZ == 0) ctx.moveTo(xyz[0], xyz[1]);
        else ctx.lineTo(xyz[0], xyz[1]);
      }
      const gradient = ctx.createLinearGradient(0, 0, 170, 0);
      gradient.addColorStop("0.2", "#02AABD ");
      gradient.addColorStop("1.0", "#00CDAC");

      ctx.lineWidth = lineWidth;
      ctx.strokeStyle = gradient;
      ctx.stroke();
      ctx.restore();

      if (speedOff) {
        if (offset > maxOffset) {
          offset = maxOffset;
          speedOffSign = -0.03;
        }
        if (offset < -1 * maxOffset) {
          offset = -1 * maxOffset;
          speedOffSign = 0.03;
        }
        offset += speedOffSign * speedOff;
      }

      if (speedX) {
        camX += speedX;
        if (camX > 6.28) camX = 0.0;
      }
      if (speedY) {
        camY += speedY;
        if (camY > 6.28) camY = 0.0;
      }
      if (speedZ > 0.0) {
        camZ += speedZ;
        if (camZ > 6.28) camZ = 0.0;
      }

      raf = window.requestAnimationFrame(drawScene);
    };

    main();
  }, []);

  return (
    <canvas width={cardWidth} height={cardWidth} ref={canvasRef} id="canvas" />
  );
};

export default Spherograph;
