import { useEffect, useState } from "react"

const Snapshot = props => {
    const [countyFacts,setCountyFacts] = useState({
        active:0,
        per_mile:0,
        per_capita:0,

    })
    const {county} = props

    useEffect(() => {
        var sum = Math.ceil(1.25*(county.cases_last_14[0]-county.cases_last_14[13]));
        var cpsm = Math.ceil(sum/(county.area));
        var cpc = Math.ceil(100000*sum/county.population);
        var pi = 100*county.cases_last_14[13]/county.population
        var f = Math.ceil(sum*county.population/county.area/10000)
        setCountyFacts({
            active: sum,
            per_mile: cpsm,
            per_capita: cpc,
            percent_infected: pi.toFixed(1),
            factor: f,
        })
    },[county])
    const style = () =>{
        if(countyFacts.factor<50){
            return(
        {
            background:'rgb(0, 226, 0)',
            color: 'green',
            border:'2px solid darkgreen',
            })
    } else if(countyFacts.factor<500){
        return( {
            background: 'yellow',
            color:'rgb(148, 148, 0)',
            border:'2px solid rgb(148,148,0)'
        })
    } else{
        return( {
            background:'red',
            color: 'maroon',
            border: '2px solid maroon',

        })
    }
}
    return(
        <div className = 'Snapshot'>
            <h2>{county.name}</h2>
            <h2 className = 'Factor' style = {style()}>{countyFacts.factor}</h2>
            <div className = 'countyInfo m-3'>
            <h5>Population: {county.population.toLocaleString('en')}</h5>
            <h5>Area: {county.area.toLocaleString('en')}</h5>
            <h5>Estimated Active Cases: {countyFacts.active.toLocaleString('en')}</h5>
            <h5>Cases per Square Mile: {countyFacts.per_mile}</h5>
            </div>
        </div>
    )
}

export default Snapshot