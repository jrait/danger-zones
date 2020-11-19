import {useEffect, useState} from 'react'
import axios from 'axios'
import Snapshot from '../components/Snapshot'

const Main = props =>{
    const [state,setState] = useState('Select State')
    const [countyList,setCountyList] = useState([])
    const [countyForm,setCountyForm] = useState()
    const [county,setCounty] = useState()


    useEffect(() =>{
        if(countyForm){
        console.log(countyForm.code)
        axios.get(`http://localhost:8000/api/counties/find/${countyForm}`)
            .then(results => {
                setCounty(results.data.results)
                console.log(results.data.results)
            
            })
            .catch(err => console.log(err))
        }
    },[countyForm])

    useEffect(() =>{
        axios.get('http://localhost:8000/api/states/find/'+state)
            .then(results => {
                console.log(results.data.results);
                setCountyList(results.data.results)
                console.log(countyList)
            })
            .catch(error => console.log(error))
    },[state])

    const all_states = [ 'Select State','AL', 'AK', 'AZ', 'AR', 'CA', 'CO', 'CT', 'DE', 'FL', 'GA', 'HI', 'ID', 'IL', 'IN', 'IA', 'KS', 'KY', 'LA', 'ME', 'MD', 'MA', 'MI', 'MN', 'MS', 'MO', 'MT', 'NE', 'NV', 'NH', 'NJ', 'NM', 'NY', 'NC', 'ND', 'OH', 'OK', 'OR', 'PA', 'RI', 'SC', 'SD', 'TN', 'TX', 'UT', 'VT', 'VA', 'WA', 'WI', 'WV', 'WY' ]
    
    return(
        <div className = 'Main'>
        <div className = 'form'>
            <form >
                <div className = 'm-2'>
                <label>State:</label>
                <select name = 'us_state' value = {state} className = 'form-control' onChange = {(e) => setState(e.target.value)}>
                    {all_states.map((item,idx)=>
                        <option key = {idx}>{item}</option>
                    )}
                </select>
                </div>
                {state != 'Select State'?
                <div className = 'm-2'>
                <label>Enter County Name:  </label>
                <select  value = {countyForm} className = 'form-control' onChange = {(e) => setCountyForm(e.target.value)}>
                    <option>Select County</option>
                    {countyList.map((item,idx)=>
                        <option key = {idx} value = {item.county_code}>{item.name}</option>
                    )}
                </select>
                </div>
                :null}
                {/* <input className = 'btn btn-info m-4' type = 'submit' value = 'Submit'></input> */}
            </form>
            
            </div>
            {county?
            <div className = 'd-flex justify-content-center'>
            <Snapshot county = {county}></Snapshot>
            </div>
            
        :null}

        </div>
    )
}
export default Main