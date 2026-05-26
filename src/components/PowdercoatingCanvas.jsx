import React, { useRef, useMemo, Component, Suspense } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Environment } from '@react-three/drei';
import * as THREE from 'three';

// 1. WebGL Error Safety net
class WebGLErrorBoundary extends Component {
  state = { hasError: false };
  static getDerivedStateFromError() { return { hasError: true }; }
  render() {
    if (this.state.hasError) {
      return (
        <div style={{ width: '100%', height: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#888', fontFamily: 'monospace' }}>
          <p>WebGL Error loading canvas layout...</p>
        </div>
      );
    }
    return this.props.children;
  }
}

// 2. Your Mathematical Green Glass Coil Component
function GlassCoils() {
  const meshRef = useRef();

  const { geometry, material } = useMemo(() => {
    class CustomCoilCurve extends THREE.Curve {
      getPoint(t, target = new THREE.Vector3()) {
        const loops = 14; 
        const phi = t * Math.PI * loops;
        const theta = t * Math.PI * 2;
        const radius = 1.4; 
        const rFactor = Math.sin(theta) * 0.4 + 1.0;

        const x = radius * rFactor * Math.sin(phi);
        const y = radius * rFactor * Math.cos(phi) * Math.sin(theta * 0.5);
        const z = radius * rFactor * Math.cos(theta);

        return target.set(x, y, z);
      }
    }

    const path = new CustomCoilCurve();
    const geo = new THREE.TubeGeometry(path, 600, 0.16, 32, true);

    const mat = new THREE.MeshPhysicalMaterial({
      color: '#10b981',
      emissive: '#042f1a',
      roughness: 0.04,
      metalness: 0.0,
      clearcoat: 1.0,
      clearcoatRoughness: 0.02,
      transmission: 1.0,
      thickness: 1.4,
      ior: 1.52,
      attenuationColor: '#059669', 
      attenuationDistance: 0.4,    
      transparent: true,
      side: THREE.DoubleSide,
    });

    return { geometry: geo, material: mat };
  }, []);

  useFrame((state) => {
    if (!meshRef.current) return;
    const elapsedTime = state.clock.getElapsedTime();
    meshRef.current.rotation.y = elapsedTime * 0.35;
    meshRef.current.rotation.x = Math.sin(elapsedTime * 0.15) * 0.25;
  });

  return <mesh ref={meshRef} geometry={geometry} material={material} castShadow receiveShadow />;
}

// 3. THE PRIMARY PARENT WRAPPER COMPONENT
function PowdercoatingCanvas() {
  return (
    <div style={{ position: 'absolute', top: 0, left: 0, width: '100vw', height: '100vh', overflow: 'hidden', backgroundColor: '#dcfce7' }}>
      <div style={{ position: 'absolute', top: 0, left: '25vw', width: '50vw', height: '100vh', pointerEvents: 'auto', zIndex: 1 }}>
        <WebGLErrorBoundary>
          <Canvas
            shadows
            camera={{ position: [0, 0, 4.5], fov: 45 }}
            gl={{ antialias: true, alpha: true, toneMapping: THREE.ACESFilmicToneMapping }}
          >
            <ambientLight intensity={0.9} />
            <directionalLight position={[5, 5, 5]} intensity={4} color="#ffffff" castShadow />
            <directionalLight position={[-5, 3, 2]} intensity={2} color="#a7f3d0" />
            <directionalLight position={[0, -5, 5]} intensity={1.5} color="#ffffff" />

            <Suspense fallback={null}>
              <Environment preset="studio" />
              <GlassCoils />
            </Suspense>
          </Canvas>
        </WebGLErrorBoundary>
      </div>
    </div>
  );
}

// 4. THE DEFAULT EXPORT DECLARATION (Fixes the Uncaught SyntaxError)
export default PowdercoatingCanvas;
