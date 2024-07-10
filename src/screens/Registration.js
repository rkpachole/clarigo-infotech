import React, { useState, useEffect } from 'react'
import { BASE_URL } from '../constants/Index';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
const Registration = () => {
  var accessToken = localStorage.getItem("accessToken");
  const [formData, setFormData] = useState({
    name: "",
    gender: "",
    dateofbirth: "",
    mobile_code: "+91",
    email: "",
    phone: "",
    password: "",
    confirmPassword: "",
    terms_condition: 0,
    profilecreatedby: "",
  })
  const [errors, setErrors] = useState({});
  const [successMessage, setSuccessMessage] = useState("");
  const [errorField, setErrorField] = useState("");
  const [otp, setOtp] = useState();
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };
  const validate = () => {
    const newErrors = {};
    if (!formData.name.trim()) {
      newErrors.name = 'name is required';
    }
    if (!formData.email) {
      newErrors.email = 'Email is required';
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = 'Email is invalid';
    }
    if (!formData.password) {
      newErrors.password = 'Password is required';
    } else if (formData.password.length < 6) {
      newErrors.password = 'Password must be at least 6 characters';
    }
    if (!formData.confirmPassword) {
      newErrors.confirmPassword = 'confirmPassword is required';
    } else if (formData.confirmPassword == formData.password) {
      newErrors.confirmPassword = 'Password and confirm password do not match"';
    }
    return newErrors;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formErrors = validate();
    if (Object.keys(formErrors).length === 0 ) {
      setErrors({})
      try {
        const response = await axios.post(`${BASE_URL}/registrationForWeb`, formData);
        localStorage.setItem('email', formData.email);
        console.log('Form submitted:', response);
        setFormData({
          name: "",
          gender: "",
          dateofbirth: "",
          mobile_code: "+91",
          email: "",
          phone: "",
          password: "",
          confirmPassword: "",
          terms_condition: 0,
          profilecreatedby: "",
        });
        if (response.data.status) {
          setSuccessMessage(response?.data?.message);
          setOtp(response?.data?.data);
          setTimeout(() => {
            navigate("/otp")
            localStorage.setItem('otp', response?.data?.data);
          }, 1000)
        } else {
          console.log(response.data)
          setErrorField(response?.data?.message)
        }
      } catch (error) {
        console.error('Error submitting form:', error.response.data.message);
        setErrorField(error.response?.data?.message)
      }
    } else {
      setErrors(formErrors);
    }
  };
  useEffect(() => {
    if (accessToken) {
      navigate("/dashboard")
    } else {
      navigate("/signin")
    }
  }, [accessToken])
  return (
    <>
      <div className="flex min-h-full flex-col justify-center px-6 py-12 lg:px-8">
        <div className="sm:mx-auto sm:w-full sm:max-w-sm">

          <h2 className="mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">
            Signup to your account
          </h2>
        </div>
        <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
          <h1 className="text-green-500 text-sm mt-1">{successMessage && successMessage}</h1>
          <p className="text-red-500 text-sm mt-1">{errorField && errorField}</p>
          <form className="space-y-6" onSubmit={handleSubmit}>
            <div>
              <div className="flex items-center justify-between">
                <label
                  htmlFor="name"
                  className="block text-sm font-medium leading-6 text-gray-900"
                >
                  Name
                </label>

              </div>
              <div className="mt-2">
                <input
                  id="name"
                  name="name"
                  type="text"
                  value={formData.name}
                  onChange={handleChange}
                  required=""
                  className="block text-center w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                />
                {errors.name && <p className="text-red-500 text-sm mt-1">{errors.name}</p>}
              </div>
            </div>

            <div>
              <div className="flex items-center justify-between">
                <label
                  htmlFor="email"
                  className="block text-sm font-medium leading-6 text-gray-900"
                >
                  Email
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
                {errors.email && <p className="text-red-500 text-sm mt-1">{errors.email}</p>}
              </div>
            </div>
            <div>
              <div className="flex items-center justify-between">
                <label
                  htmlFor="gender"
                  className="block text-sm font-medium leading-6 text-gray-900"
                >
                  Gender
                </label>

              </div>
              <div className="mt-2">
                <input
                  id="gender"
                  name="gender"
                  type="text"
                  value={formData.gender}
                  onChange={handleChange}
                  required=""
                  className="block text-center w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                />
              </div>
            </div>
            <div>
              <div className="flex items-center justify-between">
                <label
                  htmlFor="dateofbirth"
                  className="block text-center text-sm font-medium leading-6 text-gray-900"
                >
                  date of birth
                </label>

              </div>
              <div className="mt-2">
                <input
                  id="dateofbirth"
                  name="dateofbirth"
                  type="date"
                  value={formData.dateofbirth}
                  onChange={handleChange}
                  required=""
                  className="block text-center w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                />
              </div>
            </div>
            <div>
              <div className="flex items-center justify-between">
                <label
                  htmlFor="phone"
                  className="block text-sm font-medium leading-6 text-gray-900"
                >
                  Phone
                </label>

              </div>
              <div className="mt-2">
                <input
                  id="phone"
                  name="phone"
                  type="phone"
                  value={formData.phone}
                  onChange={handleChange}
                  required=""
                  className="block text-center w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                />
                {errors.phone && <p className="text-red-500 text-sm mt-1">{errors.phone}</p>}
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
                {errors.password && <p className="text-red-500 text-sm mt-1">{errors.password}</p>}
              </div>
            </div>
            <div>
              <div className="flex items-center justify-between">
                <label
                  htmlFor="password"
                  className="block text-sm font-medium leading-6 text-gray-900"
                >
                  Confirm Password
                </label>

              </div>
              <div className="mt-2">
                <input
                  id="password"
                  name="confirmPassword"
                  type="password"
                  value={formData.confirmPassword}
                  onChange={handleChange}
                  required=""
                  className="block text-center w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                />
                {errors.confirmPassword && <p className="text-red-500 text-sm mt-1">{errors.confirmPassword}</p>}
              </div>
            </div>

            <div>
              <div className="flex items-center justify-between">
                <label
                  htmlFor="profilecreatedby"
                  className="block text-sm font-medium leading-6 text-gray-900"
                >
                  Terms condition
                </label>

              </div>
              <div className="mt-2">
                <input
                  id="profilecreatedby"
                  name="profilecreatedby"
                  type="checkbox"
                  value={formData.terms_condition}
                  onChange={handleChange}
                  required=""
                  className=" text-gray-900 "
                />
              </div>
            </div>
            <div>
              <button
                type="submit"
                className="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
              >
                SignUp
              </button>
            </div>
          </form>
          
        </div>
      </div>
    </>
  )
}

export default Registration;