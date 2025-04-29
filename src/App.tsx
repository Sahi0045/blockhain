import './App.css'
import { Route, Switch } from "wouter";
import MemeDiv from './components/meme-template';
import Hero from './components/hero';
import EmailAuth from './components/email-auth';
import ExploreUnichain from './components/explore-unichain';

// import Explore from './components/explore-polygon';
// import ExploreCore from './components/explore-coredao';



function App() {

  return (
    <>
    {/* 
      Routes below are matched exclusively -
      the first matched route gets rendered
    */}
    <Switch>
      <Route path='/' component={Hero} />
      <Route path="/meme-template" component={MemeDiv} />
      <Route path="/auth" component={EmailAuth} />
      <Route path="/users/:name">
        {(params) => <>Hello, {params.name}!</>}
      </Route>
      {/* <Route path="/explore/137" component={Explore}/>
      // <Route path="/explore/1116" component={ExploreCore}/> */}
      <Route path="/explore" component={ExploreUnichain}/>
        {/* <Route path="/explore/:chainId">
        {(params) => <Explore chainId={parseInt(params.chainId)} />}
        </Route> */}
      {/* Default route in a switch */}
      <Route>404: No such page!</Route>
    </Switch>
  </>
  )
}

export default App
