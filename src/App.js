import React from 'react';
import './App.css';
import NavBar from './Components/Navbar';
import News from './Components/News';
import { Route, Routes } from 'react-router-dom';
import LoadingBar from 'react-top-loading-bar';
import { useState } from 'react';

const App = () => {

  const [progress, setProgres] = useState(0);
  const pageSize = 6;
  const apiKey = "c02d32e049e648a88ba02d87b95c3cc6";
  const setProgress = (progressCount) => {
    setProgres(progressCount)
  }

  return (
    <div>
      <NavBar/>
      <LoadingBar height={3} color="#f11946" progress={progress} />
      <Routes>
        <Route exact path='/' element={<News setProgress={setProgress} apiKey={apiKey} key="general" pageSize={pageSize} country="in" category="general" />} />
        <Route exact path='/sports' element={<News setProgress={setProgress} apiKey={apiKey} key="sports" pageSize={pageSize} country="in" category="sports" />} />
        <Route exact path='/business' element={<News setProgress={setProgress} apiKey={apiKey} key="business" pageSize={pageSize} country="in" category="business" />} />
        <Route exact path='/entertainment' element={<News setProgress={setProgress} apiKey={apiKey} key="entertainment" pageSize={pageSize} country="in" category="entertainment" />} />
        <Route exact path='/health' element={<News setProgress={setProgress} apiKey={apiKey} key="health" pageSize={pageSize} country="in" category="health" />} />
        <Route exact path='/science' element={<News setProgress={setProgress} apiKey={apiKey} key="science" pageSize={pageSize} country="in" category="science" />} />
        <Route exact path='/technology' element={<News setProgress={setProgress} apiKey={apiKey} key="technology" pageSize={pageSize} country="in" category="technology" />} />
      </Routes>
    </div>
  )
}

export default App;
