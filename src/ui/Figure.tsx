import { person } from "../content";
import Portrait from "./Silhouette";

export type PhotoKind = keyof typeof person.photos;

/** One of his portraits, feathered into the dark page; falls back to the silhouette if no photo is set. */
export default function Figure({ kind, className = "" }: { kind: PhotoKind; className?: string }) {
  const src = person.photos[kind];
  if (!src) return <Portrait className={className} />;
  return <img src={src} alt="" aria-hidden draggable={false} className={`${src.includes("standing-cut") ? "" : "photo-feather"} ${className}`} />;
}
