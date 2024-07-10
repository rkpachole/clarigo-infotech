import React, { useEffect, useState } from 'react'
import {useNavigate } from 'react-router-dom';
import { BASE_URL } from '../constants/Index';
import axios from 'axios';
import Headers from '../components/Header';
import { Sidebar, Menu, MenuItem, SubMenu } from 'react-pro-sidebar';
const Dashboard = () => {
  const navigate = useNavigate();
  var accessToken = localStorage.getItem("accessToken");
  const[dataList,setDataList]= useState([]);

  const handleLogout =()=>{
    localStorage.removeItem("accessToken");
    localStorage.removeItem("email");
    localStorage.removeItem("otp");
    navigate("/")
  }

  useEffect(()=>{
    if(accessToken){
      navigate("/dashboard")
    
    }else{
      navigate("/signin")
    }
  },[])

  useEffect(() => {
   fetchdata();
}, []);


const fetchdata =()=>{
  const requestOptions = {
    method: 'POST',
    headers: { 'Content-Type': 'application/json','X-Access-Token': accessToken },  
};
fetch(`${BASE_URL}/getUser`, requestOptions)
    .then(response => response.json())
    .then(data => setDataList(data.data ));

}

console.log(dataList.ID);

  return (
    <div className=''>
     
    <div className="flex w-full items-start bg-black-900 p-5">
    <Sidebar>
  <Menu>
    <SubMenu label="Charts">
      <MenuItem className='bg-black'>{dataList && dataList.Name}</MenuItem>
      <MenuItem> {dataList && dataList.Age} </MenuItem>
    </SubMenu>
    <MenuItem> {dataList.ConfirmEmail} </MenuItem>
    <MenuItem>  {dataList &&  dataList.ID} </MenuItem>
  </Menu>
</Sidebar>
      <div className='flex flex-1 items-center justify-center self-center rounded-[-300] bg-white-a700_01md:flex-col'>
        <div className='flex w-[52%] felx-col gap=[50px] md:w-full p-5'>
          <div className=''><div className='flex flex-col gap-[46px]'><div className='flex items-start sm-flex-col'><div className='flex w-full flex-col items-start self-startsm-full'>
          <button onClick={handleLogout} className='bg-teal-400 border-spacing-0 p-2 mb-3'>Logout</button>
            </div></div></div>
        </div>
      </div>
    {/* <a href="#" class="block px-4 py-2 text-sm text-gray-700" role="menuitem" tabindex="-1" id="user-menu-item-0">Your Profile</a> */}
      {/* <div className=' bg-white shadow-2xl border-rounded h-[200px] ..."'> */}
</div>
      
  
     
</div>
</div>
  )
}

export default Dashboard