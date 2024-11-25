import  { useCallback, useEffect, useState } from 'react'
import SIgnIn from './SIgnIn'
import SignUp from './SignUp';
import { useAtom } from 'jotai';
import { userDataAtom } from '../../store/store';
import { getUserInfo } from '../../utilities';
import { INFO_URL } from '../../constant';
import { useNavigate } from 'react-router';

const Auth = () => {
    const [isShow,setIsShow]=useState(false);
    const [userData,setUserData]=useAtom(userDataAtom);
    const navigate=useNavigate()
    const toogleFuction=()=>{
        setIsShow(!isShow)
    }
    const fetchUserInfo = useCallback(() => {
      getUserInfo(INFO_URL, setUserData, navigate);
    }, [setUserData, navigate]);
    
    useEffect(() => {
      fetchUserInfo();
    }, [fetchUserInfo])
 

  
    console.log(userData)
  return (
    <div className='min-h-screen  bg-gradient-to-r from-purple-500 to-blue-600 p-6'>
     <h1 className=" text-xl font-bold font-mono text-white  text-center mt-5"> Welcome to Job Finder!</h1>

     <div>
        {
            isShow?(<SIgnIn toogleFuction={toogleFuction} setUserData={setUserData}/>):(<SignUp toogleFuction={toogleFuction} setUserData={setUserData}/>)
        }
        
     </div>
    </div>
  )
}

export default Auth