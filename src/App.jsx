import React from 'react'
import { Route, BrowserRouter as Router, Routes } from "react-router-dom";
import Home from './Components/Home/Home';
import Table from './Components/Table/Table';

import { SelectedHeadingsProvider } from './Components/Context/selectedHeadingProvider';
const App = () => {
  return (
    <SelectedHeadingsProvider>
      <Router>
        <Routes>
          <Route path='/' element={<Home />} />
          <Route path='/table' element={<Table />} />
        </Routes>
      </Router>
    </SelectedHeadingsProvider>
  )
}

export default App