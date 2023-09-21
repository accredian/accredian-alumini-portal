import logo from './logo.svg';
import './App.css';
import Navbar from './components/Navbar';
import Search from './components/Search';
import Search2 from './components/Search_new';
import AddableSelect from './components/dummy';
import { useEffect } from 'react';
import axios from 'axios';
import Page404 from './components/Page404';
import Home from './components/Home'


function App() {

 
  return (
    <div className="App">
      {/* <Page404/> */}
     {/* <Navbar/> */}
     {/* <Search/> */}
     <Home/>
     {/* <AddableSelect/> */}
    </div>
  );
}

export default App;
