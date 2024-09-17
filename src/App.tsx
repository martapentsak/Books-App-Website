import { BrowserRouter, Routes, Route } from "react-router-dom";

import { Menu } from "./components/Menu";
import { HomePage } from "./pages/HomePage";

import { menuElemenets } from "./constants/textValues";

import { HomeProvider } from "./context/home";

import "./App.css";
import "./styles/global.scss";

function App() {
  return (
    <div className="books-app">
      <BrowserRouter>
        <HomeProvider>
          <Menu />
          <Routes>
            <Route path={menuElemenets.links.home}  element={<HomePage/>}/> 
          </Routes>
        </HomeProvider>
      </BrowserRouter>
    </div>
  );
}

export default App;
