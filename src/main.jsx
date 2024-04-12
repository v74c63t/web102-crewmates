import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import { BrowserRouter, Route, Routes } from "react-router-dom";
import './index.css'
import ReadCrew from './pages/ReadCrew/ReadCrew.jsx';
import EditCrew from './pages/EditCrew/EditCrew.jsx';
import CreateCrew from './pages/CreateCrew/CreateCrew.jsx';
import NavBar from './components/NavBar/NavBar.jsx';
import { Link } from "react-router-dom";
import CrewDetail from './pages/CrewDetail/CrewDetail.jsx';

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <BrowserRouter>
    <Routes>
      <Route path="/" element={<NavBar/>}>
        <Route index={true} element={<App />} />
        <Route index={false} path="/edit/:id"  element={<EditCrew />} />
        <Route index={false} path="/detail/:id"  element={<CrewDetail />} />
        <Route index={false} path="/create"  element={<CreateCrew />} />
        <Route index={false} path="/view"  element={<ReadCrew />} />
        <Route
          path="*"
          element={
            <main style={{ padding: "1rem" }}>
              <p>There's nothing here!</p>
              <Link style={{ color: "black" }} to="/">
                Back to Home
              </Link>
            </main>
          }
        />
      </Route>
    </Routes>
  </BrowserRouter>
  </React.StrictMode>,
)
