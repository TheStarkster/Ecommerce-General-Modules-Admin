import React from 'react';
import Paths from './routes/paths'
import {BrowserRouter} from 'react-router-dom'
function App() {
  return (
    <BrowserRouter>
      <Paths></Paths>
    </BrowserRouter>
  )
}
export default App;
