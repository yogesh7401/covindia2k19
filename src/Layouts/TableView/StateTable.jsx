import { useState , useEffect , useRef } from 'react'
import { COLUMNS } from "../../AssetActions/constant"
import Cards from '../../Components/Cards'
import Fade from 'react-reveal/Fade'
import { Table } from 'antd'
import 'antd/dist/antd.css'
import { connect } from 'react-redux'
import _ from 'lodash'

const scrollToRef = (ref) => window.scrollTo(0, ref.current.offsetTop )

function StateTable(props) {
    const myRef = useRef(null)
    let getData = props.data
    const [ loading , setLoading ] = useState(true)
    const [ selected , setSelected ] = useState('')
    const [ data , setData ] = useState('')
    let InitialData = []
    useEffect(() => {
        getData
        .then(timeseriesData => {
            InitialData = _.filter(timeseriesData , e => { return e.key === 'TT'})
            let stateData = _.filter(timeseriesData , e => { return e.key !== 'TT'})
            setData(stateData)
            setSelected(InitialData[0])
            setLoading(false)
        })
    },[])
    const rowSelection = {
        onChange: (selectedRowKeys, selectedRows) => {
            InitialData = []
            setSelected(selectedRows[0])
            if (window.innerWidth < 768) {
                try {
                scrollToRef(myRef)
                } catch (error) {
                    console.log(error);
                }
            }
        },
    }
    return(
        <>
        {
            !loading ? 
            <div className="min-h-screen md:flex flex-row grid-cols-5 gap-2">
                <Fade left>   
                    <div className="col-span-4 overflow-x-auto">
                        <Table 
                            rowSelection={{
                                type: 'radio',
                                ...rowSelection,
                                }} 
                            rowClassName={(record, index) => index % 2 === 0 ? 'bg-white font-bold' :  ' bg-light font-bold'} 
                            dataSource={data} 
                            columns={COLUMNS} bordered 
                            pagination={false}/>  
                    </div>
                </Fade>
                <Cards selected={selected} flex={true} grid={false} myRef={myRef}/>
            </div> : '' }
        </>
    )
}

const mapStateToProps = (state) => {
    return {
        data : state.timeseries
    }
}


export default connect(mapStateToProps,null)(StateTable)