import { BrowserRouter, Route, Routes } from "react-router-dom";
import "./App.css";
import Layout from "./Pages/Layout";
import MenuContextProvider from "./Context/MenuContext/Provider";
import Home from "./Pages/Home";
import Login from "./Pages/Login";

function App() {
  return (
    <>
      <BrowserRouter>
        <MenuContextProvider >
          <Routes>
            <Route path="/" element={<Layout />}>
              <Route index element={<Home />} />

              {/* <Route index element={<Home />} /> */}
              <Route path="/login" element={<Login />} />
              {/* <Route path="/signin" element={<Signin />} /> */}
              {/* <Route path="/events/:id" element={<EventDetail />} /> */}
              {/* <Route path="/acceuil" element={<Acceuil />} /> */}
              {/* </Route> */}
            </Route>
          </Routes>
        </MenuContextProvider>
      </BrowserRouter>
    </>
  );
}

export default App;
