import { lazy, Suspense, useCallback, useEffect, useState } from "react";
import Header from "./ui/Header";
import Intro from "./ui/Intro";
import Cover from "./ui/Cover";
import Statement from "./ui/Statement";
import About from "./ui/About";
import Quote from "./ui/Quote";
import Empire from "./ui/Empire";
import Philosophy from "./ui/Philosophy";
import Vision from "./ui/Vision";
import Focus from "./ui/Focus";
import Mission from "./ui/Mission";
import Contact from "./ui/Contact";
import { startPointer, startScroll } from "./scroll";

const Backdrop = lazy(() => import("./scene/Backdrop"));

const webgl = () => {
  try {
    const c = document.createElement("canvas");
    return !!(c.getContext("webgl2") || c.getContext("webgl"));
  } catch {
    return false;
  }
};

export default function App() {
  const [ready, setReady] = useState(false);
  const [ok] = useState(webgl);
  const [low] = useState(() => matchMedia("(max-width: 760px)").matches);
  useEffect(() => {
    const a = startScroll();
    const b = startPointer();
    return () => {
      a();
      b();
    };
  }, []);
  const done = useCallback(() => setReady(true), []);

  return (
    <div className={ready ? "ready" : ""}>
      <Intro onDone={done} />
      <div aria-hidden className="fixed inset-0 z-0 bg-[radial-gradient(ellipse_at_50%_35%,#241a0a_0%,#0a0a09_68%)]">
        {ok && (
          <Suspense fallback={null}>
            <Backdrop low={low} />
          </Suspense>
        )}
      </div>
      <Header />
      <main className="relative z-10">
        <Cover />
        <Statement />
        <About />
        <Quote />
        <Empire />
        <Philosophy />
        <Vision />
        <Focus />
        <Mission />
        <Contact />
      </main>
    </div>
  );
}
