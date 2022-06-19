import { connect } from "react-redux";
import { useEffect, useState } from "react";
import Chart from "../../Components/Chart";
import Select from "../../Components/Select";
import _ from "lodash";
import Moment from "moment";
import Fade from "react-reveal/Fade";
import { useParams, Link } from "react-router-dom";
import { DATE_RANGE } from "../../AssetActions/constant";

function GraphLayout(props) {
  const params = useParams();
  const place = params.place;
  const [confirmedRange, setConfirmedRange] = useState([]);
  const [recoveredRange, setRecoveredRange] = useState([]);
  const [activeRange, setActiveRange] = useState([]);
  const [deceasedRange, setDeceasedRange] = useState([]);
  const [range, setRange] = useState([]);
  const [loading, setLoading] = useState(true);

  function SetSelection(response, state) {
    let confirmed = [];
    let recovered = [];
    let deceased = [];
    let active = [];
    let initialData = _.filter(response, (e) => {
      return e.stateName === state;
    });
    _.map(initialData[0].stateTimeseriesData, (e) => {
      confirmed.push([Moment(e.date, "YYYY-MM-DD").valueOf(), e.confirmed]);
    });
    _.map(initialData[0].stateTimeseriesData, (e) => {
      recovered.push([Moment(e.date, "YYYY-MM-DD").valueOf(), e.recovered]);
    });
    _.map(initialData[0].stateTimeseriesData, (e) => {
      deceased.push([Moment(e.date, "YYYY-MM-DD").valueOf(), e.deceased]);
    });
    _.map(initialData[0].stateTimeseriesData, (e) => {
      active.push([Moment(e.date, "YYYY-MM-DD").valueOf(), e.active]);
    });
    setRange(DATE_RANGE);
    setConfirmedRange(confirmed);
    setRecoveredRange(recovered);
    setActiveRange(active);
    setDeceasedRange(deceased);
    setLoading(false);
  }
  let getData = props.data;
  useEffect(() => {
    getData
      .then((response) => {
        SetSelection(response, place);
      })
      .catch((error) => {
        console.log(error);
      });
  }, [place, getData]);
  return (
    <>
      <Link
        to="/graph/India"
        className="text-primary class text-xl font-bold text-center p-2 px-4 bg-light rounded-lg m-3 ml-0"
      >
        {"India"}
      </Link>
      {place !== "India" ? (
        <Link
          to={"/graph/" + place}
          className="text-primary text-xl font-bold text-center p-2 px-4 bg-light rounded-lg m-3 ml-0"
        >
          {" "}
          {place}
        </Link>
      ) : (
        ""
      )}
      <Select />
      <div>
        {!loading ? (
          <div className="grid xl:grid-cols-2 3xl:grid-cols-1 gap-y-4 gap-2">
            <Fade left>
              <div className="overflow-y-hidden overflow-x-hidden w-full">
                <Chart
                  data={confirmedRange}
                  range={range}
                  name="confirmed"
                  color="#DC2626"
                  bgcolor="#ee6c4d"
                  place={place}
                />
              </div>
            </Fade>
            <Fade right>
              <div className="overflow-y-hidden overflow-x-hidden w-full">
                <Chart
                  data={recoveredRange}
                  range={range}
                  name="recovered"
                  color="#059669"
                  bgcolor="#34D399"
                  place={place}
                />
              </div>
            </Fade>
            <Fade left>
              <div className="overflow-y-hidden overflow-x-hidden w-full">
                <Chart
                  data={activeRange}
                  range={range}
                  name="active"
                  color="#2563EB"
                  bgcolor="#93C5FD"
                  place={place}
                />
              </div>
            </Fade>
            <Fade right>
              <div className="overflow-y-hidden overflow-x-hidden w-full">
                <Chart
                  data={deceasedRange}
                  range={range}
                  name="deceased"
                  color="#4B5563"
                  bgcolor="#6B7280"
                  place={place}
                />
              </div>
            </Fade>
          </div>
        ) : (
          ""
        )}
      </div>
    </>
  );
}

const mapStateToProps = (state) => {
  return {
    data: state.allData,
  };
};

export default connect(mapStateToProps, null)(GraphLayout);
