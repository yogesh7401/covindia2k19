import { createStore } from "redux";
import Action from "./action";
import {initialstate} from "./store"
import { GetTimeSeriesByDate , GetStateData, GetAllData } from "../AssetActions/getData"

const actionCase = Action();

const reducer = (state = initialstate, action) => {

    switch (action.type) {

      case actionCase.SET_TIMESERIES_DATA:
        return {
          ...state,
          timeseries: action.payload
        };

      case actionCase.SET_DISTRICT_DATA:
        return {
          ...state,
          districtData: action.payload
        };
        
      case actionCase.SET_ALL_DATA:
        return {
          ...state,
          allData: action.payload
        };

      case actionCase.GET_DATA:
        return {
          ...state,
        }    
           
      default:
        return {
          ...state,
        };
    }
  };

const store = createStore(reducer)


store.dispatch({ type : 'SET_TIMESERIES_DATA' , payload : GetTimeSeriesByDate().then(e => {return e}) })

store.dispatch({ type : 'SET_DISTRICT_DATA' , payload : GetStateData().then(e => {return e}) })

store.dispatch({ type : 'SET_ALL_DATA' , payload : GetAllData().then(e => {return e}) })

store.dispatch({ type : 'GET_DATA' })

export default store;
