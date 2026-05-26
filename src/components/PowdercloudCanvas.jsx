import React, { useRef, useMemo, Component, useState, Suspense, useEffect } from 'react';
import { Canvas, useFrame, extend } from '@react-three/fiber';
import { Environment, useGLTF } from '@react-three/drei';
import * as THREE from 'three';

import modelUrl from '/spiralsphere.glb?url';
extend({ Timer: THREE.Timer });

if (typeof window !== 'undefined') {
  const originalWarn = console.warn;
  console.warn = (...args) => {
    if (args && args && typeof args === 'string' && args.includes('THREE.Clock')) return;
    originalWarn(...args);
  };
}

class WebGLErrorBoundary extends Component {
  state = { hasError: false };

  static getDerivedStateFromError() {
    return { hasError: true };
  }

  render() {
    if (this.state.hasError) {
      return (
        <div
          style={{
            width: '100%',
            height: '100%',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            color: '#888',
            fontFamily: 'monospace'
          }}
        >
          <p>WebGL Error loading 3D Asset. Reloading canvas layout...</p>
        </div>
      );
    }

    return this.props.children;
  }
}

function PowderParticles({ active }) {
  const pointsRef = useRef();
  const particleCount = 150;

  const [positions, velocities] = useMemo(() => {
    const pos = new Float32Array(particleCount * 3);
    const vel = new Float32Array(particleCount * 3);

    for (let i = 0; i < particleCount; i++) {
      pos[i * 3] = -2.5 - Math.random() * 1.5;
      pos[i * 3 + 1] = 1.5 + Math.random() * 1.5;
      pos[i * 3 + 2] = 0.5 + Math.random() * 0.5;

      vel[i * 3] = 3.5 + Math.random() * 1.5;
      vel[i * 3 + 1] = -2.5 - Math.random() * 1.5;
      vel[i * 3 + 2] = -0.5 - Math.random() * 0.5;
    }

    return [pos, vel];
  }, []);

  useFrame((state, delta) => {
    if (!pointsRef.current) return;

    const posAttr = pointsRef.current.geometry.attributes.position;

    pointsRef.current.visible = active;

    if (!active) return;

    for (let i = 0; i < particleCount; i++) {
      const i3 = i * 3;

      posAttr.array[i3] += velocities[i3] * delta;
      posAttr.array[i3 + 1] += velocities[i3 + 1] * delta;
      posAttr.array[i3 + 2] += velocities[i3 + 2] * delta;

      if (posAttr.array[i3] > 2.0 || posAttr.array[i3 + 1] < -2.0) {
        posAttr.array[i3] = -2.5 - Math.random() * 1.5;
        posAttr.array[i3 + 1] = 1.5 + Math.random() * 1.5;
        posAttr.array[i3 + 2] = 0.5 + Math.random() * 0.5;
      }
    }

    posAttr.needsUpdate = true;
  });

  return (
    <points ref={pointsRef}>
      <bufferGeometry>
        <bufferAttribute attach="attributes-position" args={[positions, 3]} />
      </bufferGeometry>

      <pointsMaterial
        color="#22c55e"
        size={0.04}
        transparent
        opacity={0.6}
        blending={THREE.AdditiveBlending}
      />
    </points>
  );
}

function AssetWheelRimModel({ setStageText, setParticlesActive }) {
  const groupRef = useRef();
  const innerGroupRef = useRef();
  const matRef = useRef();

  const { scene } = useGLTF(modelUrl);

  // GLOSSY DARK GREEN MATERIAL
  const customMaterial = useMemo(() => {
    const mat = new THREE.MeshPhysicalMaterial({
      color: '#093624',
      roughness: 0.08,
      metalness: 1,
      clearcoat: 1,
      clearcoatRoughness: 0,
      reflectivity: 1,
      envMapIntensity: 3,
      side: THREE.DoubleSide
    });

    matRef.current = mat;

    return mat;
  }, []);

  // AUTO CENTER + SCALE
  useEffect(() => {
    if (!scene || !innerGroupRef.current) return;

    const box = new THREE.Box3().setFromObject(scene);
    const size = new THREE.Vector3();
    const center = new THREE.Vector3();

    box.getSize(size);
    box.getCenter(center);

    scene.position.set(-center.x, -center.y, -center.z);

    const maxDim = Math.max(size.x, size.y, size.z);

    if (maxDim > 0) {
      const scaleFactor = 2.2 / maxDim;
      innerGroupRef.current.scale.set(scaleFactor, scaleFactor, scaleFactor);
    }
  }, [scene]);

  // APPLY MATERIAL
  useMemo(() => {
    scene.traverse((child) => {
      if (child.isMesh) {
        child.material = customMaterial;
        child.castShadow = true;
        child.receiveShadow = true;
      }
    });
  }, [scene, customMaterial]);

  useFrame((state) => {
    if (!groupRef.current) return;

    const elapsedTime = state.clock.getElapsedTime();

    setStageText('PREMIUM GLOSS POWDER COATED RIM');
    setParticlesActive(false);

    // SMOOTH ROTATION
    const rotX = state.mouse.y * -0.85;
    const rotY = state.mouse.x * -0.85 + elapsedTime * 0.85;

    groupRef.current.rotation.x = THREE.MathUtils.lerp(
      groupRef.current.rotation.x,
      rotX,
      0.08
    );

    groupRef.current.rotation.y = THREE.MathUtils.lerp(
      groupRef.current.rotation.y,
      rotY,
      0.08
    );
  });

  return (
    <group ref={groupRef}>
      <group ref={innerGroupRef}>
        <primitive object={scene} />
      </group>
    </group>
  );
}

export default function App() {
  const [stageText, setStageText] = useState('INITIALIZING...');
  const [particlesActive, setParticlesActive] = useState(false);

  return (
    <div
      style={{
        position: 'absolute',
        top: 0,
        left: 0,
        marginBottom:'10vw',
        marginLeft:'25vw',
        width: '100vw',
        height: '100vh',
        overflow: 'hidden',
      
      }}
    >
      <div
        style={{
          position: 'absolute',
          top: 0,
          left: '25vw',
          width: '50vw',
          height: '100vh',
          pointerEvents: 'auto',
          zIndex: 1
        }}
      >
        {/* TOP LABEL */}
       
        

        <WebGLErrorBoundary>
          <Canvas
            shadows
            camera={{ position: [0, 0, 4], fov: 45 }}
            gl={{
              antialias: true,
              alpha: true,
              toneMapping: THREE.ACESFilmicToneMapping
            }}
          >
            {/* MAIN LIGHTS */}
            <ambientLight intensity={0.6} />

            <directionalLight
              position={[5, 5, 5]}
              intensity={5}
              color="#ffffff"
              castShadow
            />

            <directionalLight
              position={[-5, 3, 2]}
              intensity={3}
              color="#8de1ff"
            />

            <directionalLight
              position={[0, -3, 5]}
              intensity={2}
              color="#ffffff"
            />

            {/* RIM LIGHT */}
            <spotLight
              position={[0, 5, 3]}
              intensity={4}
              angle={0.35}
              penumbra={1}
              color="#ffffff"
            />

            {/* FLOOR GLOW */}
            <pointLight
              position={[0, -2, 2]}
              intensity={2}
              color="#0ea5e9"
            />

            <Suspense fallback={null}>
              <Environment preset="city" />

              <PowderParticles active={particlesActive} />

              <AssetWheelRimModel
                setStageText={setStageText}
                setParticlesActive={setParticlesActive}
              />
            </Suspense>
          </Canvas>
        </WebGLErrorBoundary>
      </div>
    </div>
  );
}

useGLTF.preload(modelUrl);