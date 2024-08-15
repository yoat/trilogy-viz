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
import colorPalette from './data/palette.json'; // https://lospec.com/palette-list/survival-kids-gbc-42
import { Marker } from './components/Marker'

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

     
      <Points
        limit={1000} // Optional: max amount of items (for calculating buffer size)
        range={1000} // Optional: draw-range
        // position={[-5, -5, -5]} // Optional: position
      >
        <pointsMaterial vertexColors />
        { 
          trilogies.map((trilogy: ITrilogy, idx: number) => {
            return  <Point position={[
              scaler * trilogy.AlphaScore - offset[0], 
              scaler * trilogy.BravoScore - offset[1], 
              scaler * trilogy.CharlieScore - offset[2]
            ]} color={palette[idx]} />
          })
        }
       
      </Points>
      <Grid cellSize={10} cellThickness={1} cellColor={'#6f6f6f'} sectionColor={'#9d4b4b'} infiniteGrid={true} />
      {/* <Cube ref={cubeRef} /> */}
      <Marker name={"AllBad"} pos={[0,0,0]} col={"#000000"} />
      <Marker name={"1Good"} pos={[10,0,0]} col={"#ff0000"} />
      <Marker name={"2Good"} pos={[0,10,0]} col={"#00ff00"} />
      <Marker name={"3Good"} pos={[0,0,10]} col={"#0000ff"} />
      <Marker name={"12Good"} pos={[10,10,0]} col={"#ffff00"} />
      <Marker name={"23Good"} pos={[0,10,10]} col={"#00ffff"} />
      <Marker name={"13Good"} pos={[10,0,10]} col={"#ff00ff"} />
      <Marker name={"AllGood"} pos={[10,10,10]} col={"#ffffff"} />
      {/* <Marker name={"AllBad"} pos={[-5,-5,-5]} col={"#000000"} />
      <Marker name={"1Good"} pos={[5,-5,-5]} col={"#ff0000"} />
      <Marker name={"2Good"} pos={[-5,5,-5]} col={"#00ff00"} />
      <Marker name={"3Good"} pos={[-5,-5,5]} col={"#0000ff"} />
      <Marker name={"12Good"} pos={[5,5,-5]} col={"#ffff00"} />
      <Marker name={"23Good"} pos={[-5,5,5]} col={"#00ffff"} />
      <Marker name={"13Good"} pos={[5,-5,5]} col={"#ff00ff"} />
      <Marker name={"AllGood"} pos={[5,5,5]} col={"#ffffff"} /> */}

      <GizmoHelper
        alignment="bottom-right" // widget alignment within scene
        margin={[80, 80]} // widget margins (X, Y)
        // onUpdate={/* called during camera animation  */}
        // onTarget={/* return current camera target (e.g. from orbit controls) to center animation */}
        // renderPriority={/* use renderPriority to prevent the helper from disappearing if there is another useFrame(..., 1)*/}
      >
        <GizmoViewport axisColors={['red', 'green', 'blue']} labelColor="black" />
        {/* alternative: <GizmoViewcube /> */}
      </GizmoHelper>
      {/* <Plane /> */}
    </>
  )
}

export { Scene }
