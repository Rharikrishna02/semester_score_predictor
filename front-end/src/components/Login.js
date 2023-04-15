import React,{useState} from "react";
import './Login.css';
import axios from "axios";
import {Link,useNavigate} from 'react-router-dom';
import Select from 'react-select';

function Login(){
  const [mail,setmail]=useState('');
  const [pwd,setpwd]=useState('');
  const navigate=useNavigate();
  //const navigate=useNavigation();
  const [category,setcategory]=useState('');
  const options = [
    {value: "stu", label: "Student/Parent"},
    {value: "sta", label: "Staff"},
  ]

  const lcheck = (e)=>{
    e.preventDefault();
    if(category==="stu"){
      try{
      axios.post("http://localhost:5000/login",{
        umail:mail,
        upwd:pwd,
      }).then((response)=>{

        if(response.data==="Success"){
          navigate("/home")}
        else{
          alert("Invalid Username/Password")
        }
      });
    }
    catch(error){
      console.log(error)
    }
    }
    if(category==="sta"){
      axios.post("http://localhost:5000/login",{
        umail:mail,
        upwd:pwd,
      }).then((response)=>{

        if(response.data==="Success"){
          navigate("/home")}
        else{
          alert("Invalid Username/Password")
        }
      });
    }
  }
  const handleChange = (selectedOption) => {
    setcategory(selectedOption.value);
  };
  return(
    <div className="body1">
      <div className="box-form">
        <div className="left">

          <div className="overlay">
            <h1>Let's Login</h1>
            <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit.
              Curabitur et est sed felis aliquet sollicitudin</p>
            <span>


              <Link to="/register">
                <div>
                  Register
                </div>
              </Link>
            </span>
          </div>
        </div>


        <div className="right">

          <h4>Login</h4>
          <p>Let's Log you in..It takes less than a minute</p>
          <form onSubmit={lcheck}>
            <div className="inputs">

              <input type="email" placeholder="Enter Your mail" onChange={(e)=>{
                setmail(e.target.value);
              }}/>
              <input style={{marginBottom:'30px'}} type="password" placeholder="Enter Password" onChange={(e)=>{
                setpwd(e.target.value);
              }}/>
              <Select   options={options} 
                        placeholder="Select Category" 
                        onChange={handleChange}
                        autoFocus={true}
                        required
              />  



            </div>
            <button style={{marginTop:'30px'}} type="submit">Login</button>
          </form>

        </div>

      </div>
    </div>
  )

}

export default Login;
