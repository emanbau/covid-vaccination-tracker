import { geoEqualEarth, geoPath } from 'd3';

const projection = geoEqualEarth()

const path = geoPath(projection);

export const Marks = ({ data }) => (
  <g className="marks">
    {data.map(feature => (
        <path fill='black' stroke='#FF7676' stroke-width='2' d={path(feature)}/>
    ))}
  </g>
);