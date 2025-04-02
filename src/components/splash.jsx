import { usePathname } from "next/navigation";
import "./splash.scss";
import Image from "next/image";
import { useEffect, useRef, useState } from "react";

export default function VideoPlayer() {
  const pathname = usePathname();
  const [show, setShow] = useState(true);
  const [scrollY, setScrollY] = useState(0);
  const [maxScroll, setMaxScroll] = useState(1);
  useEffect(() => {
    var t = setTimeout(() => {
      setShow(false);
    }, 7000);
    return () => clearTimeout(t);
  }, []);
  useEffect(() => {
    const updateMaxScroll = () => {
      setMaxScroll(document.documentElement.scrollHeight - window.innerHeight);
    };
    updateMaxScroll();
    window.addEventListener("resize", updateMaxScroll);
    return () => window.removeEventListener("resize", updateMaxScroll);
  }, [pathname]);

  useEffect(() => {
    const handleScroll = () => {
      setScrollY(window.scrollY);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [pathname]);
  const vref = useRef();
  const translateY = (scrollY / maxScroll) * 100 ?? 0; // Maps scroll position from 0 to 100px
  useEffect(()=>{
    if(vref.current)vref.current.playbackRate = 0.5;
  },[vref])
  return (
    <>
      <div className="video-container bg-white">
        <video
          src="/videos/blot.mp4"
          className="video-bg"
          playsInline
          muted
          autoPlay
          key={pathname}
          preload="auto"
          ref={vref}
          style={{  filter:"blur(4px)",transform: `scale(1.2) rotate(${Math.round(translateY / 30)}deg) translateY(${Math.round(translateY - 50)}px)`, transition: "transform 0.1s linear" }}
        />
        <div className="video-mask" />
      </div>
      {show && (
        <>
          <video
            src="/videos/blot.mp4"
            className="video-fg-animate-in"
            playsInline
            muted
            preload="auto"
            autoPlay
            style={{
              filter:"blur(4px)"
            }}
          />
          <div className="logo-container">
            <Image
              className="logo"
              alt={"Skinny ink tattoos"}
              width={200}
              height={200}
              src="/logo.webp"
            />
          </div>
        </>
      )}
    </>
  );
}
