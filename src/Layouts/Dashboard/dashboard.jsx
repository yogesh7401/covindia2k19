import { useEffect, useState } from "react";
import { useStore } from "react-redux";
import QueryFilter from "../../AssetActions/query";
import Map from "../../Components/Map";
import BarChart from "../../Components/BarChart";
import _, { orderBy } from "lodash";
import Moment from "moment";
import Chart from "../../Components/Chart";
import { DATE_RANGE } from "../../AssetActions/constant";
import { Button } from "antd";
import DashboardTable from "../../Components/DashboardTable";

export default function Dashboard() {
  const [periodicData, setPeriodicData] = useState("");
  const [state, setState] = useState("India");
  const [range, setRange] = useState("");
  const [mapData, setData] = useState("");
  const [slot, setSlot] = useState("confirmed");
  const [barChartData, setBarChartData] = useState("");
  const [sortOrder, setSortOrder] = useState("desc");
  const [allDistData, setAllDistData] = useState("");
  const [allTimseriesData, setTimeseriesData] = useState("");
  const [inputString, setInputString] = useState("");
  const [allPeriodicData, setAllPeriodicData] = useState("");
  const [loading, setLoading] = useState(true);
  const [tableData, setTableData] = useState("");
  const store = useStore().getState();
  const timeseriesData = store.timeseries;
  const allData = store.allData;
  const distData = store.districtData;

  function slotFilter(data, periodic, s) {
    setSlot(s);
    let result = Sorting(data, s);
    let periodicResult = periodicDataFilter(periodic, s, state);
    setPeriodicData(periodicResult);
    setData(result);
  }

  function stateSelection(name) {
    setState(name);
    console.log(allDistData);
    let distDataOfState = allDistData.filter((d) => {
      return d.stateName === name;
    });
    setTableData(distDataOfState[0].districtData);
    setBarChartData(
      _.orderBy(distDataOfState[0].districtData, [slot], [sortOrder])
    );
    let result = periodicDataFilter(allPeriodicData, slot, name);
    setPeriodicData(result);
  }

  function stateDataSort(e, s, t) {
    setSortOrder(t);
    return _.orderBy(e, [s], [t]);
  }

  function sortByOrder(t) {
    setSortOrder(t);
    setBarChartData(_.orderBy(barChartData, [slot], [t]));
  }

  function Sorting(e, s) {
    const desc = stateDataSort(e, s, sortOrder);
    const dataOtherThanIndia = desc.filter((a) => {
      return a.key !== "TT";
    });
    return dataOtherThanIndia;
  }

  function periodicDataFilter(res, s, stateName) {
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
        setTableData(e);
        let result = Sorting(e, slot);
        setData(result);
        setBarChartData(result);
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

  function QueryFilterByString(string) {
    let result = QueryFilter(string, mapData, allPeriodicData, slot, sortOrder);
    setBarChartData(_.orderBy(barChartData, [result.slot], [result.sortOrder]));
    setData(result.mapData);
    setSortOrder(result.sortOrder);
    if (slot !== result.slot) {
      setSlot(result.slot);
      slotFilter(result.mapData, result.periodicData, result.slot);
    }
  }
  return (
    <div className="">
      {!loading ? (
        <div>
          <div className="flex">
            <input
              onChange={(e) => setInputString(e.target.value)}
              type="text"
              className="border"
            />
            <input
              type="Button"
              onClick={() => QueryFilterByString(inputString)}
              className="border w-10"
            />
          </div>
          <div className="lg:grid grid-cols-2 mt-10 overflow-y-hidden">
            <div className="h-full">
              <div className="flex w-full mb-3">
                <p>
                  {sortOrder === "desc" ? "Descending" : "Ascending"} order of{" "}
                  {slot} cases in {state}
                </p>
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
              {barChartData !== "" ? (
                <BarChart
                  slot={slot}
                  data={barChartData}
                  place={state}
                  order={sortOrder}
                />
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
            <div className="h-full col-span-2 mt-10 overflow-y-hidden">
              <DashboardTable tableData={tableData} />
            </div>
          </div>
        </div>
      ) : (
        ""
      )}
    </div>
  );
}
