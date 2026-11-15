import { Suspense, useMemo, useRef } from "react";
import * as THREE from "three";
import { Canvas, useFrame } from "@react-three/fiber";
import { Environment, Lightformer } from "@react-three/drei";
import { Bloom, EffectComposer, ToneMapping } from "@react-three/postprocessing";
import { ToneMappingMode } from "postprocessing";
import Rig from "./Rig";
import { Globe, Karts, Legacy, Links, Monolith, Pillars, Rings, Seal, Sovereign } from "./objects";
import { dotSprite } from "./util";
import { rng } from "./util";
import { view } from "../store";

function Dust({ count }: { count: number }) {
  const ref = useRef<THREE.Points>(null);
  const tex = useMemo(() => dotSprite(), []);
  const pos = useMemo(() => {
    const r = rng(99);
    const a = new Float32Array(count * 3);
    for (let i = 0; i < count; i++) a.set([-10 + r() * 120, (r() - 0.5) * 18, -16 + r() * 28], i * 3);
    return a;
  }, [count]);
  useFrame(({ clock }) => {
    if (ref.current && !view.reduced) ref.current.position.y = Math.sin(clock.elapsedTime * 0.12) * 0.35;
  });
  return (
    <points ref={ref}>
      <bufferGeometry>
        <bufferAttribute attach="attributes-position" args={[pos, 3]} />
      </bufferGeometry>
      <pointsMaterial map={tex} color="#f2d58a" size={0.06} sizeAttenuation transparent opacity={0.55} depthWrite={false} blending={THREE.AdditiveBlending} />
    </points>
  );
}

export default function Scene({ low }: { low: boolean }) {
  return (
    <Canvas
      dpr={[1, low ? 1.25 : 1.75]}
      camera={{ fov: 40, near: 0.1, far: 200, position: [0, 0.4, 11] }}
      gl={{ antialias: !low, powerPreference: "high-performance" }}
      onCreated={({ gl }) => gl.setClearColor("#0e0e0d")}
    >
      <fog attach="fog" args={["#0e0e0d", 34, 95]} />
      <ambientLight intensity={0.2} />
      <directionalLight position={[4, 8, 6]} intensity={1.1} color="#ffe2a8" />
      <Suspense fallback={null}>
        <Environment resolution={128} environmentIntensity={0.9}>
          <Lightformer form="rect" intensity={4} color="#ffe2a8" position={[0, 6, 4]} scale={[14, 3, 1]} />
          <Lightformer form="rect" intensity={2} color="#d9a441" position={[-8, 1, 3]} rotation-y={Math.PI / 2} scale={[8, 5, 1]} />
          <Lightformer form="rect" intensity={3} color="#ffd9a0" position={[5, 0, 8]} rotation-y={-0.5} scale={[1.5, 12, 1]} />
          <Lightformer form="rect" intensity={2.4} color="#f2d58a" position={[-5, 0, 8]} rotation-y={0.5} scale={[1.5, 12, 1]} />
          <Lightformer form="rect" intensity={1.4} color="#f5f1e8" position={[8, 2, -4]} rotation-y={-Math.PI / 2} scale={[8, 5, 1]} />
        </Environment>
        <Seal />
      </Suspense>
      <Rig />
      <Dust count={low ? 700 : 1700} />
      <Monolith />
      <Rings />
      <Globe />
      <Karts />
      <Sovereign />
      <Links />
      <Pillars />
      <Legacy />
      {!low && (
        <EffectComposer multisampling={0}>
          <Bloom intensity={0.75} luminanceThreshold={0.8} luminanceSmoothing={0.3} mipmapBlur />
          <ToneMapping mode={ToneMappingMode.ACES_FILMIC} />
        </EffectComposer>
      )}
    </Canvas>
  );
}
