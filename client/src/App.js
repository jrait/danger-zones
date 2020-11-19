import logo from './logo.svg';
import './App.css';
import {Router} from '@reach/router'
import Main from './views/Main'
import Setup from './views/Setup'
import 'bootstrap/dist/css/bootstrap.min.css'

function App() {
  return (
    <div className="App">
      <h2>How risky is your county?</h2>
      <Router>
        <Main path='/'/>
        <Setup path = '/setup'/>
      </Router>
      <div className = 'footer'>
            <p>Sources: <a href = 'https://www.census.gov/library/publications/2011/compendia/usa-counties-2011.html#LND'>US Census Land Area</a> ;  <a href = 'https://usafacts.org/visualizations/coronavirus-covid-19-spread-map/'>USA Facts</a> ; <a href = 'https://wonder.cdc.gov/NASA-NLDAS.html'>North America Land Data Assimilation System</a></p>
        </div>
    </div>
  );
}

export default App;
