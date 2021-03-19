import React from 'react'
import { useData } from './MapData';
import { Marks } from './Marks';

const width = 1000;
const height = 500;

function ChoroplethMap() {

    const data = [useData()];

    if (!data) {
        return (
            <pre>Loading...</pre>
        )
    }

    return (
        <svg width={width} height={height}>
            <Marks data={data}/>
        </svg>
    )
}

export default ChoroplethMap
