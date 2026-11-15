import { useMemo, useRef } from "react";
import * as THREE from "three";
import { Canvas, useFrame } from "@react-three/fiber";
import { view } from "../store";

function sprite() {
  const c = document.createElement("canvas");
  c.width = c.height = 64;
  const g = c.getContext("2d")!;
  const r = g.createRadialGradient(32, 32, 0, 32, 32, 32);
  r.addColorStop(0, "rgba(255,255,255,1)");
  r.addColorStop(1, "rgba(255,255,255,0)");
  g.fillStyle = r;
  g.fillRect(0, 0, 64, 64);
  return new THREE.CanvasTexture(c);
}

function shaftTexture() {
  const c = document.createElement("canvas");
  c.width = 256;
  c.height = 512;
  const g = c.getContext("2d")!;
  const v = g.createLinearGradient(0, 0, 0, 512);
  v.addColorStop(0, "rgba(255,255,255,1)");
  v.addColorStop(1, "rgba(255,255,255,0)");
  g.fillStyle = v;
  g.fillRect(0, 0, 256, 512);
  g.globalCompositeOperation = "destination-in";
  const h = g.createLinearGradient(0, 0, 256, 0);
  h.addColorStop(0, "rgba(0,0,0,0)");
  h.addColorStop(0.5, "rgba(0,0,0,1)");
  h.addColorStop(1, "rgba(0,0,0,0)");
  g.fillStyle = h;
  g.fillRect(0, 0, 256, 512);
  return new THREE.CanvasTexture(c);
}

function Dust({ count }: { count: number }) {
  const ref = useRef<THREE.Points>(null);
  const tex = useMemo(sprite, []);
  const pos = useMemo(() => {
    const a = new Float32Array(count * 3);
    let s = 12345;
    const r = () => ((s = (s * 1664525 + 1013904223) >>> 0) / 4294967296);
    for (let i = 0; i < count; i++) a.set([(r() - 0.5) * 22, (r() - 0.5) * 14, (r() - 0.5) * 14], i * 3);
    return a;
  }, [count]);
  useFrame(({ clock }) => {
    const p = ref.current;
    if (!p) return;
    const t = view.reduced ? 0 : clock.elapsedTime;
    p.rotation.y = t * 0.015 + view.mx * 0.05;
    p.position.y = Math.sin(t * 0.1) * 0.25 + view.p * 2.5;
  });
  return (
    <points ref={ref}>
      <bufferGeometry>
        <bufferAttribute attach="attributes-position" args={[pos, 3]} />
      </bufferGeometry>
      <pointsMaterial map={tex} color="#f2d58a" size={0.07} sizeAttenuation transparent opacity={0.55} depthWrite={false} blending={THREE.AdditiveBlending} />
    </points>
  );
}

function Shafts() {
  const tex = useMemo(shaftTexture, []);
  const refs = useRef<(THREE.Mesh | null)[]>([]);
  const cfg = [
    { x: -3.2, rot: 0.28, w: 3.4, o: 0.16 },
    { x: 1.2, rot: -0.16, w: 4.6, o: 0.2 },
    { x: 4.6, rot: -0.34, w: 3, o: 0.12 },
  ];
  useFrame(({ clock }) => {
    const t = view.reduced ? 0 : clock.elapsedTime;
    refs.current.forEach((m, i) => {
      if (!m) return;
      m.rotation.z = cfg[i].rot + Math.sin(t * 0.18 + i * 2) * 0.035;
      (m.material as THREE.MeshBasicMaterial).opacity = cfg[i].o * (0.75 + Math.sin(t * 0.4 + i) * 0.25) * (1 - view.p * 0.6);
    });
  });
  return (
    <>
      {cfg.map((c, i) => (
        <mesh key={i} ref={(el) => { refs.current[i] = el; }} position={[c.x, 3, -4 - i]} rotation={[0, 0, c.rot]}>
          <planeGeometry args={[c.w, 13]} />
          <meshBasicMaterial map={tex} color="#e0aa4a" transparent opacity={c.o} depthWrite={false} blending={THREE.AdditiveBlending} />
        </mesh>
      ))}
    </>
  );
}

function Rig() {
  useFrame(({ camera }) => {
    camera.position.x += (view.mx * 0.6 - camera.position.x) * 0.05;
    camera.position.y += (-view.my * 0.35 - view.p * 1.2 - camera.position.y) * 0.05;
    camera.lookAt(0, 0, 0);
  });
  return null;
}

export default function Backdrop({ low }: { low: boolean }) {
  return (
    <Canvas dpr={[1, low ? 1.25 : 1.6]} camera={{ fov: 50, position: [0, 0, 9] }} gl={{ antialias: false, alpha: true }} style={{ background: "transparent" }}>
      <Rig />
      <Shafts />
      <Dust count={low ? 500 : 1300} />
    </Canvas>
  );
}
