
import {useState} from 'react'
import axios from 'axios'


const Setup = props =>{
    const [form,setForm] = useState()


    const handleSubmit = (e) =>{
        e.preventDefault()
        axios.post('http://localhost:8000/api/counties/create',form)
            .then(results => console.log(results))
            .catch(err => console.log(err))

    }
    const runUpdate = (e) =>{
        axios.put('http://localhost:8000/api/counties/update',form)
            .then(results => console.log(results))
            .catch(err => console.log(err))
    }
    
    return(
        <div>
            <form onSubmit = {handleSubmit}>
                <label>Enter County file:  </label>
                <input type = 'file' name = 'county' onChange = {(e) => setForm({file: e.target.files[0]})}/>
                <input type = 'submit' value = 'Submit'></input>
            </form>
            <button onClick = {runUpdate}>Run Update</button>
        </div>
    )
}
export default Setup