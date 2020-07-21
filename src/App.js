import React, { useLayoutEffect, useRef } from "react";
import "./App.css";

const App = () => {
  const aliceRef = useRef(null);
  const foregroundRef = useRef(null);
  const backgroundRef = useRef(null);

  useLayoutEffect(() => {
    // Alice and Queen frames
    const spriteFrames = [
      { transform: "translateY(0)" },
      { transform: "translateY(-100%)" },
    ];

    const alice = aliceRef.current.animate(spriteFrames, {
      easing: "steps(7, end)",
      direction: "reverse",
      duration: 600,
      playbackRate: 1,
      iterations: Infinity,
    });

    setInterval(function () {
      if (alice.playbackRate > 0.4) {
        alice.playbackRate *= 0.9;
        adjustPlayback();
      }
    }, 3000);

    // Scenery Frames
    const sceneryFrames = [
      { transform: "translateX(100%)" },
      { transform: "translateX(-100%)" },
    ];

    const sceneryTimingBackground = {
      duration: 36000,
      iterations: Infinity,
    };

    const sceneryTimingForeground = {
      duration: 12000,
      iterations: Infinity,
    };

    const foregroundMovement = foregroundRef.current.animate(
      sceneryFrames,
      sceneryTimingForeground
    );
    const backgroundMovement = backgroundRef.current.animate(
      sceneryFrames,
      sceneryTimingBackground
    );

    const sceneries = [foregroundMovement, backgroundMovement];

    const adjustPlayback = function () {
      if (alice.playbackRate < 0.8) {
        sceneries.forEach(function (anim) {
          anim.playbackRate = (alice.playbackRate / 2) * -1;
        });
      } else if (alice.playbackRate > 1.2) {
        sceneries.forEach(function (anim) {
          anim.playbackRate = alice.playbackRate / 2;
        });
      } else {
        sceneries.forEach(function (anim) {
          anim.playbackRate = 0;
        });
      }
    };
    adjustPlayback();

    const goFaster = () => {
      alice.playbackRate *= 1.1;
      adjustPlayback();
    };

    window.addEventListener("click", goFaster);
  });

  return (
    <div className="wrapper">
      <div className="sky"></div>

      <div className="earth">
        <div className="alice_queen">
          <img
            ref={aliceRef}
            src="https://s3-us-west-2.amazonaws.com/s.cdpn.io/641/sprite_running-alice-queen_small.png"
            alt=" "
          />
        </div>
      </div>

      <div className="scenery" id="foreground" ref={foregroundRef}>
        <img
          id="palmtreefront"
          src="https://s3-us-west-2.amazonaws.com/s.cdpn.io/641/palm3_small.png"
          alt=" "
        />
        <img
          id="bush"
          src="https://s3-us-west-2.amazonaws.com/s.cdpn.io/641/bush_small.png"
          alt=" "
        />
        <img
          id="w_rook_upright"
          src="https://s3-us-west-2.amazonaws.com/s.cdpn.io/641/w_rook_upright_small.png"
          alt=" "
        />
      </div>

      <div className="scenery background1" ref={backgroundRef}>
        <img
          className="pawn"
          src="https://s3-us-west-2.amazonaws.com/s.cdpn.io/641/r_pawn_upright_small.png"
          alt=" "
        />
        <img
          className="pawn2"
          src="https://s3-us-west-2.amazonaws.com/s.cdpn.io/641/r_pawn_upright_small.png"
          alt=" "
        />
        <img
          id="w_rook"
          src="https://s3-us-west-2.amazonaws.com/s.cdpn.io/641/w_rook_small.png"
          alt=" "
        />
        <img
          className="palmtreeback"
          src="https://s3-us-west-2.amazonaws.com/s.cdpn.io/641/palm1_small.png"
          alt=" "
        />
      </div>
    </div>
  );
};

export default App;
