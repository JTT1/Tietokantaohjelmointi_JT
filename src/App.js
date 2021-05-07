import './App.css';
import {Switch,Route} from 'react-router-dom'
import Home from './Home';
import Footer from './Footer';
import {useState} from 'react';
import Update from './Update';


function App() {

  const [tyontekijat, setTyontekijat] = useState([]);

  return (
    <>
      <Switch>
      <div className="container">
        <Route path="/" render={() => <Home setTyontekijat={setTyontekijat} tyontekijat={tyontekijat}/>} exact/>
        <Route path="/update" render={() => <Update/>}></Route>
      </div>
      </Switch>
    <Footer></Footer>
    </>
  );
}

export default App;
