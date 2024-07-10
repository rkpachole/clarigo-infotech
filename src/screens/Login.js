import React, { useState,useEffect } from 'react'
import axios from 'axios';
import { BASE_URL } from '../constants/Index';
import { useNavigate,Link } from 'react-router-dom';

const Login = () => {
  var accessToken = localStorage.getItem("accessToken");
  const [formData, setFormData] = useState({
    email: "",
    password: ""
  })
  const navigate = useNavigate();
  const [successMessage, setSuccessMessage] = useState("");
  const [errorField, setErrorField] = useState("");

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post(`${BASE_URL}/login`, formData);

      console.log('Form submitted:', response.data.data.user.accessToken);

      if (response.data.status) {
        setSuccessMessage(response?.data?.message);

        setTimeout(() => {
          navigate("/dashboard")
          localStorage.setItem("accessToken",response.data.data.user.accessToken);
        }, 1000)
      } else {
        setErrorField(response?.data?.message)
      }
    } catch (error) {
      console.error('Error submitting form:', error);
      // setErrorField(error.response?.data?.message)
    }
  }

  useEffect(()=>{
    if(accessToken){
      navigate("/dashboard")
    }else{
      navigate("/")
    }
  },[accessToken])

  return (
    <div><div className="flex min-h-full flex-col justify-center px-6 py-12 lg:px-8">
      <div className="sm:mx-auto sm:w-full sm:max-w-sm">

        <h2 className="mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">
          Sign in to your account
        </h2>
      </div>
      <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
        <form className="space-y-6" onSubmit={handleSubmit}>
          <div>
          <div className="flex items-center justify-between">
          <label
                htmlFor="password"
                className="block text-sm font-medium leading-6 text-gray-900"
              >
                  Email address
              </label>
              </div>
            
            <div className="mt-2">
              <input
                id="email"
                name="email"
                type="email"
                value={formData.email}
                onChange={handleChange}
                required=""
                className="block text-center w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
              />
              
            </div>
          </div>
          <div>
            <div className="flex items-center justify-between">
              <label
                htmlFor="password"
                className="block text-sm font-medium leading-6 text-gray-900"
              >
                Password
              </label>

            </div>
            <div className="mt-2">
              <input
                id="password"
                name="password"
                type="password"
                value={formData.password}
                onChange={handleChange}
                required=""
                className="block text-center w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
              />
             
            </div>
          </div>
          <div>
            <button
              type="submit"
              className="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
            >
              Sign in
            </button>
          </div>
        </form>
        <p className="mt-10 text-center text-sm text-gray-500">
          Not a member?
          <Link
            to="/"
            className="font-semibold leading-6 text-indigo-600 hover:text-indigo-500"
          >
           SignUp Now
          </Link>
        </p>
      </div>
    </div></div>
  )
}

export default Login