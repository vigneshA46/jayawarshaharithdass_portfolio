import { lazy, Suspense, useEffect, useState } from "react";
import Header from "./ui/Header";
import Sections from "./ui/Sections";
import { startScroll, trackStops } from "./scroll";

const Scene = lazy(() => import("./scene/Scene"));

function webgl() {
  try {
    const c = document.createElement("canvas");
    return !!(c.getContext("webgl2") || c.getContext("webgl"));
  } catch {
    return false;
  }
}

export default function App() {
  const [active, setActive] = useState(0);
  const [ok] = useState(webgl);
  const [low] = useState(() => matchMedia("(max-width: 760px)").matches || ((navigator as Navigator & { deviceMemory?: number }).deviceMemory ?? 8) <= 4);

  useEffect(() => {
    const stop = startScroll();
    const untrack = trackStops(setActive);
    return () => {
      stop();
      untrack();
    };
  }, []);

  return (
    <>
      <div aria-hidden className="fixed inset-0 z-0 bg-[radial-gradient(ellipse_at_50%_40%,#2a1f0c_0%,#0e0e0d_70%)]">
        {ok && (
          <Suspense fallback={null}>
            <Scene low={low} />
          </Suspense>
        )}
      </div>
      <Header active={active} />
      <main>
        <Sections />
      </main>
    </>
  );
}
