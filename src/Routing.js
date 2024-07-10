import React, { lazy, Suspense } from 'react';
import { BrowserRouter as Router,Route,Routes} from 'react-router-dom';

const Login =lazy(()=>import("./screens/Login"));
const OTP =lazy(()=>import("./screens/Otp"))
const Registration =lazy(()=>import("./screens/Registration"))
const Dashboard =lazy(()=>import("./screens/Dashboard"))

const Routing = () => {
  return (
<Router>
        <Suspense fallback={<div>...Loading data</div>}>
        <Routes>
            <Route path='/signin' element={<Login/>} />
            <Route path='/otp' element={<OTP/>} />
            <Route path='/' element={<Registration/>} />
            <Route path='/dashboard' element={<Dashboard/>} />
        </Routes>
        
        </Suspense>
        </Router>
  )
}

export default Routing;