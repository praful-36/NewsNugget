import './App.css';
import Navbar from "./Components/Navbar";
import News from "./Components/News";
import Bookmarks from './Components/Bookmarks';
import { BrowserRouter as Router, Routes, Route, } from "react-router-dom";
import LoadingBar from 'react-top-loading-bar'
import React,{useState} from 'react'
import About from './Components/About';

 const App =()=> {

  const [progress, setprogress] = useState(0)
  const pageSize = 6;
  const apiKey = import.meta.env.VITE_NEWS_API;

    return (
      <>
        <Router>
        <LoadingBar color='rgb(0, 166, 255)' progress={progress} />
          <Navbar />

          <Routes>
            <Route exact path="/" element={<News setprogress={setprogress} key="general" apiKey={apiKey} pageSize={pageSize} country="in" category="general" />} />
            <Route exact path="/business" element={<News setprogress={setprogress} key="business" apiKey={apiKey} pageSize={pageSize} country="in" category="business" />} />
            <Route exact path="/entertainment" element={<News setprogress={setprogress} key="entertainment" apiKey={apiKey} pageSize={pageSize} country="in" category="entertainment" />} />
            <Route exact path="/health" element={<News setprogress={setprogress} key="health" apiKey={apiKey} pageSize={pageSize} country="in" category="health" />} />
            <Route exact path="/science" element={<News setprogress={setprogress} key="science" apiKey={apiKey} pageSize={pageSize} country="in" category="science" />} />
            <Route exact path="/sports" element={<News setprogress={setprogress} key="sports" apiKey={apiKey} pageSize={pageSize} country="in" category="sports" />} />
            <Route exact path="/technology" element={<News setprogress={setprogress} key="technology" apiKey={apiKey} pageSize={pageSize} country="in" category="technology" />} />
            <Route exact path="/bookmarks" element={<Bookmarks />} />
            <Route exact path="/about" element={<About />} />
          </Routes>
        </Router>
      </>
    )
  
}

export default App;

