import ReactApexChart from 'react-apexcharts'
import React, { useState } from "react"
import ApexCharts from 'apexcharts'
import 'apexcharts/dist/apexcharts.css' 

export default function Chart(props) {
    const [ name , setName ] = useState(props.name)
    // const [ selection , setSelection ] = useState('one_year')
    // console.log(props.name)
      const [ state , setState ] = useState({
        range : props.range,
        style : {
          padding : '5px',
          paddingLeft : '10px',
          paddingRight : '10px',
          minWidth : '80px',
          background : props.bgcolor,
          color : 'white',
          borderRadius : "10px",
          marginTop : '5px'
        },
        series: [{
          name: name,
          data : props.data
        }],
        options: {
          chart: {
            id: 'area-datetime'+props.name,
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
            text : props.name
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
            min: new Date(props.range[0]).getTime(),
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
            colors: [props.color],
            width: 2,
            dashArray: 0,
          },
          fill: {
            colors: props.color, //colorgradient
            type: 'gradient',
            gradient: {
              shadeIntensity: 1,
              opacityFrom: 0.7,
              opacityTo: 0.9,
              stops: [0, 100]
            }
          },
          selection: 'one_year'
        },
      })

  
    function updateData(timeline) {
        setState({
          ...state,
          selection : timeline
        })
    
      switch (timeline) {
        case 'one_month':
          ApexCharts.exec(
            'area-datetime'+state.name,
            'zoomX',
            new Date(state.range[state.range.length - 32]).getTime(),
            new Date(state.range[state.range.length - 1]).getTime()
          )
          break
        case 'six_months':
          ApexCharts.exec(
            'area-datetime'+state.name,
            'zoomX',
            new Date(state.range[state.range.length - 186]).getTime(),
            new Date(state.range[state.range.length - 1]).getTime()
          )
          break
        case 'one_year':
          ApexCharts.exec(
            'area-datetime'+state.name,
            'zoomX',
            new Date(state.range[0]).getTime(),
            new Date('31 Dec 2020').getTime()
          )
          break
        case 'ytd':
          ApexCharts.exec(
            'area-datetime'+state.name,
            'zoomX',
            new Date('01 Jan 2021').getTime(),
            new Date(state.range[state.range.length - 1]).getTime()
          )
          break
        case 'one_week':
          ApexCharts.exec(
            'area-datetime'+state.name,
            'zoomX',
            new Date(state.range[state.range.length - 8]).getTime(),
            new Date(state.range[state.range.length - 1]).getTime()
          )
          break
        case 'all':
          ApexCharts.exec(
            'area-datetime'+state.name,
            'zoomX',
            new Date(state.range[0]).getTime(),
            new Date(state.range[state.range.length - 1]).getTime()
          )
          break
        default:
      }
    }
  

      return (
        

  <div id="chart">
    <div className="toolbar">
    <button id="one_month" style={state.style}
        
        onClick={()=>updateData('one_week')} className={ (state.selection==='one_month' ? 'active' : '')}>
    Last 1 Week
    </button>
    &nbsp;
    <button id="one_month" style={state.style}
        
        onClick={()=>updateData('one_month')} className={ (state.selection==='one_month' ? 'active' : '')}>
    Last 1 Month
    </button>
    &nbsp;
    <button id="six_months" style={state.style}
        
        onClick={()=>updateData('six_months')} className={ (state.selection==='six_months' ? 'active' : '')}>
    Last 6 Months
    </button>
    &nbsp;
    <button id="one_year" style={state.style}
        
        
        onClick={()=>updateData('one_year')} className={ (state.selection==='one_year' ? 'active' : '')}>
    2019
    </button>
    &nbsp;
    <button id="ytd" style={state.style}
        
        onClick={()=>updateData('ytd')} className={ (state.selection==='ytd' ? 'active' : '')}>
    2021
    </button>
    &nbsp;
    <button id="all" style={state.style}
        
        onClick={()=>updateData('all')} className={ (state.selection==='all' ? 'active' : '')}>
    ALL
    </button>
    </div>

    <div id="chart-timeline" style={{marginTop: "20px"}}>
      <ReactApexChart options={state.options} series={state.series} type="area" height={350} />
    </div>
</div>


      );
    }