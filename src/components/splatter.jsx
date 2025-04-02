import { useEffect } from "react";
import "./splatter.scss";

export default function Splatter() {
  useEffect(() => {
    const handleScroll = () => {
      const viewportHeight = window.innerHeight;

      document.querySelectorAll(".splotch").forEach((el) => {
        const rect = el.getBoundingClientRect(); // Get element position
        const position = rect.top / viewportHeight;

        // Make it "splat" when it enters the viewport & fade out as it moves up
        const opacity = position < 0.5 ? 1 - position * 2 : 0; // Max opacity at center, fades up

        el.style.opacity = Math.max(0, Math.min(opacity, 1));
      });
    };

    document.querySelector("main")?.addEventListener?.("scroll", handleScroll);
    
    return () => {
        document.querySelector("main")?.removeEventListener?.("scroll", handleScroll);
    };
  }, []);

  return (
    <div id="canvas" className="container">
      <img id="red" className="splotch" src="https://i.ibb.co/fpW25qW/k-T85j4e-Rc.png" alt="red" />
      <img id="blue" className="splotch" src="https://i.ibb.co/Brw1B69/8-TGb-Xexzc.png" alt="blue" />
      <img id="yellow" className="splotch" src="https://i.ibb.co/Bz4FR2V/9-97730-gold-paint-splatter-png-yellow-watercolor-splash-png.png" alt="yellow" />
      <img id="pink" className="splotch" src="https://i.ibb.co/fGj59kP/1079553.png" alt="pink" />
      <img id="black" className="splotch" src="https://i.ibb.co/QPz04gJ/paint-splatter-transparent-background-6.png" alt="black" />
    </div>
  );
}
