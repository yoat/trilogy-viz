import { Point, Points } from "@react-three/drei";
import { ITrilogy } from "../util/interfaces";
import { useControls } from 'leva';
import { useCallback, useState } from "react";

import colorPalette from '../data/palette.json'; // https://lospec.com/palette-list/survival-kids-gbc-42
import { EAxisSelection } from "../util/enums";


export interface IDataPointProps {
  trilogies: ITrilogy[];
  scaler: number;
  offset: [number, number, number];
}

export default function DataPoints({ trilogies, scaler, offset }: IDataPointProps) {
  const [palette, setPalette] = useState<string[]>(colorPalette);

  // enum driven Select not supported by Leva yet
  // support for string[] doesn't even seem to be planned
  // const { xAxis, yAxis, zAxis, coloring } = useControls("DataPoints", {
  //   xAxis: EAxisSelection.AlphaScore,
  //   yAxis: EAxisSelection.BravoScore,
  //   zAxis: EAxisSelection.CharlieScore,
  //   coloring: EAxisSelection.TrilogyName,
  // })

  const clickHandler = useCallback((e: any, trilogy: ITrilogy) => {
    console.log('clicked:', e, trilogy);
    e.stopPropagation();
  }, [trilogies]);

  const hoverHandler = useCallback((e: any, trilogy: ITrilogy) => {
    console.log('hovered:', trilogy.Trilogy);
  }, [trilogies]);

  return (
    <Points
      limit={1000} // Optional: max amount of items (for calculating buffer size)
      range={100} // Optional: draw-range
      // position={[-5, -5, -5]} // Optional: position
    >
      <pointsMaterial vertexColors />
      { 
        trilogies.map((trilogy: ITrilogy, idx: number) => {
          return  <Point 
            position={[
              scaler * trilogy.AlphaScore - offset[0], 
              scaler * trilogy.BravoScore - offset[1], 
              scaler * trilogy.CharlieScore - offset[2]
            ]} 
            color={palette[idx]} 
            onPointerOver={(e) => hoverHandler(e, trilogy)}
            onClick={(e) => clickHandler(e, trilogy)}
          />
        })
      }
      
    </Points>
  );
}
