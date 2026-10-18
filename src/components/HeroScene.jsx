import { useMemo, useRef } from 'react'
import { Canvas, useFrame } from '@react-three/fiber'
import * as THREE from 'three'

// A cloud of points that starts as a breathing sphere and, as you scroll
// through the hero, unfolds into a slow wave field. One custom shader, one draw call.

const vertexShader = /* glsl */ `
  uniform float uTime;
  uniform float uProgress;
  uniform float uSize;
  uniform vec2 uPointer;
  attribute vec3 aTarget;
  attribute float aRandom;
  varying float vMix;
  varying float vFade;

  void main() {
    // Each point leaves the sphere at a slightly different moment.
    float p = smoothstep(0.0, 1.0, clamp(uProgress * 1.2 - aRandom * 0.2, 0.0, 1.0));
    vec3 pos = mix(position, aTarget, p);

    float breathe = sin(position.y * 3.0 + uTime * 0.8 + aRandom * 6.2831) * 0.05 * (1.0 - p);
    pos += normalize(position) * breathe;

    pos.y += (sin(pos.x * 1.3 + uTime * 0.9) * 0.2 + cos(pos.z * 1.7 + uTime * 0.6) * 0.12) * p;
    pos.xy += uPointer * 0.18 * (1.0 - p);

    vec4 mv = modelViewMatrix * vec4(pos, 1.0);
    gl_Position = projectionMatrix * mv;
    gl_PointSize = uSize * (0.55 + aRandom * 0.9) / -mv.z;

    vMix = aRandom;
    vFade = 1.0 - clamp((-mv.z - 3.0) / 7.0, 0.0, 0.75);
  }
`

const fragmentShader = /* glsl */ `
  uniform vec3 uColorA;
  uniform vec3 uColorB;
  varying float vMix;
  varying float vFade;

  void main() {
    float d = length(gl_PointCoord - 0.5);
    if (d > 0.5) discard;
    float alpha = smoothstep(0.5, 0.05, d) * vFade;
    gl_FragColor = vec4(mix(uColorA, uColorB, vMix), alpha * 0.85);
  }
`

function buildPoints(count) {
  const positions = new Float32Array(count * 3)
  const targets = new Float32Array(count * 3)
  const randoms = new Float32Array(count)
  const radius = 1.75
  const golden = Math.PI * (3 - Math.sqrt(5))
  const cols = Math.ceil(Math.sqrt(count * 2.2))
  const rows = Math.ceil(count / cols)

  for (let i = 0; i < count; i++) {
    // Fibonacci sphere: evenly spread points with no clumping at the poles.
    const y = 1 - (i / (count - 1)) * 2
    const r = Math.sqrt(1 - y * y)
    const theta = golden * i
    positions[i * 3] = Math.cos(theta) * r * radius
    positions[i * 3 + 1] = y * radius
    positions[i * 3 + 2] = Math.sin(theta) * r * radius

    // Wave field: a wide grid lying just below the centre of the frame.
    const col = i % cols
    const row = Math.floor(i / cols)
    targets[i * 3] = (col / (cols - 1) - 0.5) * 11
    targets[i * 3 + 1] = -1.1
    targets[i * 3 + 2] = (row / Math.max(rows - 1, 1) - 0.5) * 6

    randoms[i] = Math.random()
  }
  return { positions, targets, randoms }
}

function Particles({ progressRef, count, dpr }) {
  const group = useRef()
  const pointer = useRef(new THREE.Vector2())
  const { positions, targets, randoms } = useMemo(() => buildPoints(count), [count])

  const uniforms = useMemo(
    () => ({
      uTime: { value: 0 },
      uProgress: { value: 0 },
      uSize: { value: 34 * dpr },
      uPointer: { value: new THREE.Vector2() },
      uColorA: { value: new THREE.Color('#B7A4FF') },
      uColorB: { value: new THREE.Color('#EDE7DC') },
    }),
    [dpr],
  )

  useFrame((state, delta) => {
    const dt = Math.min(delta, 0.05)
    uniforms.uTime.value += dt
    const target = progressRef.current
    uniforms.uProgress.value += (target - uniforms.uProgress.value) * Math.min(dt * 5, 1)

    pointer.current.lerp(state.pointer, Math.min(dt * 3, 1))
    uniforms.uPointer.value.copy(pointer.current)

    if (group.current) {
      const p = uniforms.uProgress.value
      group.current.rotation.y += dt * 0.07 * (1 - p * 0.8)
      group.current.rotation.x = THREE.MathUtils.lerp(0.15, 0.42, p)
    }
  })

  return (
    <group ref={group}>
      <points>
        <bufferGeometry>
          <bufferAttribute attach="attributes-position" args={[positions, 3]} />
          <bufferAttribute attach="attributes-aTarget" args={[targets, 3]} />
          <bufferAttribute attach="attributes-aRandom" args={[randoms, 1]} />
        </bufferGeometry>
        <shaderMaterial
          vertexShader={vertexShader}
          fragmentShader={fragmentShader}
          uniforms={uniforms}
          transparent
          depthWrite={false}
          blending={THREE.AdditiveBlending}
        />
      </points>
    </group>
  )
}

export default function HeroScene({ progressRef, active, lowPower }) {
  const maxDpr = lowPower ? 1.25 : 1.75
  const dpr = Math.min(window.devicePixelRatio || 1, maxDpr)
  const count = lowPower ? 7000 : 16000

  return (
    <Canvas
      className="hero__canvas"
      dpr={dpr}
      frameloop={active ? 'always' : 'never'}
      camera={{ position: [0, 0, 6], fov: 45 }}
      gl={{ antialias: false, alpha: true, powerPreference: 'high-performance' }}
      aria-hidden="true"
    >
      <Particles progressRef={progressRef} count={count} dpr={dpr} />
    </Canvas>
  )
}
