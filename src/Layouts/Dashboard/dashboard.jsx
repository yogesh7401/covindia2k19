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
import { useSpeechRecognition, useSpeechSynthesis } from "react-speech-kit";

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
  const { listen, listening, stop } = useSpeechRecognition({
    onResult: (result) => {
      setInputString(result);
    },
  });
  const { speak, cancel, speaking } = useSpeechSynthesis();
  function slotFilter(data, periodic, s) {
    setSlot(s);
    let result = Sorting(data, s);
    let periodicResult = periodicDataFilter(periodic, s, state);
    setPeriodicData(periodicResult);
    setData(result);
  }

  function stateSelection(name) {
    setState(name);
    cancel();
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
        setAllDistData(res);
      });
      setLoading(false);
    }
  }, [allData, distData, loading, slot, state, timeseriesData]);

  function QueryFilterByString(string) {
    let result = QueryFilter(string, mapData, allPeriodicData, slot, sortOrder);
    if (result.state !== "") {
      stateSelection(result.state);
    } else {
      setBarChartData(
        _.orderBy(barChartData, [result.slot], [result.sortOrder])
      );
    }
    setData(result.mapData);
    setSortOrder(result.sortOrder);
    if (slot !== result.slot) {
      setSlot(result.slot);
      slotFilter(result.mapData, result.periodicData, result.slot);
    }
  }
  function read() {
    if (speaking) {
      cancel();
    } else {
      let el = document.getElementById("barchart");
      speak({ text: el.innerText });
    }
  }
  return (
    <div className="">
      {!loading ? (
        <div>
          <div className="flex">
            <div>
              <input
                onChange={(e) => setInputString(e.target.value)}
                type="text"
                className="border px-2 py-1 focus:outline-none"
                value={inputString}
              />
            </div>
            <Button
              onClick={() => QueryFilterByString(inputString)}
              type="primary"
              className="mr-2"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                aria-hidden="true"
                role="img"
                className="iconify iconify--ic"
                width="18"
                height="18"
                preserveAspectRatio="xMidYMid meet"
                viewBox="0 0 24 24"
              >
                <path
                  fill="currentColor"
                  d="M15.5 14h-.79l-.28-.27A6.471 6.471 0 0 0 16 9.5A6.5 6.5 0 1 0 9.5 16c1.61 0 3.09-.59 4.23-1.57l.27.28v.79l5 4.99L20.49 19l-4.99-5zm-6 0C7.01 14 5 11.99 5 9.5S7.01 5 9.5 5S14 7.01 14 9.5S11.99 14 9.5 14z"
                ></path>
              </svg>
            </Button>
            <div className="flex">
              <Button
                className="px-2"
                type="primary"
                onMouseEnter={listen}
                onMouseLeave={stop}
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  aria-hidden="true"
                  role="img"
                  className="iconify iconify--material-symbols"
                  width="18"
                  height="18"
                  preserveAspectRatio="xMidYMid meet"
                  viewBox="0 0 24 24"
                >
                  <path
                    fill="currentColor"
                    d="M12 14q-1.25 0-2.125-.875T9 11V5q0-1.25.875-2.125T12 2q1.25 0 2.125.875T15 5v6q0 1.25-.875 2.125T12 14Zm0 7q-.425 0-.712-.288Q11 20.425 11 20v-2.1q-2.325-.3-3.95-1.925t-1.975-3.9q-.075-.425.225-.75T6.1 11q.35 0 .625.262q.275.263.35.638q.325 1.75 1.7 2.925Q10.15 16 12 16t3.225-1.175q1.375-1.175 1.7-2.925q.075-.375.363-.638q.287-.262.637-.262q.475 0 .775.325q.3.325.225.75q-.35 2.275-1.975 3.9T13 17.9V20q0 .425-.287.712Q12.425 21 12 21Z"
                  ></path>
                </svg>
              </Button>
              {listening ? (
                <div className="py-1 pl-2">Go ahead I'm listening</div>
              ) : (
                ""
              )}
            </div>
          </div>
          <div className="lg:grid grid-cols-2 mt-10 overflow-y-hidden">
            <div className="h-full">
              <div className="flex w-full mb-3">
                <p>
                  {sortOrder === "desc" ? "Descending" : "Ascending"} order of{" "}
                  {slot} cases in {state}
                </p>
                <Button
                  type="primary"
                  className="ml-auto"
                  color="#059669"
                  onClick={() => read()}
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    aria-hidden="true"
                    role="img"
                    className="iconify iconify--ph"
                    width="20"
                    height="20"
                    preserveAspectRatio="xMidYMid meet"
                    viewBox="0 0 256 256"
                  >
                    <path
                      fill="currentColor"
                      d="M160 32v192a8 8 0 0 1-4.5 7.2a8.5 8.5 0 0 1-3.5.8a7.9 7.9 0 0 1-4.9-1.7L77.2 176H32a16 16 0 0 1-16-16V96a16 16 0 0 1 16-16h45.2l69.9-54.3A8 8 0 0 1 160 32Zm32 64a8 8 0 0 0-8 8v48a8 8 0 0 0 16 0v-48a8 8 0 0 0-8-8Zm32-16a8 8 0 0 0-8 8v80a8 8 0 0 0 16 0V88a8 8 0 0 0-8-8Z"
                    ></path>
                  </svg>
                </Button>
                {sortOrder === "desc" ? (
                  <Button
                    type="primary"
                    className="ml-2"
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
                <div>
                  <div id="barchart" className="sr-only">
                    {sortOrder === "desc" ? "Descending" : "Ascending"} order of{" "}
                    {slot} cases in {state}.
                    {barChartData.slice(0, 10).map((e) => {
                      return (
                        <p key={e.stateName}>
                          {e.stateName} has {e[slot]} {slot} cases.
                        </p>
                      );
                    })}
                  </div>
                  <BarChart
                    slot={slot}
                    data={barChartData}
                    place={state}
                    order={sortOrder}
                  />
                </div>
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
