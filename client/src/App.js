import {
  BrowserRouter as Router,
  Route,
  Routes,
  Outlet,
  Navigate,
} from "react-router-dom";
import "./App.css";

import RoomPage from "./pages/Room/RoomPage";
import AuthForm from "./pages/Auth/AuthForm";
import CreateRoom from "./components/room/CreateRoom";
import Room from "./components/room/Room";

import AuthProvider from "./AuthContext";

const PrivateRoute = () => {
  const token = localStorage.getItem("token");
  return token ? <Outlet /> : <Navigate to="/auth" />;
};

function App() {
  return (
    <Router>
      <AuthProvider>
        <Routes>
          <Route path="/" exact element={<RoomPage />} />
          <Route path="/rooms/*" element={<PrivateRoute />}>
            <Route path="create-room" element={<CreateRoom />} />
            <Route path=":roomId" element={<Room />} />
          </Route>
          <Route path="/auth" element={<AuthForm />} />
          <Route path="*" element={<Navigate to="/auth" />} />
        </Routes>
      </AuthProvider>
    </Router>
  );
}

export default App;
