import Nav from "./components/Nav";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./pages/home/Home";
import Footer from "./components/Footer";
import AppContext from "./context/AppContext";
import Modal from "./components/Modal";
import MobileMenu from "./components/MobileMenu";

function App() {
  return (
    <AppContext>
      <Router>
        <div className="app" id="app">
          <div className="overlay-container">
            <Modal />
            <MobileMenu/>
          </div>
          <img
            className="fill-screen"
            src="images/hero_background.jpg"
            alt="mountains"
            style={{ position: "absolute", top: 0, left: 0 }}
          ></img>
          <img
            className="fill-screen"
            src="images/social_background.jpg"
            alt="mountains"
            style={{ position: "absolute", bottom: 0, left: 0 }}
          ></img>
          <Nav />
          <div className="app-container">
            <Routes>
              <Route path="/" exact element={<Home />} />
            </Routes>
          </div>
        </div>
        <Footer />
      </Router>
    </AppContext>
  );
}

export default App;
