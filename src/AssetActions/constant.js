import moment from "moment"

export const STATE_ABBR = {
    AP: 'Andhra Pradesh',
    AR: 'Arunachal Pradesh',
    AS: 'Assam',
    BR: 'Bihar',
    CT: 'Chhattisgarh',
    GA: 'Goa',
    GJ: 'Gujarat',
    HR: 'Haryana',
    HP: 'Himachal Pradesh',
    JH: 'Jharkhand',
    KA: 'Karnataka',
    KL: 'Kerala',
    MP: 'Madhya Pradesh',
    MH: 'Maharashtra',
    MN: 'Manipur',
    ML: 'Meghalaya',
    MZ: 'Mizoram',
    NL: 'Nagaland',
    OR: 'Odisha',
    PB: 'Punjab',
    RJ: 'Rajasthan',
    SK: 'Sikkim',
    TN: 'Tamil Nadu',
    TG: 'Telangana',
    TR: 'Tripura',
    UT: 'Uttarakhand',
    UP: 'Uttar Pradesh',
    WB: 'West Bengal',
    AN: 'Andaman and Nicobar Islands',
    CH: 'Chandigarh',
    DN: 'Dadra and Nagar Haveli and Daman and Diu',
    DL: 'Delhi',
    JK: 'Jammu and Kashmir',
    LA: 'Ladakh',
    LD: 'Lakshadweep',
    PY: 'Puducherry',
    TT: 'India',
  };

export const COLUMNS = [
    {
      title: 'State',
      dataIndex: 'stateName',
      key: 'stateName',
      fixed: true,
    },
    {
      title: 'Confirmed',
      dataIndex: 'confirmed',
      key: 'confirmed',
      sorter: (a, b) => a.confirmed - b.confirmed,
      sortDirections: ['ascend', 'descend', 'ascend'],
      width: '50',
      render(text) {
        return text !== 0 ? {
          children: <div>{text.toLocaleString()}</div>
        } : {
          children: <div>{"N/A"}</div>
        }
      }
    },
    {
      title: 'Active',
      dataIndex: 'active',
      key: 'active',
      sorter: (a, b) => a.active - b.active,
      sortDirections: ['ascend', 'descend', 'ascend'],
      width: '50',
      render(text) {
        return text !== 0 ? {
          children: <div>{text.toLocaleString()}</div>
        } : {
          children: <div>{"N/A"}</div>
        }
      }
    },
    {
      title: 'Recovered',
      dataIndex: 'recovered',
      key: 'recovered',
      sorter: (a, b) => a.recovered - b.recovered,
      sortDirections: ['ascend', 'descend', 'ascend'],
      width: '50',
      render(text) {
        return text !== 0 ? {
          children: <div>{text.toLocaleString()}</div>
        } : {
          children: <div>{"N/A"}</div>
        }
      }
    },
    {
      title: 'Deceased',
      dataIndex: 'deceased',
      key: 'deceased',
      sorter: (a, b) => a.deceased - b.deceased,
      sortDirections: ['ascend', 'descend', 'ascend'],
      width: '50',
      render(text) {
        return text !== 0 ? {
          children: <div>{text.toLocaleString()}</div>
        } : {
          children: <div>{"N/A"}</div>
        }
      }
    },
    {
      title: 'Tested',
      dataIndex: 'tested',
      key: 'tested',
      sorter: (a, b) => a.tested - b.tested,
      sortDirections: ['ascend', 'descend', 'ascend'],
      width: '50',
      render(text) {
        return text !== 0 ? {
          children: <div>{text.toLocaleString()}</div>
        } : {
          children: <div>{"N/A"}</div>
        }
      }
    },
    {
      title: 'Partially vaccinated',
      dataIndex: 'vaccinated1',
      key: 'vaccinated1',
      sorter: (a, b) => a.vaccinated1 - b.vaccinated1,
      sortDirections: ['ascend', 'descend', 'ascend'],
      width: '50',
      render(text) {
        return {
          children: <div>{text.toLocaleString()}</div>
        };
      }
    },
    {
      title: 'Fully vaccinated',
      dataIndex: 'vaccinated2',
      key: 'vaccinated2',
      sorter: (a, b) => a.vaccinated2 - b.vaccinated2,
      sortDirections: ['ascend', 'descend', 'ascend'],
      width: '50',
      render(text) {
        return {
          children: <div>{text.toLocaleString()}</div>
        };
      }
    },
  ];

const date = []
let startDate = moment("2020-03-26","YYYY-MM-DD")
let endDate = moment("2021-10-30","YYYY-MM-DD")

for (var m = moment(startDate); m.isBefore(endDate); m.add(1, 'days')) {
  date.push(m.format('YYYY-MM-DD'));
}

const stateCodes = [];
const stateCodesMap = {};
Object.keys(STATE_ABBR).map((key, index) => {
  stateCodesMap[STATE_ABBR[key]] = key;
  stateCodes.push({code: key, name: STATE_ABBR[key]});
  return null;
})

export const STATE_CODES = stateCodesMap

export const STATE_CODES_ARRAY = stateCodes

export const DATE_RANGE = date

export const CONFIRMED_COLOR_RANGE = ['rgba(238, 108, 77, 0.3)','rgba(238, 108, 77, 0.4)','rgba(238, 108, 77, 0.5)','rgba(238, 108, 77, 0.6)','rgba(238, 108, 77, 0.7)','rgba(238, 108, 77, 0.7)','rgba(238, 108, 77, 0.8)','rgba(238, 108, 77, 0.9)','#ee6c4d'];

export const ACTIVE_COLOR_RANGE = ['rgb(37, 99, 235, 0.2)','rgb(37, 99, 235, 0.3)','rgb(37, 99, 235, 0.4)','rgb(37, 99, 235, 0.5)','rgb(37, 99, 235, 0.6)','rgb(37, 99, 235, 0.7)','rgb(37, 99, 235, 0.8)','rgb(37, 99, 235, 0.9)','rgb(37, 99, 235)']

export const RECOVERED_COLOR_RANGE = ['rgb(16, 185, 129, 0.2)','rgb(16, 185, 129, 0.3)','rgb(16, 185, 129, 0.4)','rgb(16, 185, 129, 0.5)','rgb(16, 185, 129, 0.6)','rgb(16, 185, 129, 0.7)','rgb(16, 185, 129, 0.8)','rgb(16, 185, 129, 0.9)','rgb(16, 185, 129)']

export const DEATH_COLOR_RANGE = ['rgb(75, 85, 99, 0.2)','rgb(75, 85, 99, 0.3)','rgb(75, 85, 99, 0.4)','rgb(75, 85, 99, 0.5)','rgb(75, 85, 99, 0.6)','rgb(75, 85, 99, 0.7)','rgb(75, 85, 99, 0.8)','rgb(75, 85, 99, 0.9)','rgb(75, 85, 99)']

export const DEFAULT_COLOR = '#EEE'