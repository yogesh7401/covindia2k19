import axios from 'axios'
import { STATE_CODES_ARRAY , DATE_RANGE } from './constant'

export function GetData(url,method = 'get'){ 
  return new Promise((resolve, reject) => {
    axios.get("https://api.covid19india.org/v4/min/"+url+".min.json")
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
            let confirmed = typeCheck(districtObj.total.confirmed)
            let recovered = typeCheck(districtObj.total.recovered)
            let deceased = typeCheck(districtObj.total.deceased)
            let active = confirmed - ( deceased + recovered )
            let isCovidFree = false
            if(active === 0 && confirmed > 0) {
              isCovidFree = true
              covidFreeDistrict.push({key : e+"_"+i,stateName,e})
            }
            let tested = typeCheck(districtObj.total.tested)
            let vaccinated1 = typeCheck(districtObj.total.vaccinated1 )
            let vaccinated2= typeCheck(districtObj.total.vaccinated2) 
            districtData.push({stateName:e,confirmed,recovered,deceased,active,tested,vaccinated1,vaccinated2,key : e+"_"+i,isCovidFree})
          })
          data.push({stateName,districtData,key})
        }
      })
      resolve(data)
    })
    .catch((err) => 
    reject(err))
  })
}

export function GetAllData() {
  return new Promise((resolve, reject) => {
    let allData = GetData("data-all","get")
    let range = []
    allData
      .then((response) => {
        let data =[]
        let allDistrictData = []
        let perDayData = [] 
        STATE_CODES_ARRAY.map(state => {
          let stateName = state.name 
          let stateData = []
          let districtData = []
          DATE_RANGE.map((date) => {
            let stateDataTotal = ""
            let districtDataTotal = ""
            try {
              stateDataTotal = response[date][state.code].total
              districtDataTotal = response[date][state.code].districts
              range.push(date)
            }
            catch {
              
            }
            if(stateDataTotal !== "") {
              let confirmed = typeCheck(stateDataTotal.confirmed)
              let recovered = typeCheck(stateDataTotal.recovered)
              let deceased = typeCheck(stateDataTotal.deceased)
              let active = confirmed - ( recovered + deceased)
              let vaccinated1 = typeCheck(stateDataTotal.vaccinated1)
              let vaccinated2 = typeCheck(stateDataTotal.vaccinated2)
              stateData.push({date,confirmed,recovered,deceased,active,vaccinated1,vaccinated2,stateName})
            }
            allDistrictData.push({perDayData,districtData,stateName})
            data.push({stateName,stateData})
          })
        })
        resolve({data,range,allDistrictData})
      })
      .catch((error) => {
        reject(error)
      })
  })
}
// droped function 
// export function GetAllData() {
//   return new Promise((resolve, reject) => {
//     let allData = GetData("data-all","get")
//     let range = []
//     allData
//       .then((response) => {
//         let data =[]
//         let allDistrictData = []
//         let nameOfDistricts = []
//         let perDayData = [] 
//         STATE_CODES_ARRAY.map(state => {
//           let stateName = state.name 
//           let stateData = []
//           let districtData = []
//           DATE_RANGE.map((date) => {
//             let stateDataTotal = ""
//             let districtDataTotal = ""
//             try {
//               stateDataTotal = response[date][state.code].total
//               districtDataTotal = response[date][state.code].districts
//               range.push(date)
//             }
//             catch {
              
//             }
//             if(stateDataTotal !== "") {
//               let confirmed = typeCheck(stateDataTotal.confirmed)
//               let recovered = typeCheck(stateDataTotal.recovered)
//               let deceased = typeCheck(stateDataTotal.deceased)
//               let active = confirmed - ( recovered + deceased)
//               let vaccinated1 = typeCheck(stateDataTotal.vaccinated1)
//               let vaccinated2 = typeCheck(stateDataTotal.vaccinated2)
//               stateData.push({date,confirmed,recovered,deceased,active,vaccinated1,vaccinated2,stateName})
//             }
            
//             // nameOfDistricts = []
//             // if(districtDataTotal !== undefined) {
//             //   Object.keys(districtDataTotal).map((key, index) => {
//             //     let districtName = key
//             //     nameOfDistricts.push(key)
//             //     let confirmed = 0
//             //     let recovered = 0 
//             //     let deceased =  0
//             //     let active = 0
//             //     let vaccinated1 = 0
//             //     let vaccinated2 = 0
//             //     try {
//             //       confirmed = typeCheck(districtDataTotal[key].total.confirmed)
//             //       recovered = typeCheck(districtDataTotal[key].total.recovered)
//             //       deceased = typeCheck(districtDataTotal[key].total.deceased)
//             //       active = typeCheck(districtDataTotal[key].total.active)
//             //       vaccinated1 = typeCheck(districtDataTotal[key].total.vaccinated1)
//             //       vaccinated2 = typeCheck(districtDataTotal[key].total.vaccinated2)
//             //     }
//             //     catch {
//             //     }
//             //     perDayData.push({date,confirmed,recovered,deceased,active,vaccinated1,vaccinated2,districtName,stateName})
//             //   })
//             //   districtData.push({stateName,nameOfDistricts})
//             // }
//             allDistrictData.push({perDayData,districtData,stateName})
//             data.push({stateName,stateData})
            
//           })
//         })
//         resolve({data,range,allDistrictData})
//       })
//       .catch((error) => {
//         reject(error)
//       })
//   })
// }


