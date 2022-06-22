import _ from "lodash"
import { arrayCode, stateCodesKey, STATE_ABBR } from "./constant"

const keys = ["max","min","confirm","death","active","recover",...arrayCode]
const keysObject = { 
    max : "max high top adjective great big large most supreme paramount extreme",
    min : "min low bottom base least slight depth nadir",
    confirm : "confirm positive",
    death: "death decease die pass loss",
    active: "active still",
    recover: "recover",
    ...stateCodesKey
}
const data = [412,124,432,138,284,573,836,973,102,361]
function consist(string, key) {
    return true
}
function classifier(string) {
    console.log("tokenized : "+string.split(" "));
    let keyInString = []
    string = string.toLowerCase()
    keys.map(key => {
        return keysObject[key].split(" ").map(val => {
            if(string.includes(val.toLowerCase())) {
                keyInString.push(key)
            }
        })
    })
    return keyInString
}
export default function QueryFilter(string,timeseriesData,periodicData,slot,sortOrder) {
    let keys = classifier(string)
    console.log("classified : "+keys);
    let stateCode = ""
    let stateName = ""
    if(keys.includes("confirm")) {
        slot = "confirmed"
    }else if(keys.includes("recover")) {
        slot = "recovered"
    }else if(keys.includes("active")) {
        slot = "active"
    }else if(keys.includes("death")) {
        slot = "deceased"
    }
    if(keys.includes("max")) {
        sortOrder = "desc"
        timeseriesData = _.orderBy(timeseriesData,slot,"desc")
    }
    else if(keys.includes("min")) {
        sortOrder = "asc"
        timeseriesData = _.orderBy(timeseriesData,slot,"desc")
    }
    keys.map(key => {
        if(arrayCode.includes(key)) {
            if(key !== " "){
                stateCode = key
            }
        }
    })
    if(stateCode !== "" ) {
        stateName = STATE_ABBR[stateCode]
        console.log(STATE_ABBR[stateCode],stateCode);
    }
    // let code = keys.filter(key => {return arrayCode.includes(key)})
    // if(code.length !== 0){
    // }
    return {
        mapData: timeseriesData,
        periodicData: periodicData,
        sortOrder: sortOrder,
        slot: slot,
        state: stateName
    }

}