import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import { BrowserRouter, Route, Routes } from "react-router-dom";
import './index.css'
import ViewCharacters from './pages/ViewCharacters/ViewCharacters.jsx';
import EditCharacter from './pages/EditCharacter/EditCharacter.jsx';
import CreateCharacter from './pages/CreateCharacter/CreateCharacter.jsx';
import NavBar from './components/NavBar/NavBar.jsx';
import { Link } from "react-router-dom";
import CharacterDetail from './pages/CharacterDetail/CharacterDetail.jsx';

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <BrowserRouter>
    <Routes>
      <Route path="/" element={<NavBar/>}>
        <Route index={true} element={<App />} />
        <Route index={false} path="/edit/:id"  element={<EditCharacter />} />
        <Route index={false} path="/character/:id"  element={<CharacterDetail />} />
        <Route index={false} path="/create"  element={<CreateCharacter />} />
        <Route index={false} path="/view"  element={<ViewCharacters />} />
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
