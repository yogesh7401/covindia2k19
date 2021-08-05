import India from './Layouts/MapTableView/India'
import Home from './Layouts/Home/Home'
import SideBar from './Layouts/SideBar/SideBar.jsx'
import StateTable from './Layouts/TableView/StateTable.jsx'
import { ReactComponent as UpIcon } from './Assets/Image/toTop.svg'
import ScrollToTop from "react-scroll-to-top"

import {
  BrowserRouter as Router,
  Switch,
  Route,
} from "react-router-dom"
import Zoom from 'react-reveal/Zoom'
import GraphLayout from './Layouts/GraphView/GraphLayout'

function App() {
  return (
    <Router>
      <ScrollToTop smooth style={{background:"#e0fbfc"}} component={<UpIcon />}/>
      <div className="App relative" style={{fontFamily: `'Nunito', sans-serif`}}>
        <SideBar />
        <div className="lg:ml-28 p-5 min-h-screen">
          <div className="container mx-auto overflow-x-hidden ">
            <Zoom top>
                <p onClick={() => window.location.reload()} className="text-primary cursor-pointer text-center font-extrabold uppercase text-xl mb-5">cov<span className="text-tomato">india</span>-19</p>
            </Zoom>
            <Switch>
              <Route exact  path="/" component={Home}/>
              <Route path="/state-table" component={StateTable} />
              <Route path="/state-map" component={India} />
              {/* <Route path="/graph/:place/:district?" component={GraphLayout}/> */}
              <Route path="/graph/:place" component={GraphLayout}/>
            </Switch>
          </div>
        </div>
      </div>
  </Router>
  )
}

export default App
