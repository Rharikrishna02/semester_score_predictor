import React, { Component } from "react";
import "./Login.css";
import axios from "axios";
import Select from "react-select";
import { Link, useNavigate } from "react-router-dom";

class Register extends Component {
  constructor(props) {
    super(props);
    this.state = {
      mail: "",
      pwd: "",
      cpwd: "",
      category: "",
      iden: "",
      hsm: "hide",
      
    };
    this.options = [
      { value: "stu", label: "Student/Parent" },
      { value: "sta", label: "Staff" },
    ];
    
  }

  handleChange = (selectedOption) => {
    this.setState({ category: selectedOption.value });
    if (selectedOption.value === "sta") {
      this.setState({ hsm: "show" });
      console.log(this.state.hsm);
    }
    if (selectedOption.value === "stu") {
        this.setState({ hsm: "hide" });
        console.log(this.state.hsm);
      }

  };

  register = () => {
    const { cpwd, pwd, category, mail,iden } = this.state;
    if (cpwd !== pwd) {
      alert("Password and Confirm Password does not matches");
    } else {
      if (category === "sta") {
        axios
          .post("http://localhost:5000/sregister", {
            umail: mail,
            upwd: pwd,
            uid:iden,
          })
          .then((response) => {
            alert("Registered Successfully");
          });
          this.props.navigate("/otp");
          
          
      }
    }
  };

  render() {
    const { mail, pwd, cpwd, hsm } = this.state;

    return (
      <div>
        <div>
          <div class="box-form">
            <div class="left">
              <div class="overlay">
                <h1>Let's Register</h1>
                <p>
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                  Curabitur et est sed felis aliquet sollicitudin
                </p>
                <span>
                  <Link to="/">
                    <div>Login</div>
                  </Link>
                </span>
              </div>
            </div>

            <div class="right">
              <h4>Register</h4>
              <p>Let's Register you in..It takes less than a minute</p>

              <form onSubmit={this.register}>
                <div class="inputs">
                  <input
                    type="email"
                    placeholder="Enter Your mail"
                    onChange={(e) => {
                      this.setState({ mail: e.target.value });
                    }}
                    value={mail}
                    required
                  />
                  <input
                    type="password"
                    placeholder="Enter Password"
                    onChange={(e) => {
                      this.setState({ pwd: e.target.value });
                    }}
                    value={pwd}
                    required
                  />
                  <input
                    type="password"
                    placeholder="Confirm Password"
                    onChange={(e) => {
                      this.setState({ cpwd: e.target.value });
                    }}
                    value={cpwd}
                    required
                  />
                  <div style={{ marginTop: "35px" }}>
                    <Select
                      options={this.options}
                      placeholder="Select Category"
                      onChange={this.handleChange}
                      autoFocus={true}
                      required
                    />
                    <div className={hsm}>
                      <input
                        type="text"
                        placeholder="Staff Id"
                        onChange={(e) => {
                          this.setState({ iden: e.target.value });
                        }}
                        required
                      />
                      
                    </div>
                  </div>
                </div>
                <button style={{ marginTop: "30px" }} type="submit">
                  Register
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default Register

export function RegisterRouter(props){
    const navigate=useNavigate()
    return (<Register navigate={navigate}></Register>)
}