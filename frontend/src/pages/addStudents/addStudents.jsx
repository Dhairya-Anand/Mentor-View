import React, {useState} from 'react'
import { fetchAddNewStudents } from './services/addStudents.services';
import toast from 'react-hot-toast';

const AddStudents = () => {
    const [name,setName] = useState("");
    const [email,setEmail] = useState("");

    const handleSubmit = async (e) =>{
        await fetchAddNewStudents(name,email);
    }

    return(
        <div>
            <form onSubmit={handleSubmit}>
                <label htmlFor="name">Student Name</label>
                <input type="text" id='name' value={name} onChange={(e) => {setName(e.target.value)}} required/>
                <br />
                <label htmlFor="email">Email Id</label>
                <input type="text" id='email' value={email} onChange={(e) => {setEmail(e.target.value)}} required/>
                <br />
                <button type='submit'>Submit</button>
            </form>
        </div>
    )
}

export default AddStudents;