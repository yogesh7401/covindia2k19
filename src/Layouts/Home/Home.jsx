import { connect } from 'react-redux'
import { useEffect, useState } from 'react'
import _ from "lodash"
import PieChart from '../../Components/PieChart'
import India from '../../Assets/Image/india.svg'
import Table from '../../Assets/Image/table.svg'
import Graph from '../../Assets/Image/graph.svg'
import { Link } from 'react-router-dom'
import { GetAllData } from '../../AssetActions/getData'

function Home(props) {
    let getData = props.data
    const [ data , setData ] = useState('')
    const [ loading , setLoading ] = useState(true)
    const [ cases , setCases ] = useState({})
    useEffect(() => {
        GetAllData()
        getData
        .then(timeseriesData => {
            let InitialData = _.filter(timeseriesData , e => { return e.key === 'TT'})
            let IndiaPopulation = 1394716546
            let vaccinated1     = InitialData[0].vaccinated1
            let vaccinated2     = InitialData[0].vaccinated2
            let atleastOneDose = vaccinated1 - vaccinated2
            let nonVaccinated   = IndiaPopulation - vaccinated1
            let value = {
                confirmed  : InitialData[0].confirmed,
                active     : InitialData[0].active,
                recovered  : InitialData[0].recovered,
                deceased : InitialData[0].deceased
            }
            let result = [nonVaccinated,atleastOneDose,vaccinated2]
            setData(result)
            setCases(value)
            setLoading(false)
        })
    },[])
    return(
        <div className="flex overflow-hidden" style={{minHeight:"650px"}}>
            <div className="mx-auto">
                <div className="md:grid grid-cols-2 place-items-end p-5 bg-light rounded-lg shadow-lg">
                    <div className=" m-auto">
                        <p className="text-primary text-3xl font-bold">COVINDIA19</p>
                        <p className="text-xl text-secondary">
                            A complete analysis of covid-19 spreads in India
                        </p>
                    </div>
                    <div className="ml-auto w-full order-last">
                        {
                            !loading ? <PieChart data={data}/> : ''
                        }
                    </div>
                </div>
                <div className="grid grid-cols-2 lg:grid-cols-4 gap-2 mx-auto w-full mt-5">
                    <div className="bg-tomato w-full bg-opacity-40 text-red-600 rounded-lg p-5">
                        <p className=" uppercase text-xl mt-3 font-bold">Confirmed</p>
                        <p className=" uppercase text-lg mt-3 font-bold flex  flex-row ">
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 mr-1 mt-1 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 5l7 7-7 7M5 5l7 7-7 7" />
                            </svg>
                            { !loading ? <span>{cases.confirmed.toLocaleString()}</span> : 'Loading...' }
                        </p>
                    </div>
                    <div className="w-full bg-opacity-40 bg-blue-300 text-blue-600 rounded-lg p-5">
                        <p className=" uppercase text-xl mt-3 font-bold">Active</p>
                        <p className=" uppercase text-lg mt-3 font-bold flex  flex-row ">
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 mr-1 mt-1 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 5l7 7-7 7M5 5l7 7-7 7" />
                            </svg>
                            { !loading ? <span>{cases.active.toLocaleString()}</span> : 'Loading...' }
                        </p>
                    </div>
                    <div className="w-full bg-opacity-40 bg-green-400 text-green-600 rounded-lg p-5">
                        <p className=" uppercase text-xl mt-3 font-bold">Recovered</p>
                        <p className=" uppercase text-lg mt-3 font-bold flex  flex-row ">
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 mr-1 mt-1 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 5l7 7-7 7M5 5l7 7-7 7" />
                            </svg>
                            { !loading ? <span>{cases.recovered.toLocaleString()}</span> : 'Loading...' } 
                        </p>
                    </div>
                    <div className="w-full bg-opacity-40 bg-gray-500 text-gray-600 rounded-lg p-5">
                        <p className=" uppercase text-xl mt-3 font-bold">Deceased</p>
                        <p className=" uppercase text-lg mt-3 font-bold flex  flex-row ">
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 mr-1 mt-1 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 5l7 7-7 7M5 5l7 7-7 7" />
                            </svg>
                            { !loading ? <span>{cases.deceased.toLocaleString()}</span> : 'Loading...' } 
                        </p>
                    </div>
                </div> 
                <div className="grid md:grid-cols-3 gap-2 my-5">
                    <Link to="/state-table" className="p-5 pb-0 bg-light cursor-pointer rounded-lg">
                        <img className="mx-auto h-28" src={Table} alt="table" />
                        <p className="text-center text-primary text-xl mt-5 font-bold uppercase">
                            Table View
                        </p>
                    </Link>
                    <Link to="/state-map" className="p-5 pb-0 bg-light cursor-pointer rounded-lg">
                        <img width="100" className="mx-auto" src={India} alt="table" />
                        <p className="text-center text-primary text-xl mt-5 font-bold uppercase">
                            Map View
                        </p>
                    </Link>
                    <Link to="/graph/India" className="p-5 pb-0 bg-light cursor-pointer rounded-lg">
                        <img width="100" className="mx-auto h-28" src={Graph} alt="table" />
                        <p className="text-center text-primary text-xl mt-5 font-bold uppercase">
                            Graph View
                        </p>
                    </Link>
                </div>
            </div>
            
        </div>
        
    )
}

const mapStateToProps = (state) => {
    return {
        data : state.timeseries
    }
}


export default connect(mapStateToProps,null)(Home)