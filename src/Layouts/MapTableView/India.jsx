import React, { useEffect, useState, useRef } from 'react'
import { ComposableMap, Geographies, Geography } from 'react-simple-maps'
import { scaleQuantile } from 'd3-scale'
import ReactTooltip from 'react-tooltip'
import { connect} from "react-redux"
import _ from "lodash"
import Fade  from 'react-reveal/Fade'
import Cards from '../../Components/Cards'
import { Table } from 'antd'
import 'antd/dist/antd.css'
import { Tooltip } from 'antd'
import { COLUMNS , CONFIRMED_COLOR_RANGE , ACTIVE_COLOR_RANGE , RECOVERED_COLOR_RANGE , DEATH_COLOR_RANGE , DEFAULT_COLOR } from "../../AssetActions/constant"

const INDIA_TOPO_JSON = require('../../Components/india.topo.json')

const PROJECTION_CONFIG = {
  scale: 900,
  center: [84.9629, 20.5937] 
}

const geographyStyle = {
  default: {
    outline: 'none'
  },
  hover: {
    outline: 'none'
  },
  pressed: {
    outline: 'none'
  }
}

const scrollToRef = (ref) => window.scrollTo(0, ref.current.offsetTop )

function India(props) {
  const [ tooltipContent , setTooltipContent ] = useState('')
  const [ color , setColor ] = useState('confirmed')
  const [ data , setData ] = useState()
  const [ mapData , setMapData ] = useState([])
  const [ districtData , setdistrictData ] = useState([])
  const [ tableData , setTableData ] = useState([])
  const [ loading , setLoading ] = useState(true)
  const [ selected , setSelected ] = useState({})
  const [ districtSelected , setDistrictSelected ] = useState({})
  const [ isDistrictSelected , setIsDistrictSelected ] = useState(false)
  
  const myRef = useRef(null)
  let getData = props.data
  let getDistrictData = props.districtData
  
  useEffect(() => {
    getDistrictData
    .then(distData => {
      setdistrictData(distData)
    })
    getData
    .then(timeseriesData => {
        let InitialData = timeseriesData.map(e => {
          return {
            id : e.key,
            state : e.stateName,
            value : e.confirmed
          }
        })
        let stateData = _.filter(InitialData , e => { return e.key !== 'TT'})
        let stateTableData = _.filter(timeseriesData , e => { return e.key !== 'TT'})
        let countryData = _.filter(timeseriesData , e => { return e.key === 'TT'})
        setMapData(stateData)
        setTableData(stateTableData)
        setData(stateTableData)
        setSelected(countryData[0])
        setLoading(false)
    })
  },[getData])
  function setSelectedState(id) {
    let selectedState =  _.filter(data , e => { return e.key === id})
    setSelected(selectedState[0])
    let dist = _.filter(districtData, e => { return e.key === id})
    setTableData(dist[0].districtData)
    setDistrictSelected(dist[0].districtData[0])
    setIsDistrictSelected(true)
  }

  const colorScale = scaleQuantile()
    .domain(mapData.map(d => d.value))
    .range(color === 'confirmed' ? CONFIRMED_COLOR_RANGE : 
           color === 'active' ? ACTIVE_COLOR_RANGE :
           color === 'recovered' ? RECOVERED_COLOR_RANGE :
           color === 'deceased' ? DEATH_COLOR_RANGE : '')

  const onMouseEnter = (geo, current = { value: 'NA' }) => {
    return () => {
      setTooltipContent(`${geo.properties.name}: ${current.value}`);
    }
  }

  const onMouseLeave = () => {
    setTooltipContent('')
  }
  
  const rowSelection = {
    onChange: (selectedRowKeys, selectedRows) => 
    {
      setDistrictSelected(selectedRows[0])
      setIsDistrictSelected(true)
      if (window.innerWidth < 768) {
        try {
          scrollToRef(myRef)
        } 
        catch (error) 
        {
          console.log(error);
        }
      }
    }
  }

  function changeColor(color) {
    let changedData = data.map(e => {
      return {
        id : e.key,
        state : e.stateName,
        value : e[color]
      }
    })
    let stateData = _.filter(changedData , e => { return e.key !== 'TT'})
    setMapData(stateData)
    setColor(color)
  }

  return (
    <>
    <div className="md:grid grid-cols-2">
      <Fade left>
      <div>
        <Tooltip title={color}>
          <h1 className={"text-2xl cursor-pointer uppercase font-bold  p-1 text-center bg-opacity-40  w-28 rounded-lg ".concat 
                            (color === 'confirmed' ? 'bg-tomato text-red-600' : 
                            color === 'active' ? 'bg-blue-300 text-blue-600' :
                            color === 'recovered' ? 'bg-green-400 text-green-600' :
                            color === 'deceased' ? 'bg-gray-500 text-gray-600' : '')}>India</h1>
        </Tooltip>
      {
        !loading ? 
        <>
        <ReactTooltip>{tooltipContent}</ReactTooltip>
          <ComposableMap
            projectionConfig={PROJECTION_CONFIG}
            projection="geoMercator"
            width={800}
            height={600}
            data-tip=""
            style={{pointerEvents:'none',margin:'auto'}}
          >
            <Geographies geography={INDIA_TOPO_JSON} style={{pointerEvents:'auto'}}>
              {({ geographies }) =>
                geographies.map(geo => {
                  const current = mapData.find(s => s.id === geo.id);
                  return (
                    <Geography
                      key={geo.rsmKey}
                      geography={geo}
                      fill={current ? colorScale(current.value) : DEFAULT_COLOR}
                      style={geographyStyle}
                      onClick={() => setSelectedState(current.id)}
                      onMouseEnter={onMouseEnter(geo, current)}
                      onMouseLeave={onMouseLeave}
                    />
                  );
                })
              }
            </Geographies>
        </ComposableMap>
        <div className=" flex flex-wrap rounded-md mx-2 -mt-5">
          <div onClick={() => changeColor('confirmed')} className="text-lg cursor-pointer font-bold p-1 text-center bg-opacity-40 w-1/2 rounded-tl-md sm:w-1/4 sm:rounded-l-md bg-tomato text-red-600">Confirmed</div>
          <div onClick={() => changeColor('active')} className="text-lg cursor-pointer font-bold p-1 text-center bg-opacity-40 w-1/2 rounded-tr-md sm:w-1/4 sm:rounded-none bg-blue-300 text-blue-600">Active</div>
          <div onClick={() => changeColor('recovered')} className="text-lg cursor-pointer font-bold p-1 text-center bg-opacity-40 w-1/2 rounded-bl-md sm:w-1/4 sm:rounded-none bg-green-400 text-green-600">Recovered</div>
          <div onClick={() => changeColor('deceased')} className="text-lg cursor-pointer font-bold p-1 text-center bg-opacity-40 w-1/2 rounded-br-md sm:w-1/4 sm:rounded-r-md bg-gray-500 text-gray-600">Deaceased</div>
        </div>
        </> : ''
      }
      </div> 
      </Fade>
        <div className="block my-auto xl:mt-auto">
          {
            !loading ? <Cards  selected={selected} flex={false} grid={true}/>: '' 
          }
        </div>
    </div>
    {
      !loading ? 
      <div className="min-h-screen md:flex flex-row grid-cols-5 gap-2 mt-10">
          <Fade left>   
              <div className="col-span-4 ">
                <p className="text-primary font-bold text-xl uppercase "> {selected.stateName}</p>
                  <div className="overflow-x-auto">
                    <Table 
                        rowSelection={{
                            type: 'radio',
                            ...rowSelection,
                            }} 
                        rowClassName={(record, index) => index % 2 === 0 ? 'bg-white font-bold' :  ' bg-light font-bold'} 
                        dataSource={ tableData } 
                        columns={COLUMNS} 
                        bordered 
                        pagination={false}/>
                  </div>
                    
              </div>
          </Fade>
          <div className="mx-auto">
            <Cards selected={isDistrictSelected ? districtSelected : selected} flex={true} grid={false} myRef={myRef}/>
          </div>
      </div> : '' }
    </>
  );
}


const mapStateToProps = (state) => {
  return {
      data : state.timeseries,
      districtData : state.districtData
  }
}


export default connect(mapStateToProps,null)(India)