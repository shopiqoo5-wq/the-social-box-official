import React, { useRef, useMemo, Suspense, memo } from 'react';
import { Canvas, useFrame, useThree } from '@react-three/fiber';
import { PerspectiveCamera, Sparkles, Environment, AdaptiveDpr, AdaptiveEvents } from '@react-three/drei';
import { useLocation } from 'react-router-dom';
import * as THREE from 'three';

/**
 * PersistentParticles now receives pageParams as a prop instead of
 * calling useLocation() inside <Canvas>. R3F renders in a separate
 * React reconciler and does NOT share the react-router context tree,
 * so useLocation() would throw (or return stale data) inside Canvas.
 */
const PersistentParticles = ({ pageParams }) => {
  const isMobile = typeof window !== 'undefined' && window.innerWidth < 768;
  const count = isMobile ? 300 : 600;
  const mesh = useRef();
  const { viewport } = useThree();

  const dummy = useMemo(() => new THREE.Object3D(), []);
  const particles = useMemo(() => {
    const temp = [];
    for (let i = 0; i < count; i++) {
      temp.push({ 
        t: Math.random() * 100, 
        factor: 20 + Math.random() * 100, 
        speed: (0.01 + Math.random() / 200) * pageParams.speed,
        x: -50 + Math.random() * 100,
        y: -50 + Math.random() * 100,
        z: -50 + Math.random() * 100
      });
    }
    return temp;
  }, [count, pageParams.speed]);

  useFrame((state) => {
    if (!mesh.current) return;
    
    const mouseX = state.mouse.x * (viewport.width / 4);
    const mouseY = state.mouse.y * (viewport.height / 4);

    particles.forEach((p, i) => {
      p.t += p.speed;
      const s = Math.cos(p.t);
      
      dummy.position.set(
        (p.x + Math.cos(p.t / 10) * p.factor) + mouseX,
        (p.y + Math.sin(p.t / 10) * p.factor) + mouseY,
        (p.z + Math.cos(p.t / 10) * p.factor)
      );
      
      dummy.scale.setScalar(s);
      dummy.rotation.set(s * 5, s * 5, s * 5);
      dummy.updateMatrix();
      mesh.current.setMatrixAt(i, dummy.matrix);
    });
    mesh.current.instanceMatrix.needsUpdate = true;
  });

  return (
    <instancedMesh ref={mesh} args={[null, null, count]}>
      <boxGeometry args={[pageParams.scale, pageParams.scale, pageParams.scale]} />
      <meshBasicMaterial color={pageParams.color} transparent opacity={0.12} />
    </instancedMesh>
  );
};

const GlobalScene = memo(function GlobalScene() {
  // useLocation MUST be called outside <Canvas> because R3F uses its own
  // React reconciler that doesn't share react-router's context.
  const location = useLocation();

  const pageParams = useMemo(() => {
    switch (location.pathname) {
      case '/': return { color: '#FFC107', speed: 1.0, scale: 0.05 };
      case '/services': return { color: '#ffffff', speed: 1.2, scale: 0.04 };
      default: return { color: '#FFC107', speed: 0.8, scale: 0.03 };
    }
  }, [location.pathname]);

  return (
    <div className="w-full h-full pointer-events-none opacity-40">
      <Canvas 
        dpr={[1, 1.5]} 
        gl={{ 
           antialias: false, 
           alpha: true,
           powerPreference: "high-performance" 
        }}
      >
        <Suspense fallback={null}>
          <PerspectiveCamera makeDefault position={[0, 0, 40]} fov={50} />
          <ambientLight intensity={1.5} />
          <pointLight position={[10, 10, 10]} intensity={2} color="#FFC107" />
          
          <PersistentParticles pageParams={pageParams} />
          <Sparkles count={40} scale={40} size={1} speed={0.4} color="#FFC107" />
          
          <Environment preset="night" />
          <AdaptiveDpr pixelated />
          <AdaptiveEvents />
        </Suspense>
      </Canvas>
    </div>
  );
});

export default GlobalScene;
