import { BrowserRouter, Route, Routes } from "react-router-dom";
import "./App.css";
import Layout from "./Pages/Layout";
import MenuContextProvider from "./Context/MenuContext/Provider";
import Home from "./Pages/Home";
import Login from "./Pages/Login";
import Signin from "./Pages/SignIn";
import ProtectedRoute from "./Components/ProtectedRoute";
import Welcome from "./Pages/Welcome";
import Messages from "./Pages/Messages";
import UnderConstruction from "./Pages/UnderConstruction";
import EventDetail from "./Components/Events/EventDetail";
import Expats from "./Pages/Expats";
import Notifications from "./Pages/Notifications";
import Discussion from "./Pages/Discussions";
import AddEvent from "./Pages/AddEvent";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { AuthProvider } from "./Context/AuthContext";

// ⚠️ Singleton en dehors du composant
const queryClient = new QueryClient();

function App() {
  return (
    <BrowserRouter>
      <AuthProvider>
        <QueryClientProvider client={queryClient}>
          <MenuContextProvider>
            <Routes>
              {/* Routes publiques */}
              <Route path="/login" element={<Login />} />
              <Route path="/signin" element={<Signin />} />
              <Route path="/welcome" element={<Welcome />} />

              {/* Routes protégées */}
              <Route element={<ProtectedRoute />}>
                <Route path="/" element={<Layout />}>
                  <Route index element={<Home />} />
                  {/* chemins RELATIFS car on est sous "/" */}
                  <Route path="addevent" element={<AddEvent />} />
                  <Route path="message" element={<Messages />} />
                  <Route path="message/:id" element={<Discussion />} />
                  <Route path="notifications" element={<Notifications />} />
                  <Route path="expats" element={<Expats />} />
                  <Route path="events/:id" element={<EventDetail />} />
                  <Route path="*" element={<UnderConstruction />} />
                </Route>
              </Route>
            </Routes>
          </MenuContextProvider>
        </QueryClientProvider>
      </AuthProvider>
    </BrowserRouter>
  );
}

export default App;
