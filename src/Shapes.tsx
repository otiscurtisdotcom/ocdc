import { useState } from 'react';
import * as THREE from 'three';
import { useThree, useLoader, Color } from '@react-three/fiber';
import { useTexture, Text3D, Text } from '@react-three/drei';

const Shapes = () => {
  const [arrowHover, setArrowHover] = useState(false);
  const [blockHover, setBlockHover] = useState(false);
  
  const PinkMaterial = (props: {color: Color}) => {
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
        emissive={props.color}
      />
    )
  }
  
  
  const Box = () => {
    return (
      <mesh
        castShadow
        position={[0, 0, 0.25]}
        onPointerOver={() => setBlockHover(true)}
        onPointerOut={() => setBlockHover(false)}
      >
        <boxGeometry args={[10, 4, 0.5]} />
        <FlatText />
        <PinkMaterial color={blockHover ? 0x99bb88 : 0x9988bb} />
      </mesh>
    )
  }
  
  const Arrows = () => {
    return (
      <mesh
        position={[0, -3, 0.25]}
        rotation={[Math.PI / 2, 0, 0]}
        onPointerOver={() => setArrowHover(true)}
        onPointerOut={() => setArrowHover(false)}
        castShadow
      >
        <cylinderGeometry args={[1, 1, 0.5, 3]} />
        <PinkMaterial color={arrowHover ? 0x99bb88 : 0x9988bb} />
      </mesh>
    )
  }
  
  const BigText = () => {
    return (
      <mesh
        castShadow
        position={[-5, 1.98, 0.1]}
      >
        <Text3D
          font={'fonts/test.json'}
          letterSpacing={-0.04}
          bevelEnabled
          bevelThickness={0.2}
          castShadow
        >
          STROLLIN
          <PinkMaterial color={blockHover ? 0x99bb88 : 0x9988bb} />
        </Text3D>
      </mesh>
    )
  }
  
  const FlatText = () => {
    return (
      <Text font={'fonts/mono.ttf'} fontSize={0.6} color={0x555555} anchorX="right" anchorY="bottom" position={[4.8,-1.8,0.3]}>
        tone.js
      </Text>
    );
  }
  
  const Background = () => {
    const viewport = useThree(state => state.viewport);
  
    const marble = useTexture({
      map: 'bg.jpg',
      roughnessMap: 'roughness.jpg',
      aoMap: 'ambient.jpg',
    });
    return (
      <mesh
        receiveShadow
        scale={[viewport.width * 1.2, viewport.height * 1.2, 0.04]}
      >
        <planeGeometry />
        <meshStandardMaterial {...marble} />
      </mesh>
    )
  }

  return (
    <>
      <Background />
      <BigText />
      <Box />
      <Arrows />
    </>
  );
};

export default Shapes;