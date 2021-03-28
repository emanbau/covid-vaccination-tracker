import React from 'react'
import { useRef, useEffect, useState } from 'react';
import { useData } from './MapData';
import Marks from './Marks';
import { makeStyles } from '@material-ui/core/styles';
import { select, pointer } from 'd3';

// Screen Size
const screenWidth = window.screen.width;
const screenHeight = window.screen.height;

// Styles
const useStyles = makeStyles({
    container: {
        overflow: 'hidden',
    },

    svg: {
        width: screenWidth,
        height: screenHeight,
        display: 'flex',
        justifyContent: 'center',
        overflow: 'hidden',
    },
});

function ChoroplethMap({ filteredData }) {

    //  Styles
    const classes = useStyles();

    // Refs
    const svgRef = useRef();
    const tooltipRef = useRef(null);
    
    // Dimensions State
    const [width, setWidth] = useState();
    const [height, setHeight] = useState();

    useEffect(() => {
        // Dimensions Update
        setWidth(svgRef.current.clientWidth);
        setHeight(svgRef.current.clientHeight);
    }, [])

    // Tooltip Div Select
    const Tooltip = select(tooltipRef.current)
        .attr("class", "tooltip")
        .style("opacity", 1)
        .style("background-color", "#fff")
        .style("border", "solid")
        .style("border-width", "1px")
        .style("border-radius", "2px")
        .style("padding", "5px")
        .style("position", "absolute")
        .style("font-family", "Arial, sans-serif")
        .style("font-weight", 300)
        .style("font-size", "15px")

    
    // Tooltip Events
    const mouseover = (event) => {
        Tooltip.style("opacity", 1)
    }

    const mousemove = (event, country, numbers) => {
        Tooltip
            .html(country + "<br>Total Vaccinations: " + numbers + "</br>")
            .style("left", (pointer(event)[0]+10 + "px"))
            .style("top", (pointer(event)[1] + "px"))
    }

    const mouseleave = () => {
        Tooltip.style("opacity", 0)
    }



    // Data Setup
    const data = [useData()];

    // Wait for dataset to load
    if (!data) {
        return (
            <pre>Loading...</pre>
        )
    }


    return (
        <div className={classes.container}>
            <div className="tooltip" ref={tooltipRef}/>
            <svg className={classes.svg} ref={svgRef}>
                <Marks 
                    width={width} 
                    height={height} 
                    data={data} 
                    countryData={filteredData}
                    mouseover={mouseover}
                    mousemove={mousemove}
                    mouseleave={mouseleave}
                />
            </svg>
        </div>
    )
}

export default ChoroplethMap
