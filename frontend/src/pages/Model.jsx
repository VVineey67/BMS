import React, { Suspense, useMemo } from "react";
import { Canvas } from "@react-three/fiber";
import {
  OrbitControls,
  useGLTF,
  PerspectiveCamera,
  AdaptiveEvents,
  Stats, // Isse aap FPS check kar sakte hain (baad mein hata dena)
} from "@react-three/drei";

function ConstructionModel({ project }) {
  // Model load logic
  const { scene } = useGLTF(project === "B-47" ? "/b47_model.glb" : "");

  // Model optimization: geometry aur materials ko simplify karna
  useMemo(() => {
    scene.traverse((child) => {
      if (child.isMesh) {
        child.frustumCulled = true; // Sirf dikhne wala hissa render hoga
        child.material.precision = "lowp"; // Material ki quality kam karke speed badhayi
        child.castShadow = false; // Shadows band
        child.receiveShadow = false; // Shadows band
      }
    });
  }, [scene]);

  return <primitive object={scene} scale={1.8} position={[0, -1.5, 0]} />;
}

const View3D = ({ project = "B-47" }) => {
  return (
    <div className="relative w-full h-full bg-[#f8f9fa] overflow-hidden font-sans">
      
      {/* CLEAN TOP UI */}
      <div className="absolute top-6 left-6 z-10 flex flex-col gap-1">
        <h1 className="text-gray-900 text-2xl font-black tracking-tight">
          {project} <span className="text-blue-600">3D</span>
        </h1>
        <div className="flex items-center gap-2">
          <span className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></span>
          <p className="text-gray-500 text-[10px] font-bold uppercase tracking-widest">High Performance Mode</p>
        </div>
      </div>

      {/* PERFORMANCE CANVAS */}
      <Canvas
        // Shadows puri tarah band
        shadows={false} 
        // Resolution control (Speed ke liye 1 rakha hai)
        dpr={1} 
        gl={{ 
          antialias: false, 
          powerPreference: "high-performance",
          stencil: false,
          depth: true,
          alpha: false // Transparency band taaki GPU load kam ho
        }}
      >
        {/* Jab aap rotate karenge toh quality aur kam ho jayegi performance ke liye */}
        <AdaptiveEvents />
        
        <PerspectiveCamera makeDefault position={[12, 10, 12]} fov={30} />
        
        {/* Basic Light: bina kisi fancy effect ke */}
        <ambientLight intensity={1.2} />
        <directionalLight position={[10, 10, 10]} intensity={0.8} />

        <Suspense fallback={null}>
          <ConstructionModel project={project} />
        </Suspense>

        <OrbitControls 
          enableDamping={false} // Damping lag paida kar sakti hai slow PCs par
          makeDefault 
          maxPolarAngle={Math.PI / 1.8} 
        />
        
        {/* FPS counter: ise dekh kar batao kitne FPS aa rahe hain */}
        {/* <Stats /> */} 
      </Canvas>

      {/* FOOTER INFO */}
      <div className="absolute bottom-6 right-6 text-gray-400 text-[10px] font-medium">
        DRAG TO ROTATE • SCROLL TO ZOOM
      </div>
    </div>
  );
};

export default View3D;