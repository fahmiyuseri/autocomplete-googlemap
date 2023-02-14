import logo from './logo.svg';
import './App.css';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import HomeScreen from './screen/HomeScreen';

function App() {

  return (
    <BrowserRouter>
      <Routes>
        <Route
          path="/"
          element={<HomeScreen />}
        />
        {/* <Route
          path="/error"
          element={<Error />}
        /> */}
      </Routes>
    </BrowserRouter>
  );
}

export default App;
