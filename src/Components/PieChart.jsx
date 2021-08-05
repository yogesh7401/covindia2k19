import { Component } from "react";
import ReactApexChart from "react-apexcharts"

export default class PieChart extends Component {
    constructor(props) {
      super(props);
      this.state = {
        series: this.props.data,
        options: {
            colors: ['#9CA3AF', '#93C5FD', '#34D399'],
            fill: {
                colors: ['#9CA3AF', '#93C5FD', '#34D399']
              },
          labels: [ 'Not Vaccinated', 'Atleast one dose', 'Completely vaccinated'],
          responsive: [{
            breakpoint: 480,
            options: {
              chart: {
                width: 300
              },
              legend: {
                position: 'bottom'
              }
            }
          }]
        },
      };
    }
    render() {
      return (
        <div id="chart">
            <ReactApexChart options={this.state.options} series={this.state.series} type="donut" width={400} />
        </div>
      )
    }
  }