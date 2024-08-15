import { GizmoHelper, GizmoViewport, Grid, OrbitControls, Point, Points } from '@react-three/drei'
import { useFrame } from '@react-three/fiber'
import { useControls } from 'leva'
import { Perf } from 'r3f-perf'
import { useEffect, useRef, useState } from 'react'
import { BoxGeometry, Mesh, MeshBasicMaterial } from 'three'
import { Cube } from './components/Cube'
import { Plane } from './components/Plane'
import { Sphere } from './components/Sphere'
import trilogyData from './data/trilogy.json';
import { Marker } from './components/Marker'
import Boundaries from './components/Boundaries'
import { ITrilogy } from './util/interfaces'
import DataPoints from './components/DataPoints'

function Scene() {
  const [trilogies, setTrilogies] = useState<ITrilogy[]>(trilogyData);
  const [activeTrilogy, setActiveTrilogy] = useState<ITrilogy | null>(null);
  const [activeIndex, setActiveIndex] = useState<number | null>(null);
  const [scaler, setScaler] = useState<number>(1); //2);
  const [offset, setOffset] = useState<[number, number, number]>([0,0,0]); //[15, 10, 15]);

  const { performance } = useControls('Monitoring', {
    performance: false,
  })

  const { animate } = useControls('Cube', {
    animate: true,
  })

  // const cubeRef = useRef<Mesh<BoxGeometry, MeshBasicMaterial>>(null)

  useFrame((_, delta) => {
    if (animate) {
      // cubeRef.current!.rotation.y += delta / 3
    }
  })

  useEffect(() => {
    console.log('trilogies:', trilogies);
  }, [trilogies]);

  return (
    <>
      {performance && <Perf position='top-left' />}

      <OrbitControls makeDefault enablePan={true} />

      <directionalLight
        position={[-2, 20, 3]}
        intensity={1.5}
        castShadow
        shadow-mapSize={[1024 * 2, 1024 * 2]}
      />
      <ambientLight intensity={0.2} />

      {/* <Cube ref={cubeRef} /> */}
      
      <Boundaries />
      <DataPoints trilogies={trilogies} scaler={scaler} offset={offset} />

      <GizmoHelper
        alignment="bottom-left" // widget alignment within scene
        margin={[80, 80]} // widget margins (X, Y)
        // onUpdate={/* called during camera animation  */}
        // onTarget={/* return current camera target (e.g. from orbit controls) to center animation */}
        // renderPriority={/* use renderPriority to prevent the helper from disappearing if there is another useFrame(..., 1)*/}
      >
        <GizmoViewport axisColors={['red', 'green', 'blue']} labelColor="black" />
        {/* alternative: <GizmoViewcube /> */}
      </GizmoHelper>
    </>
  )
}

export { Scene }
