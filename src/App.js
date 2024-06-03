import {BrowserRouter as Router, Route, Routes, Outlet, Navigate, useLocation} from 'react-router-dom';
import Login from './components/Login/Login';
import Logout from './components/Logout/Logout';
import Dashboard from './components/Dashboard/Dashboard';
import AddCar from './components/AddCar/AddCar';
import useToken from './utils/useToken';

const App = () => {
  const { token } = useToken();
  return(
  <div className="Main">
    <Router>
      <Routes>
        <Route path="/" element={<PrivateRoute />}>
          <Route index element={<Dashboard />} />
          <Route path="/add" element={<AddCar />} />
        </Route>
        <Route path="/login" element={<Login />} />
        <Route path="/logout" element={<Logout />} />
        
      </Routes>
    </Router>
  </div>
  );
}

/** Middleware for private routes. */
const PrivateRoute = () => {
  const location = useLocation();
  const tokenString = localStorage.getItem('token');
  const userToken = JSON.parse(tokenString);

  return userToken ? <Outlet /> : <Navigate to="login" state={{ from: location }} />;
};

export default App;
