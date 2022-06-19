import { ComposableMap, Geographies, Geography } from "react-simple-maps";
import ReactTooltip from "react-tooltip";
import INDIA_TOPO_JSON from "../Components/india.topo.json";
import { useState, useEffect, useMemo } from "react";
import { scaleQuantile } from "d3-scale";
import {
  CONFIRMED_COLOR_RANGE,
  RECOVERED_COLOR_RANGE,
  ACTIVE_COLOR_RANGE,
  DEATH_COLOR_RANGE,
  DEFAULT_COLOR,
} from "../AssetActions/constant";
import _ from "lodash";

export default function Map({ slot, data, slotFilter, stateSelection }) {
  const [tooltipContent, setTooltipContent] = useState("");
  const [mapData, setMapData] = useState([]);
  const [color, setColor] = useState(slot);
  let TotalData = data;
  let InitialData = useMemo(() => {
    if (TotalData !== undefined) {
      return TotalData.map((e) => {
        return {
          id: e.key,
          state: e.stateName,
          value: e[slot],
        };
      });
    }
  }, [TotalData, slot]);

  let stateData = useMemo(() => {
    return _.filter(InitialData, (e) => {
      return e.key !== "TT";
    });
  }, [InitialData]);

  useEffect(() => {
    if (stateData.length > 0) {
      setMapData(stateData);
    }
  }, [stateData]);

  const PROJECTION_CONFIG = {
    scale: 900,
    center: [84.9629, 20.5937],
  };

  const onMouseEnter = (geo, current = { value: "NA" }) => {
    return () => {
      setTooltipContent(`${geo.properties.name}: ${current.value}`);
    };
  };

  const onMouseLeave = () => {
    setTooltipContent("");
  };

  const colorScale = scaleQuantile()
    .domain(mapData.map((d) => d.value))
    .range(
      color === "confirmed"
        ? CONFIRMED_COLOR_RANGE
        : color === "active"
        ? ACTIVE_COLOR_RANGE
        : color === "recovered"
        ? RECOVERED_COLOR_RANGE
        : color === "deceased"
        ? DEATH_COLOR_RANGE
        : ""
    );

  const geographyStyle = {
    default: {
      outline: "none",
    },
    hover: {
      outline: "none",
    },
    pressed: {
      outline: "none",
    },
  };

  function changeColor(color) {
    slotFilter(color);
    setColor(color);
  }

  function setSelectedState(id) {
    stateSelection(id.state);
  }

  return (
    <div>
      <ReactTooltip>{tooltipContent}</ReactTooltip>
      <ComposableMap
        projectionConfig={PROJECTION_CONFIG}
        projection="geoMercator"
        width={800}
        height={600}
        data-tip=""
        style={{ pointerEvents: "none", margin: "auto" }}
      >
        <Geographies
          geography={INDIA_TOPO_JSON}
          style={{ pointerEvents: "auto" }}
        >
          {({ geographies }) =>
            geographies.map((geo) => {
              const current = mapData.find((s) => s.id === geo.id);
              return (
                <Geography
                  key={geo.rsmKey}
                  geography={geo}
                  fill={current ? colorScale(current.value) : DEFAULT_COLOR}
                  style={geographyStyle}
                  onClick={() => setSelectedState(current)}
                  onMouseEnter={onMouseEnter(geo, current)}
                  onMouseLeave={onMouseLeave}
                />
              );
            })
          }
        </Geographies>
      </ComposableMap>
      <div className="hidden flex-wrap rounded-md mx-10 -mt-5">
        <div
          onClick={() => changeColor("confirmed")}
          className="text-lg cursor-pointer font-bold p-1 text-center bg-opacity-40 w-1/2 rounded-tl-md sm:w-1/4 sm:rounded-l-md bg-tomato text-red-600"
        >
          Confirmed
        </div>
        <div
          onClick={() => changeColor("active")}
          className="text-lg cursor-pointer font-bold p-1 text-center bg-opacity-40 w-1/2 rounded-tr-md sm:w-1/4 sm:rounded-none bg-blue-300 text-blue-600"
        >
          Active
        </div>
        <div
          onClick={() => changeColor("recovered")}
          className="text-lg cursor-pointer font-bold p-1 text-center bg-opacity-40 w-1/2 rounded-bl-md sm:w-1/4 sm:rounded-none bg-green-400 text-green-600"
        >
          Recovered
        </div>
        <div
          onClick={() => changeColor("deceased")}
          className="text-lg cursor-pointer font-bold p-1 text-center bg-opacity-40 w-1/2 rounded-br-md sm:w-1/4 sm:rounded-r-md bg-gray-500 text-gray-600"
        >
          Deaceased
        </div>
      </div>
    </div>
  );
}
