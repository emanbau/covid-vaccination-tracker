import React from 'react'
import { useRef, useEffect, useState } from 'react';
import { useData } from './MapData';
import Marks from './Marks';
import { makeStyles } from '@material-ui/core/styles';

// Screen Size
const screenWidth = window.screen.width;
const screenHeight = window.screen.height;

// Styles
const useStyles = makeStyles({
    svg: {
        width: screenWidth,
        height: screenHeight,
        display: 'flex',
        justifyContent: 'center',
    },
});

function ChoroplethMap({ filteredData }) {

    const classes = useStyles();

    const svgRef = useRef();
    
    const [width, setWidth] = useState();
    const [height, setHeight] = useState();

    useEffect(() => {
        setWidth(svgRef.current.clientWidth);
        setHeight(svgRef.current.clientHeight);

        console.log(width);
        console.log(height);
    }, [width, height])

    const data = [useData()];

    // Wait for dataset to load
    if (!data) {
        return (
            <pre>Loading...</pre>
        )
    }


    return (
        <svg className={classes.svg} ref={svgRef}>
            <Marks width={width} height={height} data={data} countryData={filteredData}/>
        </svg>
    )
}

export default ChoroplethMap
