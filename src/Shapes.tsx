import { useEffect, useState } from 'react';
import * as THREE from 'three';
import { useThree, useLoader, Color } from '@react-three/fiber';
import { useTexture, Text3D, Text } from '@react-three/drei';
import { sites, Site } from './sites';

const Shapes = () => {
  const [arrowHover, setArrowHover] = useState(false);
  const [blockHover, setBlockHover] = useState(false);
  const [siteNumber, setSiteNumber] = useState(0);

  const highlightColor: Color = 0x99bbcc;

  const openLink = () => {
    window.open(sites[siteNumber].link, '_blank')?.focus();
  }

  const nextLink = () => {
    console.log(siteNumber);
    if (siteNumber === sites.length - 1) {
      setSiteNumber(0);
    } else {
      setSiteNumber((siteNumber) => siteNumber + 1);
    }
  }
  
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
        onClick={openLink}
      >
        <boxGeometry args={[10, 4, 0.5]} />
        <Text3D
          font={'fonts/test.json'}
          letterSpacing={-0.06}
          position={[-5, 2, -0.2]}
          castShadow
          lineHeight={0.4}
          height={0.3}
        >
          { sites[siteNumber].title }
          <PinkMaterial color={blockHover ? highlightColor : sites[siteNumber].color} />
        </Text3D>
        <PinkMaterial color={blockHover ? highlightColor : sites[siteNumber].color} />
      </mesh>
    )
  }
  
  const Arrows = () => {
    return (
      <mesh
        position={[0, -3, 0.25]}
        rotation={[Math.PI / 2, 0, 0]}
        castShadow
        onPointerOver={() => setArrowHover(true)}
        onPointerOut={() => setArrowHover(false)}
        onClick={nextLink}
      >
        <cylinderGeometry args={[1, 1, 0.5, 3]} />
        <PinkMaterial color={arrowHover ? highlightColor : sites[siteNumber].color} />
      </mesh>
    )
  }
  
  const FlatText = () => {
    return (
      <Text
        font={'fonts/mono.ttf'}
        fontSize={0.6}
        color={0x555555}
        anchorX="right"
        anchorY="bottom"
        position={[4.6,-1.6,0.6]}
      >
        { sites[siteNumber].text }
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
      {/* <BigText /> */}
      <Box />
      <FlatText />
      <Arrows />
    </>
  );
};

export default Shapes;