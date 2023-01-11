import './index.scss';
import { createRoot } from 'react-dom/client';
import { Canvas } from '@react-three/fiber';
import { OrbitControls } from '@react-three/drei';
import Shapes from './Shapes';

createRoot(document.getElementById('root') as HTMLElement).render(
  <Canvas camera={{position:[0,0,10], fov:60}} shadows>
    <OrbitControls enableRotate={true} />
    <ambientLight intensity={0.3} />
    <pointLight position={[-3, -2, 4]} />
    <directionalLight
      position={[-1, 3, 5]}
      color={0xccddff}
      intensity={0.8}
      castShadow
    />
    <Shapes />
  </Canvas>
)