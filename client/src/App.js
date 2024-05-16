import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import PrivateRoute from './components/PrivateRoute'; // Import PrivateRoute component
import { NavBar } from './components/NavBar';
import { Footer } from './components/Footer';
import { Login } from './pages/Login Page/Login';
import { Home } from './pages/Home/Home';
import { Error } from './pages/Error/Error';
import { AddCustomer } from './pages/AddCustomer/AddCustomer';
import { ViewCustomers } from './pages/ViewCustomers/ViewCustomers';
import { ViewTransactions } from './pages/ViewTransactions/ViewTransactions';
import { AddTransaction } from './pages/AddTransaction/AddTransactions';
import UserProfile from './pages/Profile Page/Profile';
import { Logout } from './pages/Logout Page/Logout';
import { useAuth } from './api/auth';

const App = () => {
  const { isLoggedIn, user } = useAuth();

  return (
    <BrowserRouter>
      <div className="app-container">


        {isLoggedIn && <NavBar />}
        <Routes>
          {isLoggedIn ? (
            <><Route path="/" element={<Navigate to="/Home" />} /> {/* Redirect "/" to "/Home" if logged in */}</>
          ) : (
            <><Route path="/" element={<Login />} /></>
          )}

          <Route element={<PrivateRoute isLoggedIn={isLoggedIn} />} >
            <Route path="/Home" element={<Home />} />
            <Route path="/AddTransaction" element={<AddTransaction />} />
            <Route path="/Transactions" element={<ViewTransactions />} />
            <Route path={`/Profile/${user.c_id ? user.c_id : ''}`} element={<UserProfile />} />
            <Route path="/AddCustomer" element={<AddCustomer />} />
            <Route path="/Customers" element={<ViewCustomers />} />
          </Route>


          <Route path="*" element={<Error />} />
          <Route path="/logout" element={<Logout />} />


        </Routes>
        {isLoggedIn && <Footer />}
      </div>
    </BrowserRouter >
  );
};

export default App;



//{/* <Route path="/xyz" element={< privateRoute > <xyz /> </PrivateRoute >} /> */}