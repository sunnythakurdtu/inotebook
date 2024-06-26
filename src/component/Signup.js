import React,{useState} from 'react'
import { useNavigate } from "react-router-dom";
const Signup = (props) => {
  
  let history=useNavigate();
  const [credential,setCredential]=useState({name:"",email:"",password:"",cpassword:""})
  const handlesubmit=async (e)=>{
    e.preventDefault();
    const {name,email,password}=credential;
    const response = await fetch('http://localhost:5000/api/auth/createuser', {
      method: "POST",
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({name,email, password}),
    });

    const json = await response.json();
    console.log(json);
    if(json.success){
localStorage.setItem('token',json.authtoken)
 history('/login');
props.showalert("Successfully Sign Up","success")
    }
    else{
      props.showalert("unSuccessfully Sign Up","danger")
    }
  }
  const onChange=(e)=>{
    setCredential({...credential,[e.target.name]:e.target.value})}
  return (
    <div>
      <form onSubmit={handlesubmit}>
      <div className="mb-3">
    <label htmlFor="name" className="form-label">Name</label>
    <input type="text" className="form-control" id="name" name="name"aria-describedby="emailHelp" onChange={onChange} minLength={5} required/>
    <div id="emailHelp" className="form-text"></div>
  </div>
  <div className="mb-3">
    <label htmlFor="email" className="form-label">Email address</label>
    <input type="email" className="form-control" id="email" name="email" aria-describedby="emailHelp"onChange={onChange} minLength={5} required/>
    <div id="emailHelp" className="form-text">We'll never share your email with anyone else.</div>
  </div>
  <div className="mb-3">
    <label htmlFor="password" className="form-label">Password</label>
    <input type="password" className="form-control" id="password" name="password" onChange={onChange} minLength={5} required/>
  </div>
  <div className="mb-3">
    <label htmlFor="cpassword" className="form-label">ConfirmPassword</label>
    <input type="password" className="form-control" id="cpassword" name="cpassword" onChange={onChange} minLength={5} required/>
  </div>
  <button type="submit" className="btn btn-primary">Submit</button>
</form>
    </div>
  )
}

export default Signup
