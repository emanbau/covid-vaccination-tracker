import { geoEqualEarth, geoPath, scaleThreshold,  schemePurples } from 'd3';


// Color Key
const colorScale = scaleThreshold()
    .domain([1000, 10000, 100000, 1000000, 10000000, 100000000])
    .range(schemePurples[7]);

// Checks data for the country - sets the color on map
const colorCheck = (feature, vaxCountryData, countryData) => {
    for (let i = 0; i < vaxCountryData.length; i++) {
        if(feature.properties.name.toLowerCase().includes(vaxCountryData[i].toLowerCase())) {
            return colorScale(countryData[i].totalVaccinations)
        }
        else {
            continue;
        }
    }
    return '#fff';
}


function Marks({ width, height, data, countryData}) {

    // d3 projections
    const projection = geoEqualEarth()
        .translate([width / 2, height / 2])
        .scale(width/5)        
    const path = geoPath(projection);


    let vaxCountries = [];

    // Match the datasets
    for (let i = 0; i < countryData.length; i++) {
        vaxCountries.push(countryData[i].country.toLowerCase());
    }


    // Wait for dataset to load
    if (!data[0]) {
        return (
            <pre>Loading...</pre>
        )
    }

    return (
    <g className="marks">
        {data[0].features.map((feature, i) => {
            return(
                <path 
                fill={colorCheck(feature, vaxCountries, countryData)}
                stroke='white' 
                strokeLineJoin='round' 
                d={path(feature)}/>
            )
        })}
    </g>
    )
}

export default Marks






