import React, { Component } from 'react';
import Chart from 'react-apexcharts';
import "./Home.css";
import "./Result.css";
import logo from "./logo.jpg";
import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';
import axios from 'axios';

class Navbar extends Component {
  state = { clicked: false };

  handleClick = () => {
    this.setState({ clicked: !this.state.clicked });
  }

  render() {
    return (
      <nav>
        <img src={logo} alt="logo" />
        <div>
          <ul id="navbar" className={this.state.clicked ? "#navbar active" : "#navbar"}>
            <li><a href="/home" className='active'>Home</a></li>
            <li><a href="index.html">History</a></li>
            <li><a href="/chatbot">Chatbot</a></li>
            <li><a href="/">Logout</a></li>
          </ul>
        </div>
        <div id="mobile" onClick={this.handleClick}>
          <i id='bar' className={this.state.clicked ? "fas fa-times" : "fas fa-bars"}></i>
        </div>
      </nav>
    );
  }
}

class Result extends Component {
  constructor(props) {
    super(props);

    this.state = {
      series: [98,96,90,87,90],


      options: {
        chart: {
          width: 380,
          type: 'pie',
        },
        labels: ['Subject 1', 'Subject 2', 'Subject 3', 'Subject 4', 'Subject 5'],
        responsive: [{
          breakpoint: 480,
          options: {
            chart: {
              width: 200
            },
            legend: {
              position: 'bottom'
            }
          }
        }]
      },
    };
  }
  componentDidMount() {
    axios.get('http://127.0.0.1:5000/result').then(response => {
      console.log(response.data);
      /*this.setState({ gOtp: response.data });*/
    });
  }

  downloadPDF = () => {
    // create a new jsPDF instance
    const doc = new jsPDF();

    // create a reference to the table and chart elements
    const table = document.querySelector('.table');
    const chart = document.querySelector('.piechart');

    // create a canvas element and set its dimensions to match those of the table
    const canvas = document.createElement('canvas');
    canvas.width = table.offsetWidth;
    canvas.height = table.offsetHeight;

    // create a reference to the canvas context
    const context = canvas.getContext('2d');

    // use html2canvas to render the table onto the canvas
    html2canvas(table).then(canvas => {
      // add the canvas image to the PDF document
      doc.addImage(canvas.toDataURL('image/jpeg'), 'JPEG', 10, 10, 180, 50);

      // use html2canvas to render the chart onto the canvas
      html2canvas(chart).then(canvas => {
        // add the canvas image to the PDF document
        doc.addImage(canvas.toDataURL('image/jpeg'), 'JPEG', 10, 120, 150, 70);

        // save the PDF document
        doc.save('result.pdf');
      });
    });
  }

  render() {
    return (
      <>
        <Navbar />
        <div id="chart" className='piechart' align="center">
          <Chart options={this.state.options} series={this.state.series} type="pie" width="400px" ref={(chart) => { this.chartRef = chart }} />
        </div>
        <table className='table table-bordered'>
                  <thead>
                    <tr>
                      <th>Subject</th>
                      <th>Predicted Mark</th>
                    </tr>
                  </thead>
                  <tbody>
                    {this.state.series.map((value, index) => (
                      <tr key={index}>
                        <td>{this.state.options.labels[index]}</td>
                        <td>{value}</td>
                      </tr>
                    ))}
                  </tbody>            
            </table>
                <button onClick={this.downloadPDF}>Download PDF</button>
            </>
        );
    }
}

export default Result;