import React, { Suspense, useEffect, useState } from 'react'
import styles from "./style";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import QRCodeGenerator from './components/QRCodeGenerator.jsx';
import { lazy } from 'react';

import { Navbar } from './components';
import Cookies from "js-cookie";
import ProtectedRoute from './PrivateRoute.jsx';
import NotFound from './pages/NotFound.jsx';
import Loader from './components/Loader.jsx';

const Home = lazy(()=>import( './pages/Home'));
const LoginPage = lazy(()=>import( './components/Auth/LoginPage'));
const RegisterPage = lazy(()=>import( './components/Auth/RegisterPage'));
const Loan = lazy(()=>import( './pages/Loans.jsx'));
const CryptoTracker = lazy(()=>import( './pages/Crypto.jsx'));
const Profile = lazy(()=>import( './pages/Profile'));
const Dashboard = lazy(()=>import( './pages/Dashboard.jsx'));
const TransactionForm = lazy(()=>import( './pages/AddTransaction.jsx'));
const Payements = lazy(()=>import( './pages/Payements.jsx'));
const Bank = lazy(()=>import( './pages/Bank.jsx'));
const MainTransaction = lazy(()=>import( './pages/MainTransaction.jsx'));


const App = () => {
  const [tt , setToken] = useState("");

  useEffect(()=>{
    const token = Cookies.get('token');
    setToken(token);

  })
  return (
    <div className="bg-black w-full h-screen overflow-hidden">
      <Router>
      <div className={`${styles.paddingX} ${styles.flexCenter}`}>
      <div className={`${styles.boxWidth}`}>
        <Navbar />
      </div>
    </div>
      <Suspense fallback={<Loader />}>
          <Routes>
            <Route path="/" element={<Home />}></Route>
            <Route path="/login" element={<LoginPage />
            } />
            <Route path="/register" element={<RegisterPage />} />
            <Route path="/flash loans" element={<Loan/>} />
            <Route path="/crypto tracker" element={<CryptoTracker />} />

            {/* only if user is login */}
            <Route 
              element={<ProtectedRoute  isAuthenticated={tt ? true : false} />}
            >
              <Route path="/profile" element={<Profile />} />
              <Route path="/test" element={<test />} />
              <Route path="/dashboard" element={<Dashboard />} />
              <Route path="/transaction" element={<TransactionForm />} />
              <Route path="/cryptupi" element={<Payements />} />
              <Route path="/KYC" element={<Bank />} />
              <Route path="/bank detail" element={<MainTransaction />} />
            </Route>
            <Route path="/*" element={<NotFound />} />
          </Routes>
      </Suspense>
      </Router>
    </div>
  )
}

export default App
