import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Home from "./pages/Home.jsx";
import { Toaster } from "react-hot-toast";
import Login from "./pages/Login.jsx";
import NavBar from "./components/NavBar.jsx";
import { Provider } from "react-redux";
import store from "./features/store.js";
import CreateProject from "./pages/CreateProject.jsx";

ReactDOM.createRoot(document.getElementById("root")).render(
  <Provider store={store}>
    <BrowserRouter>
      <Toaster position="bottom-left" duration={500} />
      <NavBar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/create-project" element={<CreateProject />} />
        <Route path="/project/:pid" element={<App />} />
      </Routes>
    </BrowserRouter>
  </Provider>
);
