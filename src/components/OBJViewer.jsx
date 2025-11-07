"use client";

import React, { Suspense, useRef, useState, useEffect } from "react";
import { Canvas, useFrame, useLoader } from "@react-three/fiber";
import { OrbitControls } from "@react-three/drei";
import { OBJLoader } from "three/examples/jsm/loaders/OBJLoader";
import * as THREE from "three";
import Loader3D from "./Loader3D"; // 👈 nuovo import

function RotatingModel({ url, onLoaded }) {
  const obj = useLoader(OBJLoader, url);
  const ref = useRef();

  useEffect(() => {
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

export default function OBJViewer({ modelUrl, logo, setLoaded, loaded, progress , setProgress}) {

  // Blocca scroll durante il loading
  useEffect(() => {
    if (!loaded) document.body.style.overflow = "hidden";
    else document.body.style.overflow = "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [loaded]);

  // Simula progressione barra
  useEffect(() => {
    if (!loaded) {
      const interval = setInterval(() => {
        setProgress((prev) => Math.min(prev + Math.random() * 10, 100));
      }, 100);
      return () => clearInterval(interval);
    }
  }, [loaded]);

  const logoUrl = logo?.url
    ? `https://m3dlab-production.up.railway.app${logo.url}`
    : null;

  return (
    <div className="relative w-full h-[500px] overflow-visible">
      {!loaded && <Loader3D logoUrl={logoUrl} progress={progress} />}

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
