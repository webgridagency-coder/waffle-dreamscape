import React, { Suspense, useRef, useState, useEffect } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { OrbitControls, Center } from "@react-three/drei";
import * as THREE from "three";
import heroWaffle from "@/assets/opt-0F0A9353.jpg";

// WebGL support detector
function isWebGLAvailable() {
  try {
    const canvas = document.createElement("canvas");
    return !!(window.WebGLRenderingContext && (canvas.getContext("webgl") || canvas.getContext("experimental-webgl")));
  } catch (e) {
    return false;
  }
}

// Procedural 3D Waffle Model Component
function WaffleMesh({ mousePosRef }: { mousePosRef: React.RefObject<{ x: number; y: number }> }) {
  const groupRef = useRef<THREE.Group>(null);
  
  // Custom materials memoized to prevent constant instantiation and WebGL shader recompiles
  const materials = React.useMemo(() => {
    return {
      waffle: new THREE.MeshStandardMaterial({
        color: "#d4a574",
        roughness: 0.8,
        metalness: 0.1,
        bumpScale: 0.05,
      }),
      chocolate: new THREE.MeshStandardMaterial({
        color: "#2a1508",
        roughness: 0.2,
        metalness: 0.1,
      }),
      cream: new THREE.MeshStandardMaterial({
        color: "#fcf8f2",
        roughness: 0.9,
        metalness: 0.0,
      }),
    };
  }, []);

  // Clean up WebGL resources when unmounted
  useEffect(() => {
    return () => {
      Object.values(materials).forEach((mat) => mat.dispose());
    };
  }, [materials]);

  // Slow auto-rotation + mouse tracking tilt
  useFrame((state) => {
    if (!groupRef.current) return;
    
    // Auto rotation
    groupRef.current.rotation.y = state.clock.getElapsedTime() * 0.15;
    
    // Tilt towards mouse using ref values without triggering React render cycles
    if (mousePosRef.current) {
      const targetX = mousePosRef.current.x * 0.4;
      const targetY = mousePosRef.current.y * 0.4;
      
      groupRef.current.rotation.x = THREE.MathUtils.lerp(groupRef.current.rotation.x, targetY, 0.08);
      groupRef.current.rotation.z = THREE.MathUtils.lerp(groupRef.current.rotation.z, -targetX, 0.08);
    }
  });

  return (
    <group ref={groupRef} scale={1.2}>
      {/* 1. Waffle Base Plate */}
      <mesh material={materials.waffle}>
        <boxGeometry args={[3, 3, 0.3]} />
      </mesh>

      {/* 2. Grid lines on top (4 horizontal, 4 vertical) to form pockets */}
      {/* Border top/bottom */}
      <mesh position={[0, 1.4, 0.2]} material={materials.waffle}>
        <boxGeometry args={[3, 0.2, 0.2]} />
      </mesh>
      <mesh position={[0, -1.4, 0.2]} material={materials.waffle}>
        <boxGeometry args={[3, 0.2, 0.2]} />
      </mesh>
      {/* Border left/right */}
      <mesh position={[1.4, 0, 0.2]} material={materials.waffle}>
        <boxGeometry args={[0.2, 3, 0.2]} />
      </mesh>
      <mesh position={[-1.4, 0, 0.2]} material={materials.waffle}>
        <boxGeometry args={[0.2, 3, 0.2]} />
      </mesh>

      {/* Inner grid vertical dividers */}
      <mesh position={[-0.7, 0, 0.2]} material={materials.waffle}>
        <boxGeometry args={[0.15, 2.8, 0.2]} />
      </mesh>
      <mesh position={[0, 0, 0.2]} material={materials.waffle}>
        <boxGeometry args={[0.15, 2.8, 0.2]} />
      </mesh>
      <mesh position={[0.7, 0, 0.2]} material={materials.waffle}>
        <boxGeometry args={[0.15, 2.8, 0.2]} />
      </mesh>

      {/* Inner grid horizontal dividers */}
      <mesh position={[0, -0.7, 0.2]} material={materials.waffle}>
        <boxGeometry args={[2.8, 0.15, 0.2]} />
      </mesh>
      <mesh position={[0, 0, 0.2]} material={materials.waffle}>
        <boxGeometry args={[2.8, 0.15, 0.2]} />
      </mesh>
      <mesh position={[0, 0.7, 0.2]} material={materials.waffle}>
        <boxGeometry args={[2.8, 0.15, 0.2]} />
      </mesh>

      {/* 3. Chocolate Dripping / Sauce */}
      <group position={[0, 0, 0.22]}>
        <mesh position={[-0.5, 0.4, 0.05]} material={materials.chocolate}>
          <boxGeometry args={[1.5, 0.1, 0.1]} />
        </mesh>
        <mesh position={[0.4, -0.3, 0.05]} material={materials.chocolate}>
          <boxGeometry args={[1.6, 0.08, 0.1]} />
        </mesh>
        <mesh position={[-0.1, 0.1, 0.06]} material={materials.chocolate}>
          <sphereGeometry args={[0.25, 16, 16]} />
        </mesh>
        <mesh position={[0.5, 0.5, 0.06]} material={materials.chocolate}>
          <sphereGeometry args={[0.2, 16, 16]} />
        </mesh>
        {/* Dripping overflow effect */}
        <mesh position={[-1.4, -0.5, -0.05]} material={materials.chocolate}>
          <cylinderGeometry args={[0.08, 0.08, 0.6, 8]} />
        </mesh>
      </group>

      {/* 4. Whipped Cream Blob in Center */}
      <group position={[0.3, 0.3, 0.35]}>
        <mesh material={materials.cream}>
          <sphereGeometry args={[0.4, 16, 16]} />
        </mesh>
        <mesh position={[-0.2, -0.1, 0.05]} material={materials.cream}>
          <sphereGeometry args={[0.25, 16, 16]} />
        </mesh>
        <mesh position={[0.2, -0.15, 0.02]} material={materials.cream}>
          <sphereGeometry args={[0.22, 16, 16]} />
        </mesh>
        <mesh position={[-0.1, 0.25, 0.05]} material={materials.cream}>
          <sphereGeometry args={[0.2, 16, 16]} />
        </mesh>
      </group>

      {/* 5. Orbiting crumbs/particles */}
      <group>
        {[...Array(8)].map((_, i) => {
          const angle = (i / 8) * Math.PI * 2;
          const radius = 2.2 + Math.random() * 0.4;
          const zPos = (Math.random() - 0.5) * 1.5;
          return (
            <mesh
              key={i}
              position={[Math.cos(angle) * radius, Math.sin(angle) * radius, zPos]}
              material={materials.waffle}
              scale={0.06 + Math.random() * 0.06}
            >
              <dodecahedronGeometry />
            </mesh>
          );
        })}
      </group>
    </group>
  );
}

// Fallback Premium CSS 3D Waffle Card
function WaffleFallback({ mousePos }: { mousePos: { x: number; y: number } }) {
  return (
    <div 
      className="relative w-72 h-72 sm:w-96 sm:h-96 md:w-[480px] md:h-[480px] transition-transform duration-300 ease-out flex items-center justify-center"
      style={{
        transform: `perspective(1000px) rotateX(${mousePos.y * 15}deg) rotateY(${mousePos.x * 15}deg)`,
        transformStyle: "preserve-3d"
      }}
    >
      {/* Background shadow & spotlight blur */}
      <div className="absolute inset-0 bg-brand-orange/30 rounded-full blur-[80px] scale-75 animate-glow-pulse pointer-events-none" />
      
      {/* Spotlight ray */}
      <div className="absolute w-[200%] h-[200%] bg-gradient-to-tr from-transparent via-white/5 to-transparent rotate-45 pointer-events-none -translate-x-1/4 -translate-y-1/4" />
      
      {/* Waffle Image */}
      <img
        src={heroWaffle}
        alt="Premium waffle"
        className="w-[85%] h-auto rounded-3xl object-contain drop-shadow-[0_20px_50px_rgba(255,122,0,0.4)] animate-float-slow select-none"
        style={{ transform: "translateZ(30px)" }}
      />

      {/* Floating Crumbs (CSS simulated) */}
      <div className="absolute top-10 left-12 w-3 h-3 bg-brand-orange rounded-full opacity-60 animate-float" style={{ animationDelay: "-1s", transform: "translateZ(50px)" }} />
      <div className="absolute bottom-20 right-10 w-4 h-4 bg-brand-turquoise rounded-full opacity-40 animate-float" style={{ animationDelay: "-3s", transform: "translateZ(40px)" }} />
      <div className="absolute top-1/2 -right-8 w-2 h-2 bg-amber-500 rounded-full opacity-50 animate-float" style={{ animationDelay: "-5s", transform: "translateZ(60px)" }} />
      
      {/* Steam effect lines */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 flex gap-4 opacity-20 pointer-events-none select-none">
        <div className="w-1 h-12 bg-white blur-sm rounded-full animate-bounce" style={{ animationDuration: "3s" }} />
        <div className="w-1 h-16 bg-white blur-sm rounded-full animate-bounce" style={{ animationDuration: "4s", animationDelay: "1s" }} />
        <div className="w-1 h-10 bg-white blur-sm rounded-full animate-bounce" style={{ animationDuration: "2.5s", animationDelay: "0.5s" }} />
      </div>
    </div>
  );
}

export default function Waffle3D() {
  const [webglAvailable, setWebglAvailable] = useState(false);
  const mousePosRef = useRef({ x: 0, y: 0 });
  const [mousePosFallback, setMousePosFallback] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const isAvailable = isWebGLAvailable();
    setWebglAvailable(isAvailable);

    const handleMouseMove = (e: MouseEvent) => {
      const x = (e.clientX / window.innerWidth - 0.5) * 2;
      const y = (e.clientY / window.innerHeight - 0.5) * 2;
      
      if (isAvailable) {
        // Update ref directly without triggering React re-renders
        mousePosRef.current = { x, y };
      } else {
        // Only trigger React state updates if using the fallback CSS card
        setMousePosFallback({ x, y });
      }
    };

    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, []);

  if (!webglAvailable) {
    return <WaffleFallback mousePos={mousePosFallback} />;
  }

  return (
    <div className="w-full h-full min-h-[400px] md:min-h-[500px] relative flex items-center justify-center select-none">
      {/* Soft backing glow */}
      <div className="absolute w-[80%] h-[80%] bg-brand-orange/15 blur-[100px] rounded-full scale-90 pointer-events-none" />
      
      {/* Three.js R3F Canvas */}
      <Canvas
        camera={{ position: [0, 0, 4.5], fov: 60 }}
        gl={{ antialias: true, alpha: true, powerPreference: "high-performance" }}
        className="w-full h-full cursor-grab active:cursor-grabbing"
      >
        <ambientLight intensity={0.4} />
        
        {/* Spotlight for premium lighting & highlights */}
        <pointLight position={[10, 10, 10]} intensity={1.5} />
        <directionalLight position={[-5, 5, 5]} intensity={0.5} />
        
        <Suspense fallback={null}>
          <Center>
            <WaffleMesh mousePosRef={mousePosRef} />
          </Center>
        </Suspense>
        
        <OrbitControls 
          enableZoom={false} 
          enablePan={false} 
          minPolarAngle={Math.PI / 4}
          maxPolarAngle={Math.PI * 3 / 4}
        />
      </Canvas>
      
      {/* Overlay details: drip steam lines */}
      <div className="absolute top-10 left-1/2 -translate-x-1/2 flex gap-4 opacity-10 pointer-events-none">
        <div className="w-0.5 h-12 bg-white blur-sm rounded-full animate-bounce" style={{ animationDuration: "3s" }} />
        <div className="w-0.5 h-16 bg-white blur-sm rounded-full animate-bounce" style={{ animationDuration: "4s", animationDelay: "1s" }} />
        <div className="w-0.5 h-10 bg-white blur-sm rounded-full animate-bounce" style={{ animationDuration: "2.5s", animationDelay: "0.5s" }} />
      </div>
    </div>
  );
}

