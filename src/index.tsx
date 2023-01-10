import * as THREE from 'three'
import './index.scss';
import { createRoot } from 'react-dom/client';
import React, { useRef } from 'react';
import { Canvas, ThreeElements, useThree, useLoader, useFrame } from '@react-three/fiber';
import { OrbitControls, useTexture, Text3D, Text } from '@react-three/drei';
// import { Brush, Subtraction, Addition, Difference, Intersection } from '@react-three/csg'

function PinkMaterial() {
  const repeatX = 0.25;
  const repeatY = 0.25;
  
  const base = useLoader(THREE.TextureLoader, 'color.jpg');
  base.wrapS = THREE.RepeatWrapping;
  base.wrapT = THREE.RepeatWrapping;
  base.repeat.set(repeatX, repeatY);

  const ao = useLoader(THREE.TextureLoader, 'ambient.jpg');
  ao.wrapS = THREE.RepeatWrapping;
  ao.wrapT = THREE.RepeatWrapping;
  ao.repeat.set(repeatX, repeatY);

  return (
    <meshStandardMaterial
      map={base}
      aoMap={ao}
      roughness={0.9}
      metalness={0.5}
      emissive={0x9988bb}
    />
  )
}


function Box() {
  return (
    <mesh
      castShadow
      position={[0, 0, 0.25]}
    >
      <boxGeometry args={[10, 4, 0.5]} />
      <Text font={'fonts/mono.ttf'} fontSize={0.6} color={0x111111} anchorX="right" anchorY="bottom" position={[4.8,-1.8,0.3]}>
        tone.js
      </Text>
      <PinkMaterial />
    </mesh>
  )
}

function BigText() {
  return (
    <mesh
      castShadow
      position={[-5, 1.98, 0.1]}
    >
      <Text3D font={'fonts/test.json'} bevelThickness={0.2} bevelEnabled castShadow letterSpacing={-0.04}>
        JAZZMACHINE
        <PinkMaterial />
      </Text3D>
    </mesh>
  )
}

function Background() {
  const ref = useRef<THREE.Mesh>(null!);
  const viewport = useThree(state => state.viewport);

  const marble = useTexture({
    map: 'bg.jpg',
    roughnessMap: 'roughness.jpg',
    aoMap: 'ambient.jpg',
  });
  return (
    <mesh
      ref={ref}
      receiveShadow
      scale={[viewport.width * 1.2, viewport.height * 1.2, 0.04]}
    >
      <planeGeometry />
      <meshStandardMaterial {...marble} />
    </mesh>
  )
}

createRoot(document.getElementById('root') as HTMLElement).render(
  <Canvas camera={{position:[0,0,10], fov:60}} shadows>
    <OrbitControls enableRotate={true} />
    <ambientLight intensity={0.3} />
    <pointLight position={[-3, -2, 4]} />
    <directionalLight
      position={[2, 3, 5]}
      color={0xccddff}
      intensity={0.8}
      castShadow
    />
    <Background />
    <BigText />
    <Box />
  </Canvas>
)