import { useEffect, useRef, type ReactNode } from "react";
import { driveStage } from "../scroll";

/** A tall scroll section holding one sticky full-screen stage. Children read --p, --s, --t, --mx, --my. */
export default function StageSection({ id, height, children, className = "", onFrame }: { id: string; height: string; children: ReactNode; className?: string; onFrame?: (p: number, stage: HTMLElement) => void }) {
  const section = useRef<HTMLElement>(null);
  const stage = useRef<HTMLDivElement>(null);
  useEffect(() => (section.current && stage.current ? driveStage(stage.current, section.current, false, onFrame) : undefined), []);
  return (
    <section ref={section} id={id} className="relative" style={{ height }}>
      <div ref={stage} className={`scene-stage sticky top-0 h-screen overflow-hidden ${className}`}>
        <div className="world-mid absolute inset-0">{children}</div>
      </div>
    </section>
  );
}
