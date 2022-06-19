// import React from "react";
// import ReactApexChart from "react-apexcharts";
// export default class BarChart extends React.Component {
//   constructor(props) {
//     super(props);
//     let data = props.data.slice(0, 10);
//     let name = data.map((e) => {
//       return e.stateName;
//     });

//     this.state = {
//       series: [
//         {
//           data: data.map((e) => {
//             return e[props.slot];
//           }),
//         },
//       ],
//       name: this.props.slot,
//       options: {
//         chart: {
//           type: "bar",
//           height: 350,
//         },
//         plotOptions: {
//           bar: {
//             borderRadius: 4,
//             horizontal: true,
//           },
//         },
//         dataLabels: {
//           enabled: false,
//         },
//         xaxis: {
//           categories: name,
//         },
//       },
//     };
//   }
//   componentDidUpdate(nextProps) {
//     console.log(this.props);
//     if (
//       this.props.order !== nextProps.order ||
//       this.props.slot !== nextProps.slot
//     ) {
//       let data = this.props.data.slice(0, 10);
//       let name = data.map((e) => {
//         return e.stateName;
//       });
//       this.setState = {
//         ...this.state,
//         series: [
//           {
//             data: data.map((e) => {
//               return e[this.props.slot];
//             }),
//           },
//         ],
//         xaxis: {
//           categories: name,
//         },
//       };
//     }
//   }

//   render() {
//     return
//   }
// }
import ReactApexChart from "react-apexcharts";

export default function BarChart(props) {
  let data = props.data.slice(0, 10);
  let name = data.map((e) => {
    return e.stateName;
  });
  var series = [
    {
      data: data.map((e) => {
        return e[props.slot];
      }),
    },
  ];
  var options = {
    chart: {
      type: "bar",
    },
    colors:
      props.slot === "confirmed"
        ? "#DC2626"
        : props.slot === "recovered"
        ? "#059669"
        : props.slot === "active"
        ? "#2563EB"
        : "#4B5563",
    plotOptions: {
      bar: {
        borderRadius: 4,
        horizontal: true,
      },
    },
    dataLabels: {
      enabled: false,
    },
    xaxis: {
      categories: name,
    },
  };
  return (
    <div id="chart">
      <ReactApexChart options={options} series={series} type="bar" />
    </div>
  );
}
