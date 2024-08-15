import { OrbitControls } from '@react-three/drei'
import { useFrame } from '@react-three/fiber'
import { useControls } from 'leva'
import { Perf } from 'r3f-perf'
import { useEffect, useRef, useState } from 'react'
import { BoxGeometry, Mesh, MeshBasicMaterial } from 'three'
import { Cube } from './components/Cube'
import { Plane } from './components/Plane'
import { Sphere } from './components/Sphere'
import trilogyData from './data/trilogy.json';
import colorPalette from './data/palette.json';

export interface ITrilogy {
  Trilogy: string;
  AlphaScore: number;
  AlphaYear: number;
  BravoScore: number;
  BravoYear: number;
  CharlieScore: number;
  CharlieYear: number;
}

function Scene() {
  const [trilogies, setTrilogies] = useState<ITrilogy[]>(trilogyData);
  const [palette, setPalette] = useState<string[]>(colorPalette);

  const { performance } = useControls('Monitoring', {
    performance: false,
  })

  const { animate } = useControls('Cube', {
    animate: true,
  })

  const cubeRef = useRef<Mesh<BoxGeometry, MeshBasicMaterial>>(null)

  useFrame((_, delta) => {
    if (animate) {
      cubeRef.current!.rotation.y += delta / 3
    }
  })

  useEffect(() => {
    console.log('trilogies:', trilogies);
  }, [trilogies]);

  return (
    <>
      {performance && <Perf position='top-left' />}

      <OrbitControls makeDefault />

      <directionalLight
        position={[-2, 2, 3]}
        intensity={1.5}
        castShadow
        shadow-mapSize={[1024 * 2, 1024 * 2]}
      />
      <ambientLight intensity={0.2} />

      { trilogies.map((trilogy: ITrilogy, idx: number) => {
        return (
          <mesh key={idx} position={[idx * 2, 0, 0]}>
            <boxGeometry args={[1, 1, 1]} />
            <meshBasicMaterial color={palette[idx]} />
          </mesh>
        )
        })
      }
      <Cube ref={cubeRef} />
      <Sphere />
      <Plane />
    </>
  )
}

export { Scene }
