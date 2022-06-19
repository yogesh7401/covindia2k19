import { useEffect, useState } from "react";
import { useStore } from "react-redux";
import stringGenerator from "../../AssetActions/query";
import Map from "../../Components/Map";
import BarChart from "../../Components/BarChart";
import _, { sortBy } from "lodash";
import Moment from "moment";
import Chart from "../../Components/Chart";
import { DATE_RANGE } from "../../AssetActions/constant";
import { Button } from "antd";
import DashboardTable from "../../Components/DashboardTable";

export default function Dashboard() {
  stringGenerator("least confirm maxi death AP");
  const [periodicData, setPeriodicData] = useState("");
  const [state, setState] = useState("India");
  const [range, setRange] = useState("");
  const [mapData, setData] = useState("");
  const [slot, setSlot] = useState("active");
  const [sortOrder, setSortOrder] = useState("desc");
  const [allDistData, setAllDistData] = useState("");
  const [allTimseriesData, setTimeseriesData] = useState("");
  const [allPeriodicData, setAllPeriodicData] = useState("");
  const [loading, setLoading] = useState(true);
  const store = useStore().getState();
  const timeseriesData = store.timeseries;
  const allData = store.allData;
  const distData = store.districtData;
  function slotFilter(s) {
    console.log("slotFilter");
    setSlot(s);
    let result = Sorting(allTimseriesData, s);
    let periodicResult = periodicDataFilter(allPeriodicData, s, state);
    setPeriodicData(periodicResult);
    setData(result);
  }
  function stateSelection(name) {
    setState(name);
    let result = periodicDataFilter(allPeriodicData, slot, name);
    setPeriodicData(result);
  }
  function stateDataSort(e, s, t) {
    console.log("stateDataSort");
    setSortOrder(t);
    return _.orderBy(e, [s], [t]);
  }
  function sortByOrder(t) {
    console.log(t);
    setSortOrder(t);
    setData(_.orderBy(mapData, [slot], [t]));
  }
  function Sorting(e, s) {
    console.log("sortting");
    const desc = stateDataSort(e, s, sortOrder);
    const dataOtherThanIndia = desc.filter((a) => {
      return a.key !== "TT";
    });
    return dataOtherThanIndia;
  }
  function periodicDataFilter(res, s, stateName) {
    console.log("periodic");
    let filteredByName = [];
    filteredByName = _.filter(res, (e) => {
      console.log(e);
      return e.stateName === stateName;
    });
    let filteredData = [];
    _.map(filteredByName[0].stateTimeseriesData, (e) => {
      filteredData.push([
        Moment(e.date, "YYYY-MM-DD").valueOf(),
        e[s],
        e.stateName,
      ]);
    });
    return filteredData;
  }
  useEffect(() => {
    if (loading) {
      timeseriesData.then((e) => {
        setTimeseriesData(e);
        let result = Sorting(e, slot);
        setData(result);
      });
      allData.then((res) => {
        setAllPeriodicData(res);
        let result = periodicDataFilter(res, slot, state);
        setRange(DATE_RANGE);
        setPeriodicData(result);
      });
      distData.then((res) => {
        console.log(res);
        setAllDistData(res);
      });
      setLoading(false);
    }
  }, []);
  return (
    <div>
      <div className=""></div>
      <div className="lg:grid grid-cols-2 mt-10">
        <div className="h-full">
          <div className="flex w-full mb-3">
            {sortOrder === "desc" ? (
              <Button
                type="primary"
                className="ml-auto"
                color="#059669"
                onClick={() => sortByOrder("asc")}
              >
                By Minimum
              </Button>
            ) : (
              <Button
                type="primary"
                className="ml-auto"
                color="#059669"
                onClick={() => sortByOrder("desc")}
              >
                By Maximum
              </Button>
            )}
          </div>
          {mapData !== "" ? (
            <BarChart slot={slot} data={mapData} order={sortOrder} />
          ) : (
            ""
          )}
        </div>
        <div className="h-full">
          {mapData !== "" ? (
            <Map
              data={mapData}
              slot={slot}
              slotFilter={slotFilter}
              stateSelection={stateSelection}
            />
          ) : (
            ""
          )}
        </div>
        <div className="h-full col-span-2">
          <div className="overflow-y-hidden overflow-x-hidden w-full">
            {periodicData !== "" ? (
              <Chart
                data={periodicData}
                range={range}
                name={slot}
                place={state}
              />
            ) : (
              ""
            )}
          </div>
        </div>
        <div className="h-full col-span-2">
          <DashboardTable tableData={allTimseriesData} />
        </div>
      </div>
    </div>
  );
}
