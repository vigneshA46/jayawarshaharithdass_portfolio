import type { ReactNode } from "react";

/** One scroll stop. `side` says where the copy sits, opposite the 3D subject. */
export default function Section({ id, side, children, tall = false }: { id: string; side: "left" | "right" | "center"; children: ReactNode; tall?: boolean }) {
  const justify = side === "left" ? "md:justify-start" : side === "right" ? "md:justify-end" : "md:justify-center";
  return (
    <section id={id} data-stop className={`relative z-10 flex items-end px-6 pb-[9vh] md:items-center md:px-[8vw] md:pb-0 ${justify} ${tall ? "min-h-[130vh]" : "min-h-screen"}`}>
      <div className={`w-full ${side === "center" ? "max-w-4xl" : "max-w-[34rem]"}`}>{children}</div>
    </section>
  );
}
