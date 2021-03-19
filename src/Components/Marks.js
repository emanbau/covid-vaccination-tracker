import { geoEqualEarth, geoPath, scaleThreshold, schemeYlOrRd } from 'd3';

const projection = geoEqualEarth()

const path = geoPath(projection);

const colorScale = scaleThreshold()
    .domain([1000, 10000, 100000, 1000000, 10000000, 100000000])
    .range(schemeYlOrRd[7]);

export const Marks = ({ data }) => (
  <g className="marks">
        <path fill='#EFEFEF' d={path({type: 'Sphere'})}/>
    {data.map(feature => (
        <path fill='#D94545' stroke='#EFEFEF' stroke-width='1' d={path(feature)}/>
    ))}
  </g>
);