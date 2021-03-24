import { geoEqualEarth, geoPath, scaleThreshold,  schemePurples } from 'd3';

const projection = geoEqualEarth()

const path = geoPath(projection);

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
    return 'black';
}


function Marks({ data, countryData}) {

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
        <path fill='#EFEFEF' d={path({type: 'Sphere'})}/>
        {data[0].features.map((feature, i) => {
            return(
                <path 
                fill={colorCheck(feature, vaxCountries, countryData)}
                stroke='#EFEFEF' 
                stroke-width='1' 
                d={path(feature)}/>
            )
        })}
    </g>
    )
}

export default Marks






