import { PivotControls } from '@react-three/drei'
import { useControls } from 'leva'
import { useRef } from 'react'
import { BufferGeometry, Group, Mesh, MeshStandardMaterial } from 'three'

export interface ISphereProps {
  name: string;
  pos: [number, number, number];
  col: string;
}

function Sphere({ name, pos, col }: ISphereProps) {
  const sphereRef = useRef<Mesh<BufferGeometry, MeshStandardMaterial>>(null)
  const pivotRef = useRef<Group>(null)

  const { position, color, gizmo } = useControls(name, {
    position: pos,
    color: col,
    gizmo: false,
  })

  return (
    <PivotControls anchor={[0, 0, 0]} depthTest={false} visible={gizmo} ref={pivotRef}>
      <mesh position={position} ref={sphereRef} castShadow>
        <sphereGeometry args={[1, 30, 30]} />
        <meshStandardMaterial color={color} />
      </mesh>
    </PivotControls>
  )
}

export { Sphere }
