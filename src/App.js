import logo from './logo.svg';
import './App.css';
import Navbar from './components/Navbar';
import Search from './components/Search';
import Search2 from './components/Search_new';
import AddableSelect from './components/dummy';
import { useEffect } from 'react';
import axios from 'axios';
import Page404 from './components/Page404';


function App() {

 
  return (
    <div className="App">
      {/* <Page404/> */}
     <Navbar/>
     {/* <Search/> */}
     <Search2/>
     {/* <AddableSelect/> */}
    </div>
  );
}

export default App;
