import { Grid } from "@react-three/drei";
import { Marker } from "./Marker";

export default function Boundaries() {
  return (<>
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

    <Grid cellSize={10} cellThickness={1} cellColor={'#6f6f6f'} sectionColor={'#9d4b4b'} infiniteGrid={true} />
  </>
  )
}