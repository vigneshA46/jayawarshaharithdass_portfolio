import { useEffect, useMemo, useRef } from "react";
import * as THREE from "three";
import { useFrame } from "@react-three/fiber";
import { Line, useTexture } from "@react-three/drei";
import landDots from "../data/land-dots.json";
import { view } from "../store";
import { CHAMPAGNE, GOLD, W, } from "./objects-shared";
import { dotSprite, glow, rng } from "./util";

const dark = { color: "#3b2e1c", metalness: 0.9, roughness: 0.3, emissive: "#1c1307", emissiveIntensity: 0.6 } as const;

const ease = (t: number) => { const x = Math.min(Math.max(t, 0), 1); return x * x * (3 - 2 * x); };
/** 0 to 1 as the camera approaches a stop, 0 again once it has moved well past, so far objects never clutter other scenes. */
const presence = (f: number, from: number, to: number) => ease((f - from) / 0.6) * (1 - ease((f - to) / 0.5));

function GoldEdges({ geometry, opacity = 0.9 }: { geometry: THREE.BufferGeometry; opacity?: number }) {
  const edges = useMemo(() => new THREE.EdgesGeometry(geometry), [geometry]);
  return (
    <lineSegments geometry={edges}>
      <lineBasicMaterial color={GOLD} transparent opacity={opacity} toneMapped={false} />
    </lineSegments>
  );
}

/** 01 Cover: a gold-seamed monolith with orbiting shards. */
export function Monolith() {
  const group = useRef<THREE.Group>(null);
  const shards = useRef<THREE.InstancedMesh>(null);
  const box = useMemo(() => new THREE.BoxGeometry(1.7, 5.2, 0.55), []);
  const data = useMemo(() => {
    const r = rng(7);
    return Array.from({ length: 16 }, () => ({ a: r() * 6.28, rad: 2 + r() * 2.2, y: (r() - 0.5) * 5.5, s: 0.025 + r() * 0.05, sp: 0.15 + r() * 0.3 }));
  }, []);
  const m = useMemo(() => new THREE.Object3D(), []);

  useFrame(({ clock }) => {
    const t = view.reduced ? 0 : clock.elapsedTime;
    if (group.current) group.current.rotation.y = Math.sin(t * 0.25) * 0.35;
    data.forEach((d, i) => {
      const a = d.a + t * d.sp;
      m.position.set(Math.cos(a) * d.rad, d.y + Math.sin(t * 0.5 + i) * 0.15, Math.sin(a) * d.rad);
      m.rotation.set(t * 0.4 + i, t * 0.3, 0);
      m.scale.setScalar(d.s);
      m.updateMatrix();
      shards.current?.setMatrixAt(i, m.matrix);
    });
    if (shards.current) shards.current.instanceMatrix.needsUpdate = true;
  });

  return (
    <group position={W.monolith}>
      <group ref={group}>
        <mesh geometry={box}>
          <meshStandardMaterial {...dark} envMapIntensity={2.6} />
        </mesh>
        <GoldEdges geometry={box} />
        {/* glowing seam down the front face */}
        <mesh position={[0, 0, 0.285]}>
          <planeGeometry args={[0.05, 4.6]} />
          <meshBasicMaterial color={glow(CHAMPAGNE, 3)} toneMapped={false} />
        </mesh>
        <mesh position={[0, 0, -0.285]} rotation={[0, Math.PI, 0]}>
          <planeGeometry args={[0.05, 4.6]} />
          <meshBasicMaterial color={glow(CHAMPAGNE, 3)} toneMapped={false} />
        </mesh>
      </group>
      <instancedMesh ref={shards} args={[undefined, undefined, 16]}>
        <octahedronGeometry args={[1, 0]} />
        <meshBasicMaterial color={glow(GOLD, 2.4)} toneMapped={false} />
      </instancedMesh>
      <mesh position={[0, -2.62, 0]} rotation={[-Math.PI / 2, 0, 0]}>
        <ringGeometry args={[1.5, 1.56, 96]} />
        <meshBasicMaterial color={glow(GOLD, 2)} toneMapped={false} transparent opacity={0.8} />
      </mesh>
      <mesh position={[0, -2.62, 0]} rotation={[-Math.PI / 2, 0, 0]}>
        <ringGeometry args={[2.6, 2.63, 96]} />
        <meshBasicMaterial color={GOLD} transparent opacity={0.35} />
      </mesh>
    </group>
  );
}

/** 02 About: three gimballed rings for Vision, Discipline and Execution. */
export function Rings() {
  const refs = [useRef<THREE.Mesh>(null), useRef<THREE.Mesh>(null), useRef<THREE.Mesh>(null)];
  useFrame(({ clock }) => {
    const t = view.reduced ? 0.5 : clock.elapsedTime;
    refs[0].current?.rotation.set(t * 0.35, t * 0.2, 0);
    refs[1].current?.rotation.set(1.1, t * -0.3, t * 0.25);
    refs[2].current?.rotation.set(t * 0.22, 0.6, t * -0.35);
  });
  const radii = [2.1, 1.6, 1.1];
  return (
    <group position={W.rings}>
      {radii.map((r, i) => (
        <mesh key={r} ref={refs[i]}>
          <torusGeometry args={[r, 0.035 + i * 0.008, 24, 160]} />
          <meshStandardMaterial color={GOLD} metalness={1} roughness={0.22} emissive={GOLD} emissiveIntensity={0.25} />
        </mesh>
      ))}
      <mesh>
        <icosahedronGeometry args={[0.38, 1]} />
        <meshBasicMaterial color={glow(CHAMPAGNE, 2.6)} toneMapped={false} wireframe />
      </mesh>
      <mesh>
        <sphereGeometry args={[0.18, 24, 24]} />
        <meshBasicMaterial color={glow(CHAMPAGNE, 3)} toneMapped={false} />
      </mesh>
    </group>
  );
}

function toVec(lat: number, lon: number, r = 1) {
  const phi = ((90 - lat) * Math.PI) / 180;
  const theta = ((lon + 180) * Math.PI) / 180;
  return new THREE.Vector3(-r * Math.sin(phi) * Math.cos(theta), r * Math.cos(phi), r * Math.sin(phi) * Math.sin(theta));
}

// Illustrative lanes only; nothing is labelled, so no specific coverage is implied.
const LANES: [number, number, number, number][] = [
  [13, 80, 25, 55], [25, 55, 51, 4], [13, 80, 1, 104], [1, 104, 35, 139], [51, 4, 40, -74],
  [13, 80, -6, 40], [1, 104, -33, 151], [-6, 40, -23, -46], [35, 139, 34, -118],
];

const arcFrag = /* glsl */ `
  uniform float uTime; uniform float uOffset; varying float vT;
  void main() {
    float head = fract(uTime * 0.16 + uOffset) * 1.5 - 0.25;
    float pulse = smoothstep(0.26, 0.0, abs(vT - head));
    vec3 c = mix(vec3(0.5, 0.33, 0.1), vec3(1.0, 0.85, 0.5), pulse);
    gl_FragColor = vec4(c, 0.2 + pulse * 0.8);
  }
`;
const arcVert = /* glsl */ `varying float vT; void main(){ vT = uv.x; gl_Position = projectionMatrix * modelViewMatrix * vec4(position,1.0); }`;
const atmoFrag = /* glsl */ `
  varying vec3 vN; varying vec3 vV;
  void main(){ float f = pow(1.0 - abs(dot(normalize(vN), normalize(vV))), 3.0); gl_FragColor = vec4(vec3(1.0,0.78,0.36) * f, f * 0.9); }
`;
const atmoVert = /* glsl */ `
  varying vec3 vN; varying vec3 vV;
  void main(){ vN = normalize(normalMatrix * normal); vec4 mv = modelViewMatrix * vec4(position,1.0); vV = -mv.xyz; gl_Position = projectionMatrix * mv; }
`;

/** 03 Parent company: the dotted globe with trade arcs. */
export function Globe() {
  const spin = useRef<THREE.Group>(null);
  const tex = useMemo(() => dotSprite(), []);
  const positions = useMemo(() => {
    const d = landDots as number[];
    const a = new Float32Array((d.length / 2) * 3);
    for (let i = 0; i < d.length; i += 2) {
      const v = toVec(d[i], d[i + 1], 1.003);
      a.set([v.x, v.y, v.z], (i / 2) * 3);
    }
    return a;
  }, []);
  const arcs = useMemo(
    () =>
      LANES.map(([la, lo, lb, lob], i) => {
        const p = toVec(la, lo);
        const q = toVec(lb, lob);
        const mid = p.clone().add(q).normalize().multiplyScalar(1 + p.distanceTo(q) * 0.2);
        return {
          geometry: new THREE.TubeGeometry(new THREE.QuadraticBezierCurve3(p, mid, q), 48, 0.006, 5, false),
          uniforms: { uTime: { value: 0 }, uOffset: { value: i * 0.137 } },
        };
      }),
    [],
  );
  useEffect(() => () => { tex.dispose(); arcs.forEach((x) => x.geometry.dispose()); }, [tex, arcs]);

  useFrame(({ clock }) => {
    if (spin.current) spin.current.rotation.y = view.reduced ? 2.2 : clock.elapsedTime * 0.12 + 2.2;
    arcs.forEach((a) => (a.uniforms.uTime.value = clock.elapsedTime));
  });

  return (
    <group position={W.globe}>
      <group ref={spin} scale={2.4} rotation={[0.25, 0, 0.1]}>
        <mesh>
          <sphereGeometry args={[1, 64, 64]} />
          <meshStandardMaterial color="#0a0908" metalness={0.6} roughness={0.5} />
        </mesh>
        <points>
          <bufferGeometry>
            <bufferAttribute attach="attributes-position" args={[positions, 3]} />
          </bufferGeometry>
          <pointsMaterial map={tex} color={GOLD} size={0.032} sizeAttenuation transparent depthWrite={false} blending={THREE.AdditiveBlending} />
        </points>
        {arcs.map((a, i) => (
          <mesh key={i} geometry={a.geometry}>
            <shaderMaterial vertexShader={arcVert} fragmentShader={arcFrag} uniforms={a.uniforms} transparent depthWrite={false} />
          </mesh>
        ))}
      </group>
      <mesh scale={2.4 * 1.16}>
        <sphereGeometry args={[1, 48, 48]} />
        <shaderMaterial vertexShader={atmoVert} fragmentShader={atmoFrag} transparent side={THREE.BackSide} blending={THREE.AdditiveBlending} depthWrite={false} />
      </mesh>
    </group>
  );
}

/** 04 VENTURE KARTS: a living marketplace network. */
export function Karts() {
  const root = useRef<THREE.Group>(null);
  const group = useRef<THREE.Group>(null);
  const nodes = useRef<THREE.InstancedMesh>(null);
  const { pts, lines } = useMemo(() => {
    const r = rng(21);
    const pts: THREE.Vector3[] = [];
    for (let i = 0; i < 54; i++) {
      const v = new THREE.Vector3(r() * 2 - 1, r() * 2 - 1, r() * 2 - 1);
      if (v.lengthSq() < 0.05 || v.lengthSq() > 1) { i--; continue; }
      pts.push(v.normalize().multiplyScalar(0.6 + r() * 1.5));
    }
    const arr: number[] = [];
    pts.forEach((p, i) => {
      pts
        .map((q, j) => ({ j, d: p.distanceTo(q) }))
        .filter((x) => x.j !== i)
        .sort((x, y) => x.d - y.d)
        .slice(0, 3)
        .forEach((x) => arr.push(p.x, p.y, p.z, pts[x.j].x, pts[x.j].y, pts[x.j].z));
    });
    const g = new THREE.BufferGeometry();
    g.setAttribute("position", new THREE.BufferAttribute(new Float32Array(arr), 3));
    return { pts, lines: g };
  }, []);
  const m = useMemo(() => new THREE.Object3D(), []);

  useFrame(({ clock }) => {
    const t = view.reduced ? 0 : clock.elapsedTime;
    if (group.current) group.current.rotation.y = t * 0.14;
    if (root.current) { const k = presence(view.f, 2.4, 5.6); root.current.scale.setScalar(Math.max(k, 0.0001)); root.current.visible = k > 0.001; }
    pts.forEach((p, i) => {
      m.position.copy(p);
      m.scale.setScalar(0.028 + (Math.sin(t * 1.4 + i * 1.7) * 0.5 + 0.5) * 0.03);
      m.updateMatrix();
      nodes.current?.setMatrixAt(i, m.matrix);
    });
    if (nodes.current) nodes.current.instanceMatrix.needsUpdate = true;
  });

  return (
    <group position={W.karts} ref={root}>
      <group ref={group}>
        <lineSegments geometry={lines}>
          <lineBasicMaterial color={GOLD} transparent opacity={0.34} toneMapped={false} />
        </lineSegments>
        <instancedMesh ref={nodes} args={[undefined, undefined, pts.length]}>
          <sphereGeometry args={[1, 12, 12]} />
          <meshBasicMaterial color={glow(CHAMPAGNE, 2.4)} toneMapped={false} />
        </instancedMesh>
        <mesh>
          <sphereGeometry args={[0.12, 24, 24]} />
          <meshBasicMaterial color={glow(GOLD, 3)} toneMapped={false} />
        </mesh>
      </group>
    </group>
  );
}

/** 05 JD SOVEREIGN: a stepped tower with a floating crown. */
export function Sovereign() {
  const root = useRef<THREE.Group>(null);
  const group = useRef<THREE.Group>(null);
  const crown = useRef<THREE.Mesh>(null);
  const tiers = useMemo(() => [3.0, 2.5, 2.0, 1.5, 1.05].map((w, i) => ({ w, h: 0.78, y: i * 0.78 - 1.5, g: new THREE.BoxGeometry(w, 0.78, w) })), []);
  useFrame(({ clock }) => {
    const t = view.reduced ? 0 : clock.elapsedTime;
    if (group.current) group.current.rotation.y = t * 0.16 + 0.5;
    if (root.current) { const k = presence(view.f, 3.4, 5.6); root.current.scale.setScalar(Math.max(k, 0.0001)); root.current.visible = k > 0.001; }
    if (crown.current) { crown.current.rotation.z = t * 0.5; crown.current.position.y = 2.75 + Math.sin(t * 0.9) * 0.1; }
  });
  return (
    <group position={W.sovereign} ref={root}>
      <pointLight position={[3, 3, 5]} intensity={40} color="#ffd9a0" distance={14} />
      <group ref={group}>
        {tiers.map((s, i) => (
          <group key={i} position={[0, s.y + s.h / 2, 0]}>
            <mesh geometry={s.g}>
              <meshStandardMaterial {...dark} envMapIntensity={2.4} />
            </mesh>
            <GoldEdges geometry={s.g} />
          </group>
        ))}
        <mesh ref={crown} rotation={[Math.PI / 2, 0, 0]}>
          <torusGeometry args={[0.8, 0.028, 16, 96]} />
          <meshBasicMaterial color={glow(CHAMPAGNE, 2.6)} toneMapped={false} />
        </mesh>
        <mesh position={[0, 2.75, 0]}>
          <octahedronGeometry args={[0.2, 0]} />
          <meshBasicMaterial color={glow(GOLD, 3)} toneMapped={false} />
        </mesh>
      </group>
    </group>
  );
}

/** Dashed gold links showing parent company to its two sister ventures. */
export function Links() {
  const root = useRef<THREE.Group>(null);
  useFrame(() => { if (root.current) root.current.visible = view.f > 2.5 && view.f < 5.8; });
  const g = W.globe;
  const pts = (to: [number, number, number]): [number, number, number][] => [[g[0], g[1], g[2]], to];
  return (
    <group ref={root}>
      <Line points={pts(W.karts)} color={GOLD} lineWidth={1.1} dashed dashSize={0.35} gapSize={0.25} transparent opacity={0.55} />
      <Line points={pts(W.sovereign)} color={GOLD} lineWidth={1.1} dashed dashSize={0.35} gapSize={0.25} transparent opacity={0.55} />
    </group>
  );
}

/** 07 Leadership philosophy: five pillars that light up as you read. */
export function Pillars() {
  const refs = useRef<(THREE.Group | null)[]>([]);
  const strips = useRef<(THREE.MeshBasicMaterial | null)[]>([]);
  const lit = useRef<number[]>([0, 0, 0, 0, 0]);
  const box = useMemo(() => new THREE.BoxGeometry(1.05, 5.4, 1.05), []);
  useFrame((_, dt) => {
    for (let i = 0; i < 5; i++) {
      const on = view.f > 5.55 && i <= view.pillar ? 1 : 0;
      lit.current[i] += (on - lit.current[i]) * Math.min(1, dt * 3.5);
      const l = lit.current[i];
      const mat = strips.current[i];
      if (mat) mat.color.set(GOLD).multiplyScalar(0.25 + l * 3.2);
      const g = refs.current[i];
      if (g) g.scale.y = 1 + l * 0.07;
    }
  });
  return (
    <group position={W.pillars}>
      {[0, 1, 2, 3, 4].map((i) => (
        <group key={i} position={[(i - 2) * 2.15, 0, 0]} ref={(el) => { refs.current[i] = el; }}>
          <mesh geometry={box}>
            <meshStandardMaterial {...dark} envMapIntensity={2.4} />
          </mesh>
          <GoldEdges geometry={box} opacity={0.7} />
          <mesh position={[0, 0, 0.54]}>
            <planeGeometry args={[0.06, 4.8]} />
            <meshBasicMaterial ref={(el) => { strips.current[i] = el; }} color={GOLD} toneMapped={false} />
          </mesh>
          <mesh position={[0, 2.78, 0]}>
            <boxGeometry args={[1.25, 0.1, 1.25]} />
            <meshStandardMaterial color={GOLD} metalness={1} roughness={0.25} />
          </mesh>
        </group>
      ))}
      <mesh position={[0, -2.72, 0]} rotation={[-Math.PI / 2, 0, 0]}>
        <planeGeometry args={[13, 3.2]} />
        <meshStandardMaterial color="#0a0908" metalness={0.9} roughness={0.3} />
      </mesh>
    </group>
  );
}

/** 09 Mission: ripples spreading outward like growth rings, generation after generation. */
export function Legacy() {
  const refs = useRef<(THREE.Mesh | null)[]>([]);
  const N = 9;
  useFrame(({ clock }) => {
    const t = view.reduced ? 3 : clock.elapsedTime;
    for (let i = 0; i < N; i++) {
      const u = (t * 0.1 + i / N) % 1;
      const m = refs.current[i];
      if (!m) continue;
      m.scale.setScalar(0.5 + u * 5.2);
      (m.material as THREE.MeshBasicMaterial).opacity = Math.pow(1 - u, 1.6) * 0.9;
    }
  });
  return (
    <group position={W.legacy}>
      <group rotation={[-1.15, 0, 0]}>
        {Array.from({ length: N }, (_, i) => (
          <mesh key={i} ref={(el) => { refs.current[i] = el; }}>
            <ringGeometry args={[0.985, 1, 128]} />
            <meshBasicMaterial color={glow(GOLD, 2)} transparent depthWrite={false} toneMapped={false} blending={THREE.AdditiveBlending} />
          </mesh>
        ))}
      </group>
      <mesh position={[0, 1.6, 0]}>
        <cylinderGeometry args={[0.012, 0.05, 6.4, 12, 1, true]} />
        <meshBasicMaterial color={glow(CHAMPAGNE, 1.6)} transparent opacity={0.28} toneMapped={false} blending={THREE.AdditiveBlending} depthWrite={false} />
      </mesh>
      <mesh>
        <sphereGeometry args={[0.22, 24, 24]} />
        <meshBasicMaterial color={glow(CHAMPAGNE, 3)} toneMapped={false} />
      </mesh>
    </group>
  );
}

/** 10 Contact: the JD mark inside slow halos. */
export function Seal() {
  const tex = useTexture("/brand/jd-logo-hero.webp");
  const halo = useRef<THREE.Group>(null);
  useFrame(({ clock }) => {
    if (halo.current) halo.current.rotation.z = view.reduced ? 0 : clock.elapsedTime * 0.12;
  });
  return (
    <group position={W.seal}>
      <mesh>
        <planeGeometry args={[3.3, 3.3]} />
        <meshBasicMaterial map={tex} transparent toneMapped={false} />
      </mesh>
      <group ref={halo}>
        <mesh>
          <torusGeometry args={[2.35, 0.012, 12, 160]} />
          <meshBasicMaterial color={glow(GOLD, 2)} toneMapped={false} />
        </mesh>
        <mesh rotation={[0, 0, 0.8]}>
          <torusGeometry args={[2.9, 0.008, 12, 160]} />
          <meshBasicMaterial color={GOLD} transparent opacity={0.5} />
        </mesh>
      </group>
    </group>
  );
}
