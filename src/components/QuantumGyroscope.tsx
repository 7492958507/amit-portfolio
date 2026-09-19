import React, { useEffect, useRef } from 'react';
import * as THREE from 'three';

export const QuantumGyroscope: React.FC = () => {
  const mountRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!mountRef.current) return;
    const width = mountRef.current.clientWidth || 320;
    const height = mountRef.current.clientHeight || 320;

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(45, width / height, 0.1, 1000);
    camera.position.z = 18;

    const renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true });
    renderer.setSize(width, height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    mountRef.current.appendChild(renderer.domElement);

    // Group for entire gyroscope
    const gyroGroup = new THREE.Group();
    scene.add(gyroGroup);

    // Central core sphere (glowing wireframe)
    const coreGeo = new THREE.IcosahedronGeometry(2.6, 2);
    const coreMat = new THREE.MeshBasicMaterial({
      color: 0x10b981,
      wireframe: true,
      transparent: true,
      opacity: 0.85,
    });
    const core = new THREE.Mesh(coreGeo, coreMat);
    gyroGroup.add(core);

    // Inner pulsating point light
    const innerLight = new THREE.PointLight(0x10b981, 2, 20);
    gyroGroup.add(innerLight);

    // Ring 1: Emerald
    const ring1Geo = new THREE.TorusGeometry(4.8, 0.08, 16, 100);
    const ring1Mat = new THREE.MeshBasicMaterial({ color: 0x34d399, transparent: true, opacity: 0.75 });
    const ring1 = new THREE.Mesh(ring1Geo, ring1Mat);
    gyroGroup.add(ring1);

    // Ring 2: Cyan
    const ring2Geo = new THREE.TorusGeometry(6.2, 0.08, 16, 100);
    const ring2Mat = new THREE.MeshBasicMaterial({ color: 0x06b6d4, transparent: true, opacity: 0.7 });
    const ring2 = new THREE.Mesh(ring2Geo, ring2Mat);
    ring2.rotation.x = Math.PI / 3;
    gyroGroup.add(ring2);

    // Ring 3: Deep emerald / violet
    const ring3Geo = new THREE.TorusGeometry(7.4, 0.07, 16, 100);
    const ring3Mat = new THREE.MeshBasicMaterial({ color: 0xa855f7, transparent: true, opacity: 0.6 });
    const ring3 = new THREE.Mesh(ring3Geo, ring3Mat);
    ring3.rotation.y = Math.PI / 4;
    gyroGroup.add(ring3);

    // Orbiting electron satellites
    const satGeo = new THREE.SphereGeometry(0.35, 16, 16);
    const satMat1 = new THREE.MeshBasicMaterial({ color: 0x67e8f9 });
    const sat1 = new THREE.Mesh(satGeo, satMat1);
    gyroGroup.add(sat1);

    const satMat2 = new THREE.MeshBasicMaterial({ color: 0x6ee7b7 });
    const sat2 = new THREE.Mesh(satGeo, satMat2);
    gyroGroup.add(sat2);

    // Mouse movement
    let mouseX = 0;
    let mouseY = 0;

    const onMouseMove = (e: MouseEvent) => {
      const rect = mountRef.current?.getBoundingClientRect();
      if (!rect) return;
      mouseX = ((e.clientX - rect.left) / rect.width - 0.5) * 2;
      mouseY = ((e.clientY - rect.top) / rect.height - 0.5) * 2;
    };

    const domElement = mountRef.current;
    domElement.addEventListener('mousemove', onMouseMove);

    let frameId: number;
    const clock = new THREE.Clock();

    const animate = () => {
      frameId = requestAnimationFrame(animate);
      const t = clock.getElapsedTime();

      // Gyro rotations
      core.rotation.y = t * 0.8;
      core.rotation.x = t * 0.4;

      ring1.rotation.z = t * 0.6;
      ring1.rotation.y = t * 0.3;

      ring2.rotation.x = t * 0.5;
      ring2.rotation.z = -t * 0.4;

      ring3.rotation.y = -t * 0.4;
      ring3.rotation.x = t * 0.6;

      // Satellite orbits
      sat1.position.x = Math.cos(t * 1.5) * 4.8;
      sat1.position.y = Math.sin(t * 1.5) * 4.8;
      sat1.position.z = Math.sin(t * 1.5) * 2;

      sat2.position.x = Math.cos(-t * 1.2) * 6.2;
      sat2.position.z = Math.sin(-t * 1.2) * 6.2;
      sat2.position.y = Math.cos(t * 0.9) * 2.5;

      // React to mouse
      gyroGroup.rotation.y += (mouseX * 0.6 - gyroGroup.rotation.y) * 0.08;
      gyroGroup.rotation.x += (-mouseY * 0.6 - gyroGroup.rotation.x) * 0.08;

      renderer.render(scene, camera);
    };

    animate();

    return () => {
      cancelAnimationFrame(frameId);
      domElement.removeEventListener('mousemove', onMouseMove);
      renderer.dispose();
      if (mountRef.current && renderer.domElement) {
        mountRef.current.removeChild(renderer.domElement);
      }
    };
  }, []);

  return (
    <div
      ref={mountRef}
      className="w-full h-full min-h-[280px] flex items-center justify-center cursor-grab active:cursor-grabbing"
    />
  );
};
