import logo from './logo.svg';
import './App.css';
import Navbar from './components/Navbar';
import Search from './components/Search';
import Search2 from './components/Search_new';
import AddableSelect from './components/dummy';

function App() {
  return (
    <div className="App">
     <Navbar/>
     {/* <Search/> */}
     <Search2/>
     {/* <AddableSelect/> */}
    </div>
  );
}

export default App;
