import React from "react";
import { BrowserRouter as Router, Route, Routes} from 'react-router-dom';
import GetPeople from "./pages/people";
// import GetPlanets from "./pages/planet";


const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/people" component={GetPeople}/>
        {/* <Route exact path="/planets" component={GetPlanets}/> */}
        </Routes>
    </Router>
  )


}


export default App;