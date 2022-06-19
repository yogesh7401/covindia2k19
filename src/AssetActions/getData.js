import axios from 'axios'
import { STATE_CODES_ARRAY , DATE_RANGE } from './constant'

export function GetData(url,method = 'get'){ 
  return new Promise((resolve, reject) => {
    axios.get("https://data.covid19india.org/v4/min/"+url+".min.json")
      .then(function ({data}) {
        resolve(data);
      })
      .catch(function (error) {
        reject(error);
      });
    });
}
function typeCheck(data) {
  return (data === undefined) ? 0 : data
}
export function GetTimeSeriesByDate() {
  return new Promise((resolve, reject) => {
    let data = []
    let get =  GetData('timeseries','get')
    const dateLength = DATE_RANGE.length
    get.then((response) => {
      STATE_CODES_ARRAY.map(state => {
        let obj
        let date
        try {
            obj = response[state.code].dates[DATE_RANGE[dateLength-1]].total
            date = [DATE_RANGE[dateLength-1]]
        } catch (error) {
            obj = response[state.code].dates[DATE_RANGE[dateLength-2]].total
            date = [DATE_RANGE[dateLength-2]]
        }
        let key = state.code
        let stateName = state.name
        let confirmed = obj.confirmed
        let deceased = obj.deceased
        let recovered = obj.recovered
        let active = confirmed - ( deceased + recovered )
        let tested = obj.tested
        let vaccinated1 = obj.vaccinated1 
        let vaccinated2= obj.vaccinated2 
        data.push({key,stateName,confirmed,recovered,deceased,active,tested,vaccinated1,vaccinated2,date})
        return resolve(data)
      })
    })
    .catch((err) => 
    reject(err))
  })}

export function GetStateData() {
  return new Promise((resolve, reject) => {
    let districtData = []
    let data = []
    let get =  GetData('data','get')
    
    get.then((response) => {
      STATE_CODES_ARRAY.map(state => {
        districtData = []
        let covidFreeDistrict = []
        if(state.code !== "TT") {
          let obj = response[state.code].districts
          let stateName = state.name
          let key = state.code
          Object.keys(obj).map((e,i) => {
            let districtObj = obj[e] 
            let confirmed = typeCheck(districtObj.total?.confirmed)
            let recovered = typeCheck(districtObj.total?.recovered)
            let deceased = typeCheck(districtObj.total?.deceased)
            let active = confirmed - ( deceased + recovered )
            let isCovidFree = false
            if(active === 0 && confirmed > 0) {
              isCovidFree = true
              covidFreeDistrict.push({key : e+"_"+i,stateName,e})
            }
            let tested = typeCheck(districtObj.total?.tested)
            let vaccinated1 = typeCheck(districtObj.total?.vaccinated1 )
            let vaccinated2= typeCheck(districtObj.total?.vaccinated2) 
            return districtData.push({stateName:e,confirmed,recovered,deceased,active,tested,vaccinated1,vaccinated2,key : e+"_"+i,isCovidFree})
          })
          data.push({stateName,districtData,key})
        }
        return data
      })
      resolve(data)
    })
    .catch((err) => 
    reject(err))
  })
}

export function GetAllData() {
  return new Promise((resolve, reject) => {
    let allData = GetData("timeseries","get")
    allData
    .then(res => {
      let allStateData = []
      STATE_CODES_ARRAY.map(state => {
        let stateTimeseriesData = []
        let stateData = res[state.code]
        DATE_RANGE.map(date => {
          let confirmed = typeCheck(stateData.dates[date]?.total.confirmed)
          let recovered = typeCheck(stateData.dates[date]?.total.recovered)
          let deceased = typeCheck(stateData.dates[date]?.total.deceased)
          let active = typeCheck(confirmed) - ( typeCheck(recovered) + typeCheck(deceased))
          let vaccinated1 = typeCheck(stateData.dates[date]?.total.vaccinated1)
          let vaccinated2 = typeCheck(stateData.dates[date]?.total.vaccinated2)
          return stateTimeseriesData.push({ key : state.code , stateName: state.name,date: date,confirmed,recovered,deceased,active,vaccinated1,vaccinated2 })
        })
        return allStateData.push({ stateName : state.name , stateCode : state.code , stateTimeseriesData })
      })
      resolve(allStateData)
    })
    .catch(e => reject(e))
  })
}

