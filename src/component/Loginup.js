import React,{useState} from 'react'
import { useNavigate } from "react-router-dom";
const Loginup = (props) => {
  let history=useNavigate();
  const [credential,setCredential]=useState({email:"",password:""})
  const handlesubmit=async (e)=>{
    e.preventDefault();
    const response = await fetch('http://localhost:5000/api/auth/login', {
      method: "POST",
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({email:credential.email, password:credential.password }),
    });

    const json = await response.json();
    console.log(json);
    if(json.success){
localStorage.setItem('token',json.authtoken)
// navigate('/');
history("/")
props.showalert("successfully login","success")
    }
    else{
      props.showalert("Invalid Credential","danger")
    }
  }
  const onChange=(e)=>{
    setCredential({...credential,[e.target.name]:e.target.value})}
  return (
    <div>
     <form onSubmit={handlesubmit}>
  <div className="mb-3">
    <label htmlFor="email" className="form-label">Email address</label>
    <input type="email" className="form-control" id="email" name="email" value={credential.email} aria-describedby="emailHelp" onChange={onChange}/>
    <div id="emailHelp" className="form-text">We'll never share your email with anyone else.</div>
  </div>
  <div className="mb-3">
    <label htmlFor="password" className="form-label">Password</label>
    <input type="password" className="form-control" id="password" name="password" value={credential.password} onChange={onChange}/>
  </div>
  <div className="mb-3 form-check">
    <input type="checkbox" className="form-check-input" id="exampleCheck1"/>
    <label className="form-check-label" htmlFor="exampleCheck1">Check me out</label>
  </div>
  <button type="submit" className="btn btn-primary" >Submit</button>
</form>
    </div>
  )
}

export default Loginup
