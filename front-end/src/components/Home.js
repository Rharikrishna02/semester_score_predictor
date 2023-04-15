import React, { Component } from 'react';
import "./Home.css"
import axios from 'axios';
import logo from "./logo.jpg"
import Select from 'react-select';
import { useNavigate } from 'react-router-dom';
class Navbar extends Component{
    state={clicked:false};
    handleClick=()=>{
        this.setState({clicked:!this.state.clicked})
    }
    render(){
    return(
        <nav>
            <img src={logo} alt="logo"/>
            <div>
            <ul id="navbar" className={this.state.clicked?"#navbar active":"#navbar"}>
            <li><a href="index.html" className='active'>Home</a></li>
            <li><a href="index.html">History</a></li>
            <li><a href="index.html">Logout</a></li>
            </ul>  
            </div>
            <div id="mobile" onClick={this.handleClick}>
                <i id='bar' className={this.state.clicked?"fas fa-times":"fas fa-bars"}></i>
            </div>
        </nav>

    );
}
}
class Home extends Component{
    constructor(props) {
        super(props);
        this.state = {
          
          category: "",
          hsm1:"hide",hsm2:"hide",hsm3:"hide",hsm4:"hide",
          hsm5:"hide",hsm6:"hide",hsm7:"hide",hsm8:"hide",
          cie1:[],cie2:[],cie3:[],inputValue:"",chsm1:"show",chsm2:"hide",chsm3:"hide",
          
        };

        
        
        this.options = [
          { value: "1", label: "One" },
          { value: "2", label: "Two" },
          { value: "3", label: "Three" },
          { value: "4", label: "Four" },
          { value: "5", label: "Five" },
          { value: "6", label: "Six" },
          { value: "7", label: "Seven" },
          { value: "8", label: "Eight" },
        ];
        this.handleSubmit = this.handleSubmit.bind(this);
      }
      handleSubmit = (e)=> {
        e.preventDefault()
        axios.post('http://localhost:5000/receive', {
          cie1: this.state.cie1,
          cie2: this.state.cie2,
          cie3: this.state.cie3
        })
          .then(response => { console.log(response); this.props.navigate("/result");})
          .catch(error => console.log(error));
      }


      handleVal1 = (event) => {
        this.setState({ inputValue: event.target.value });
        const newItem = event.target.value;
    const newItems = this.state.cie1.concat(newItem);
    this.setState({ cie1: newItems, inputValue: '' });
    console.log(this.state.cie1)
      }
      handleVal2 = (event) => {
        this.setState({ inputValue: event.target.value });
        const newItem = event.target.value;
    const newItems = this.state.cie2.concat(newItem);
    this.setState({ cie2: newItems, inputValue: '' });
    console.log(this.state.cie2)
      }
      handleVal3 = (event) => {
        this.setState({ inputValue: event.target.value });
        const newItem = event.target.value;
    const newItems = this.state.cie3.concat(newItem);
    this.setState({ cie3: newItems, inputValue: '' });
    console.log(this.state.cie3)
      }

      handleCie1 = (e) => {
        this.setState({chsm1:"hide"})
        this.setState({chsm2:"show"})
      }
      handleCie2 = (e) => {
        this.setState({chsm2:"hide"})
        this.setState({chsm3:"show"})
      }

    handleChange = (selectedOption) => {
        this.setState({ category: selectedOption.value });
        if (selectedOption.value === "1") {
          this.setState({ hsm1: "show" });
        }
        else if (selectedOption.value === "2") {
            this.setState({ hsm1: "show" });
            this.setState({ hsm2: "show" });
        }
        else if (selectedOption.value === "3") {
            this.setState({ hsm1: "show" });
            this.setState({ hsm2: "show" });
            this.setState({ hsm3: "show" });
        }
        else if (selectedOption.value === "4") {
            this.setState({ hsm1: "show" });
            this.setState({ hsm2: "show" });
            this.setState({ hsm3: "show" });
            this.setState({ hsm4: "show" });
        }
        else if (selectedOption.value === "5") {
            this.setState({ hsm1: "show" });
            this.setState({ hsm2: "show" });
            this.setState({ hsm3: "show" });
            this.setState({ hsm4: "show" });
            this.setState({ hsm5: "show" });
        }
        else if (selectedOption.value === "6") {
            this.setState({ hsm1: "show" });
            this.setState({ hsm2: "show" });
            this.setState({ hsm3: "show" });
            this.setState({ hsm4: "show" });
            this.setState({ hsm5: "show" });
            this.setState({ hsm6: "show" });
            
        }
        else if (selectedOption.value === "7") {
            this.setState({ hsm1: "show" });
            this.setState({ hsm2: "show" });
            this.setState({ hsm3: "show" });
            this.setState({ hsm4: "show" });
            this.setState({ hsm5: "show" });
            this.setState({ hsm6: "show" });
            this.setState({ hsm7: "show" });
        }
        else{
            this.setState({ hsm1: "show" });
            this.setState({ hsm2: "show" });
            this.setState({ hsm3: "show" });
            this.setState({ hsm4: "show" });
            this.setState({ hsm5: "show" });
            this.setState({ hsm6: "show" });
            this.setState({ hsm7: "show" });
            this.setState({ hsm8: "show" });
        }
    
      };
 
    render(){
        const { hsm1,hsm2,hsm3,hsm4,hsm5,hsm6,hsm7,hsm8,inputValue,cie1,cie2,cie3,chsm1,chsm2,chsm3 } = this.state;
        return(
            <><Navbar/>
            <div>
            <div className='dummy'>
            <h2>Let's Predict your Marks</h2>
            <div className="upper">
            

            
            <div className="btn-group">
            <button id="cie">CIE based</button>
            <button id="sem">Semester based</button>
            </div>
            </div>
            <form onSubmit={this.handleSubmit}>
            
            <div className='form1'>
                <div className='signupFrm'>
                

                    <div id="subject">
                    <label for="mmmmmm">Enter Number of Subjects</label>
                    <div style={{zIndex:'9',width:'30%',float:'right',marginTop:'45px',marginRight:'-20%',marginLeft:'auto'}}><Select   options={this.options} 
                        placeholder="Select Category" 
                        onChange={this.handleChange}
                        id="mmmmmm"
                        autoFocus={true}
                        required
              />  </div></div>
              <div className={chsm1}>

                        <h4>Enter your CIE-1  Marks</h4>
                    <div className="all">
                    <div className="left">

                        <div className={hsm1}>

                    <div className="mark">
                    <label for="subject1">Subject 1</label>
                    <input type="number"  min="0" max="100" onBlur={this.handleVal1} /></div>
                    </div>

                    <div className={hsm2}>
                    <div className="mark">
                    <label for="subject2">Subject 2</label>
                    <input type="number"  min="0" max="100" onBlur={this.handleVal1} /></div>
                    </div>

                    <div className={hsm3}>
                    <div className="mark">
                    <label for="subject3">Subject 3</label>
                    <input type="number"  min="0" max="100" onBlur={this.handleVal1} /></div>
                    </div>

                    <div className={hsm4}>
                    <div className="mark">
                    <label for="subject4">Subject 4</label>
                    <input type="number"  min="0" max="100" onBlur={this.handleVal1} /></div>
                    </div>
                    </div>


                    <div className="right">
                    <div className={hsm5}>
                    <div className="mark">
                    <label for="subject5">Subject 5</label>
                    <input type="number"  min="0" max="100" onBlur={this.handleVal1} /></div>
                    </div>

                    <div className={hsm6}>
                    <div className="mark">
                    <label for="subject6">Subject 6</label>
                    <input type="number"  min="0" max="100" onBlur={this.handleVal1} /></div>
                    </div>

                    <div className={hsm7}>
                    <div className="mark">
                    <label for="subject7">Subject 7</label>
                    <input type="number"  min="0" max="100" onBlur={this.handleVal1} /></div>
                    </div>

                    <div className={hsm8}>
                    <div className="mark">
                    <label for="subject8">Subject 8</label>
                    <input type="number"  min="0" max="100" onBlur={this.handleVal1} /></div>
                    </div>
                    </div>
                </div>
                <div className="sub-but">
            <button id="sub" type="button" onClick={this.handleCie1}>Next</button></div>
                </div>
            

            <div className={chsm2}>

                        <h4>Enter your CIE-2  Marks</h4>
                    <div className="all">
                    <div className="left">

                        <div className={hsm1}>

                    <div className="mark">
                    <label for="subject1">Subject 1</label>
                    <input type="number"  min="0" max="100" onBlur={this.handleVal2} /></div>
                    </div>

                    <div className={hsm2}>
                    <div className="mark">
                    <label for="subject2">Subject 2</label>
                    <input type="number"  min="0" max="100" onBlur={this.handleVal2} /></div>
                    </div>

                    <div className={hsm3}>
                    <div className="mark">
                    <label for="subject3">Subject 3</label>
                    <input type="number"  min="0" max="100" onBlur={this.handleVal2} /></div>
                    </div>

                    <div className={hsm4}>
                    <div className="mark">
                    <label for="subject4">Subject 4</label>
                    <input type="number"  min="0" max="100" onBlur={this.handleVal2} /></div>
                    </div>
                    </div>


                    <div className="right">
                    <div className={hsm5}>
                    <div className="mark">
                    <label for="subject5">Subject 5</label>
                    <input type="number"  min="0" max="100" onBlur={this.handleVal2} /></div>
                    </div>

                    <div className={hsm6}>
                    <div className="mark">
                    <label for="subject6">Subject 6</label>
                    <input type="number"  min="0" max="100" onBlur={this.handleVal2} /></div>
                    </div>

                    <div className={hsm7}>
                    <div className="mark">
                    <label for="subject7">Subject 7</label>
                    <input type="number"  min="0" max="100" onBlur={this.handleVal2} /></div>
                    </div>

                    <div className={hsm8}>
                    <div className="mark">
                    <label for="subject8">Subject 8</label>
                    <input type="number"  min="0" max="100" onBlur={this.handleVal2} /></div>
                    </div>
                    </div>
                </div>
                <div className="sub-but">
            <button id="sub" type="button" onClick={this.handleCie2}>Next</button></div>
                </div>
            
            <div className={chsm3}>

                        <h4>Enter your CIE-3  Marks</h4>
        <div className="all">
        <div className="left">

                        <div className={hsm1}>

                    <div className="mark">
        <label for="subject1">Subject 1</label>
        <input type="number"  min="0" max="100" onBlur={this.handleVal3} /></div>
        </div>

                    <div className={hsm2}>
        <div className="mark">
        <label for="subject2">Subject 2</label>
        <input type="number"  min="0" max="100" onBlur={this.handleVal3} /></div>
        </div>

                    <div className={hsm3}>
        <div className="mark">
        <label for="subject3">Subject 3</label>
        <input type="number"  min="0" max="100" onBlur={this.handleVal3} /></div>
        </div>

                    <div className={hsm4}>
        <div className="mark">
        <label for="subject4">Subject 4</label>
        <input type="number"  min="0" max="100" onBlur={this.handleVal3} /></div>
        </div>
        </div>


                    <div className="right">
        <div className={hsm5}>
        <div className="mark">
        <label for="subject5">Subject 5</label>
        <input type="number"  min="0" max="100" onBlur={this.handleVal3} /></div>
        </div>

                    <div className={hsm6}>
        <div className="mark">
        <label for="subject6">Subject 6</label>
        <input type="number"  min="0" max="100" onBlur={this.handleVal3} /></div>
        </div>

                    <div className={hsm7}>
        <div className="mark">
        <label for="subject7">Subject 7</label>
        <input type="number"  min="0" max="100" onBlur={this.handleVal3} /></div>
        </div>

                    <div className={hsm8}>
        <div className="mark">
        <label for="subject8">Subject 8</label>
        <input type="number"  min="0" max="100" onBlur={this.handleVal3} /></div>
        </div>
        </div>
    </div>
    <div className="sub-but">
<button id="sub" type="submit" >Submit</button></div>
    </div>
    </div>

    </div>
            
            </form>
            
            </div>
</div>
            </> 
        );
    }
}
export default Home;

export function ResultRouter(props){
    const navigate=useNavigate()
    return (<Home navigate={navigate}></Home>)
}