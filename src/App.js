import React, { Component } from 'react';
import Home from "./Views/Home";
import MapOverview from './Views/MapOverview';
import MapGL from './Views/MapGL';
import './App.css';
import Login from './Views/Login';
import TopBar from "./Components/topbar";
import {
  BrowserRouter as Router,
  Switch,
  Route,
    useLocation,
  Link
} from "react-router-dom";
import SpecificRadar from './Components/SpecificRadar';
import EmotionResult from './Views/EmotionResult';
import EmotionPickerView from './Views/EmotionPickerView';
import DetailedOppinionView from './Views/DetailOppinionView'
import OverviewView from './Views/OverviewView';


class App extends Component {

  render() {
      return (
          <div className="App" >
              <div className="Content" style={{margin:'auto'}}>
                    <Router>
                        <Switch>
                            <Route path="/foelseskort">
                                <div id="map"
                                     style={{
                                         position: 'absolute',
                                         top: 0,
                                         bottom: 0,
                                         width: '100%',
                                         height: '100%',
                                     }}>
                                <MapGL/>
                                </div>
                            </Route>
                            <Route path="/indsend">
                                <DetailedOppinionView></DetailedOppinionView>
                            </Route>
                            <Route path="/beskeder">
                                <OverviewView></OverviewView>
                            </Route> 
                            <Route path="/resultat" component={EmotionResult}>
                                <EmotionResult />
                            </Route>  
                            <Route path="/stem">
                                <EmotionPickerView />
                            </Route>  
                            <Route path="/">
                                <Home/>
                            </Route>                           
                        </Switch>
                      </Router>
         
              </div>
          </div>
      );
  }
}
export default App;
