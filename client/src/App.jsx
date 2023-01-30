import Login from "./pages/login"
import Singup from "./pages/signup"
import { BrowserRouter as Router, Switch, Route, useLocation } from "react-router-dom"
import Content from "./pages/content"
import Write from "./pages/write"
function App() {

  return (

    <Router>
      <Switch>
        <Route path={"/signup"} component={Singup} />
        <Route path={"/login"} component={Login} />
        <Route exact path={"/"} component={Content}></Route>
        <Route path={"/create"} component={Write}></Route>
      </Switch>
    </Router>
  )
}

export default App
