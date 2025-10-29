"use client";

import React, { Suspense, useRef, useState, useEffect } from "react";
import { Canvas, useFrame, useLoader } from "@react-three/fiber";
import { OrbitControls } from "@react-three/drei";
import { OBJLoader } from "three/examples/jsm/loaders/OBJLoader";
import * as THREE from "three";

function RotatingModel({ url, onLoaded }) {
  const obj = useLoader(OBJLoader, url);
  const ref = useRef();

  React.useEffect(() => {
    if (obj) {
      const box = new THREE.Box3().setFromObject(obj);
      const center = new THREE.Vector3();
      box.getCenter(center);
      obj.position.sub(center);
      obj.position.y += 0.35;
      obj.position.x += 0.7;

      obj.traverse((child) => {
        if (child.isMesh) {
          child.material = new THREE.MeshStandardMaterial({ color: "#8aaeae" });
        }
      });

      onLoaded();
    }
  }, [obj, onLoaded]);

  useFrame((state, delta) => {
    if (ref.current) {
      ref.current.rotation.y += delta * (2 * Math.PI / 10);
    }
  });

  return (
    <primitive
      ref={ref}
      object={obj}
      scale={0.0105}
      rotation={[THREE.MathUtils.degToRad(15), 0, 0]}
    />
  );
}

export default function OBJViewer({ modelUrl, logo }) {
  const [loaded, setLoaded] = useState(false);
  const [progress, setProgress] = useState(0);

  // Blocca scroll durante il loading
  useEffect(() => {
    if (!loaded) document.body.style.overflow = "hidden";
    else document.body.style.overflow = "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [loaded]);

  // Simula progressione della barra
  useEffect(() => {
    if (!loaded) {
      const interval = setInterval(() => {
        setProgress((prev) => Math.min(prev + Math.random() * 10, 100));
      }, 100);
      return () => clearInterval(interval);
    }
  }, [loaded]);

  const logoUrl = logo?.url ? `http://127.0.0.1:1337${logo.url}` : null;

  return (
    <div className="relative w-full h-[500px] overflow-visible">
      {/* Loader full screen */}
      {!loaded && logoUrl && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black">
          <div className="relative w-64 h-64 flex items-center justify-center">
            <img
              src={logoUrl}
              alt="Logo"
              className="w-full h-full object-contain"
            />
            <div
              className="absolute top-0 left-0 h-full bg-black"
              style={{
                width: `${100 - progress}%`,
                transition: "width 0.2s linear",
              }}
            />
          </div>
        </div>
      )}

      <Canvas
        style={{
          position: "absolute",
          top: 0,
          left: "-200px",
          width: "170%",
          height: "190%",
        }}
        camera={{ position: [1, 0, 3] }}
      >
        <ambientLight intensity={0.6} />
        <directionalLight position={[5, 5, 5]} intensity={1} />
        <Suspense fallback={null}>
          <RotatingModel url={modelUrl} onLoaded={() => setLoaded(true)} />
        </Suspense>
        <OrbitControls enableZoom={false} />
      </Canvas>
    </div>
  );
}
