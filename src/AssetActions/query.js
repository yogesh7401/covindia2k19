import _ from "lodash"
import { arrayCode, stateCodesKey } from "./constant"

const keys = ["max","min","from","to","confirm","death","active","recover",...arrayCode]
const keysObject = { 
    max : "max high top adjective great big large most supreme paramount extreme",
    min : "min low bottom base least slight depth nadir",
    from : "from",
    to : "to",
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
    let keyInString = []
    string = string.toLowerCase()
    keys.map(key => {
        keysObject[key].split(" ").map(val => {
            if(string.includes(val.toLowerCase())) {
                keyInString.push(key)
            }
        })
    })
    return keyInString
}
export default function stringGenerator(string) {
    // console.log(classifier(string))
    let keys = classifier(string)
    if(keys.includes("max")) {
        // console.log(_.sortBy(data).reverse())
    }
    else if(keys.includes("min")) {
        // console.log(_.sortBy(data));
    }
    let code = keys.filter(key => {return arrayCode.includes(key)})
    if(code.length !== 0){
        // console.log(code[0]);
        // fillter by code 
    }
}