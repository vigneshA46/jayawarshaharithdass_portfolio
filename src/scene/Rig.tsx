import { useFrame, useThree } from "@react-three/fiber";
import * as THREE from "three";
import { view } from "../store";
import { POSES } from "./layout";

const smooth = (t: number) => t * t * (3 - 2 * t);
const cur = { pos: new THREE.Vector3(0, 0.4, 11), look: new THREE.Vector3(0, 0.2, 0), side: 1, up: 0.2 };
const a = new THREE.Vector3();
const b = new THREE.Vector3();
const pointer = { x: 0, y: 0 };

if (typeof window !== "undefined") {
  window.addEventListener("pointermove", (e) => {
    pointer.x = (e.clientX / innerWidth) * 2 - 1;
    pointer.y = (e.clientY / innerHeight) * 2 - 1;
  });
}

/** Drives the camera from scroll position: glides between per-section poses. */
export default function Rig() {
  const { camera, size } = useThree();
  const cam = camera as THREE.PerspectiveCamera;

  useFrame((_, dt) => {
    const n = POSES.length;
    const f = Math.min(Math.max(view.f, 0), n - 1);
    const i = Math.min(Math.floor(f), n - 2);
    const t = smooth(f - i);
    const p0 = POSES[i];
    const p1 = POSES[i + 1];
    const portrait = size.width / size.height < 0.9;
    const k = portrait ? 1.35 * (p0.m ?? 1) + ((p1.m ?? 1) - (p0.m ?? 1)) * 1.35 * t : 1;

    a.set(...p0.look).lerp(b.set(...p1.look), t);
    const look = a.clone();
    a.set(...p0.pos).lerp(b.set(...p1.pos), t);
    const pos = look.clone().add(a.sub(look).multiplyScalar(k));
    const side = p0.side + (p1.side - p0.side) * t;
    const up = 0.2 + ((p0.up ?? 0) + ((p1.up ?? 0) - (p0.up ?? 0)) * t);

    const lambda = view.reduced ? 1000 : 3.4;
    cur.pos.x = THREE.MathUtils.damp(cur.pos.x, pos.x, lambda, dt);
    cur.pos.y = THREE.MathUtils.damp(cur.pos.y, pos.y, lambda, dt);
    cur.pos.z = THREE.MathUtils.damp(cur.pos.z, pos.z, lambda, dt);
    cur.look.x = THREE.MathUtils.damp(cur.look.x, look.x, lambda, dt);
    cur.look.y = THREE.MathUtils.damp(cur.look.y, look.y, lambda, dt);
    cur.look.z = THREE.MathUtils.damp(cur.look.z, look.z, lambda, dt);
    cur.side = THREE.MathUtils.damp(cur.side, side, lambda, dt);
    cur.up = THREE.MathUtils.damp(cur.up, up, lambda, dt);

    const par = view.reduced ? 0 : 1;
    cam.position.set(cur.pos.x + pointer.x * 0.35 * par, cur.pos.y - pointer.y * 0.22 * par, cur.pos.z);
    cam.lookAt(cur.look);

    cam.fov = portrait ? 52 : 40;
    // Shift the subject sideways (desktop) or upwards (phones) so the text has its own space.
    if (portrait) cam.setViewOffset(size.width, size.height, 0, size.height * cur.up, size.width, size.height);
    else cam.setViewOffset(size.width, size.height, -cur.side * size.width * 0.19, 0, size.width, size.height);
  });
  return null;
}
