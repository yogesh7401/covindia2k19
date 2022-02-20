import { connect} from "react-redux"
import { useEffect, useState } from 'react'
import Chart from "../../Components/Chart"
import Select from "../../Components/Select"
import _ from "lodash"
import Moment from 'moment'
import Fade from 'react-reveal/Fade'
import { useParams , Link } from 'react-router-dom'
import { GetStateData } from "../../AssetActions/getData"

function GraphLayout(props) {
    const params = useParams()
    const place = params.place
    const [ confirmedRange , setConfirmedRange ] = useState([])
    const [ recoveredRange , setRecoveredRange ] = useState([])
    const [ activeRange , setActiveRange ] = useState([])
    const [ deceasedRange , setDeceasedRange ] = useState([])
    const [ range , setRange ] = useState([])
    const [ loading , setLoading ] = useState(true)
    
    function SetSelection(response,state) {
        let confirmed = []
        let recovered = []
        let deceased = []
        let active = []
        let initialData = _.filter(response.data , e => { return (e.stateName === state) })
        _.map(initialData[0].stateData , e => { confirmed.push([Moment(e.date,'YYYY-MM-DD').valueOf(),e.confirmed]) })
        _.map(initialData[0].stateData , e => { recovered.push([Moment(e.date,'YYYY-MM-DD').valueOf(),e.recovered]) })
        _.map(initialData[0].stateData , e => { deceased.push([Moment(e.date,'YYYY-MM-DD').valueOf(),e.deceased]) })
        _.map(initialData[0].stateData , e => { active.push([Moment(e.date,'YYYY-MM-DD').valueOf(),e.active]) })
        setRange(response.range)
        setConfirmedRange(confirmed)
        setRecoveredRange(recovered)
        setActiveRange(active)
        setDeceasedRange(deceased)
        setLoading(false)
    }
    useEffect(() => {
        console.log('useEffect')
        GetStateData()
            .then((response) => {
                SetSelection(response,place)
            })
            .catch((error) => {
                console.log(error);
            })
    },[place]) 
    return (
        <>
        <Link to="/graph/India" className="text-primary class text-xl font-bold text-center p-2 px-4 bg-light rounded-lg m-3 ml-0">{'India'}</Link>
        { place !== 'India' ? <Link to={"/graph/"+place} className="text-primary text-xl font-bold text-center p-2 px-4 bg-light rounded-lg m-3 ml-0"> {place}</Link> : '' }
        <Select />
        <div>
            {
                !loading ? 
                <div className="grid xl:grid-cols-2 3xl:grid-cols-1 gap-y-4 gap-2">
                    <Fade left>
                        <div className="overflow-y-hidden overflow-x-hidden w-full">
                            <Chart data={confirmedRange} range={range} name="Confirmed" color="#DC2626" bgcolor="#ee6c4d" place={place}/>
                        </div>
                    </Fade>
                    <Fade right>
                        <div className="overflow-y-hidden overflow-x-hidden w-full">
                            <Chart data={recoveredRange} range={range} name="Recovered" color="#059669" bgcolor="#34D399" place={place} />
                        </div>
                    </Fade>
                    <Fade left>
                        <div className="overflow-y-hidden overflow-x-hidden w-full">
                            <Chart data={activeRange} range={range} name="Active" color="#2563EB" bgcolor="#93C5FD" place={place} />
                        </div>
                    </Fade>
                    <Fade right>
                        <div className="overflow-y-hidden overflow-x-hidden w-full">
                            <Chart data={deceasedRange} range={range} name="Deceased" color="#4B5563" bgcolor="#6B7280" place={place} />
                        </div>
                    </Fade>
                </div> : ''
            }
            
        </div>
        </>
    )
}

const mapStateToProps = (state) => {
  return {
      data : state.allData,
//       districtData : state.districtData
  }
}


export default connect(mapStateToProps,null)(GraphLayout)
