import ReactApexChart from 'react-apexcharts'
import React from "react"
import ApexCharts from 'apexcharts'
import 'apexcharts/dist/apexcharts.css' 

export default class Chart extends React.Component {
  constructor(props) {
    super(props)
    let name = props.name
    let range = props.range
    let data = props.data
    let color = props.color
    let bgcolor = props.bgcolor

    this.state = {
      name : name,
      range : range,
      style : {
        padding : '5px',
        paddingLeft : '10px',
        paddingRight : '10px',
        minWidth : '80px',
        background : bgcolor,
        color : 'white',
        borderRadius : "10px",
        marginTop : '5px'
      },
      series: [{
        name: name,
        data : data
      }],
      options: {
        chart: {
          id: 'area-datetime'+name,
          type: 'area',
          zoom: {
            autoScaleYaxis: true
          }
        },
        annotations: {
          yaxis: [{
            y: 30,
            borderColor: '#999',
          }],
          xaxis: [{
            x: new Date('26 Mar 2020').getTime(),
            borderColor: '#999',
            yAxisIndex: 0,
          }]
        },
        title: {
          text : name
        },
        dataLabels: {
          enabled: false
        },
        markers: {
          size: 0,
          style: 'hollow',
        },
        xaxis: {
          type: 'datetime',
          min: new Date(range[0]).getTime(),
          tickAmount: 6,
        },
        tooltip: {
          x: {
            format: 'dd MMM yyyy'
          }
        },
        stroke: {
          show: true,
          curve: 'smooth',
          lineCap: 'butt',
          colors: [color],
          width: 2,
          dashArray: 0,
        },
        fill: {
          colors: color, //colorgradient
          type: 'gradient',
          gradient: {
            shadeIntensity: 1,
            opacityFrom: 0.7,
            opacityTo: 0.9,
            stops: [0, 100]
          }
        },
      },
      selection: 'one_year',
    
    };
  }
  componentDidUpdate(nextProps) {
    if (this.props.place !== nextProps.place) {

      let name = nextProps.name
      let range = nextProps.range
      let data = nextProps.data
      let color = nextProps.color
      let bgcolor = nextProps.bgcolor
      this.setState({
        ...this.state,
        name : name,
        range : range,
        style : {
          padding : '5px',
          paddingLeft : '10px',
          paddingRight : '10px',
          minWidth : '80px',
          background : bgcolor,
          color : 'white',
          borderRadius : "10px",
          marginTop : '5px'
        },
        series: [{
          name: name,
          data : data
        }],
        options: {
          chart: {
            id: 'area-datetime'+name,
            type: 'area',
            zoom: {
              autoScaleYaxis: true
            }
          },
          title: {
            text : name
          },
          xaxis: {
            type: 'datetime',
            min: new Date(range[0]).getTime(),
            tickAmount: 6,
          },
          stroke: {
            show: true,
            curve: 'smooth',
            lineCap: 'butt',
            colors: [color],
            width: 2,
            dashArray: 0,
          },
          fill: {
            colors: color, //colorgradient
            type: 'gradient',
            gradient: {
              shadeIntensity: 1,
              opacityFrom: 0.7,
              opacityTo: 0.9,
              stops: [0, 100]
            }
          },
        },
      })
    }
  }
  updateData(timeline) {
    this.setState({
      selection: timeline
  })
  
    switch (timeline) {
      case 'one_month':
        ApexCharts.exec(
          'area-datetime'+this.state.name,
          'zoomX',
          new Date(this.state.range[this.state.range.length - 32]).getTime(),
          new Date(this.state.range[this.state.range.length - 1]).getTime()
        )
        break
      case 'six_months':
        ApexCharts.exec(
          'area-datetime'+this.state.name,
          'zoomX',
          new Date(this.state.range[this.state.range.length - 186]).getTime(),
          new Date(this.state.range[this.state.range.length - 1]).getTime()
        )
        break
      case 'one_year':
        ApexCharts.exec(
          'area-datetime'+this.state.name,
          'zoomX',
          new Date(this.state.range[0]).getTime(),
          new Date('31 Dec 2020').getTime()
        )
        break
      case 'ytd':
        ApexCharts.exec(
          'area-datetime'+this.state.name,
          'zoomX',
          new Date('01 Jan 2021').getTime(),
          new Date(this.state.range[this.state.range.length - 1]).getTime()
        )
        break
      case 'one_week':
        ApexCharts.exec(
          'area-datetime'+this.state.name,
          'zoomX',
          new Date(this.state.range[this.state.range.length - 8]).getTime(),
          new Date(this.state.range[this.state.range.length - 1]).getTime()
        )
        break
      case 'all':
        ApexCharts.exec(
          'area-datetime'+this.state.name,
          'zoomX',
          new Date(this.state.range[0]).getTime(),
          new Date(this.state.range[this.state.range.length - 1]).getTime()
        )
        break
      default:
    }
  }
  render() {
    return (
          <div id="chart">
            <div className="toolbar">
            <button id="one_month" style={this.state.style} onClick={()=>this.updateData('one_week')}>
              Last 1 Week
            </button>
            &nbsp;
            <button id="one_month" style={this.state.style} onClick={()=>this.updateData('one_month')} >
              Last 1 Month
            </button>
            &nbsp;
            <button id="six_months" style={this.state.style} onClick={()=>this.updateData('six_months')} >
            Last 6 Months
            </button>
            &nbsp;
            <button id="one_year" style={this.state.style} onClick={()=>this.updateData('one_year')}>
            2020
            </button>
            &nbsp;
            <button id="ytd" style={this.state.style} onClick={()=>this.updateData('ytd')}>
            2021
            </button>
            &nbsp;
            <button id="all" style={this.state.style} onClick={()=>this.updateData('all')}>
            ALL
            </button>
            </div>
            <div id="chart-timeline" style={{marginTop: "20px"}}>
              <ReactApexChart 
                options={this.state.options} 
                series={[{
                  name: this.props.name,
                  data : this.props.data
                }]} 
                type="area" 
                height={350} />
            </div>
        </div>
      )
    }
  }