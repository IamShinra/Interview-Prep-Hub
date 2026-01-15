import React, { useState } from 'react'
import FormInput from '../FormInput'
import FormButton from '../FormButton'
import { GoogleIcon } from '../Icon'
import axios from '../../pages/api/axios';
import { useRouter } from 'next/router';
import { useDispatch } from 'react-redux';
import { login } from '../../slices/userSlice';
import { toast } from 'react-toastify';
import Loader from '../Loader';


function LoginCard() {
  const dispatch = useDispatch();
  const router = useRouter();
  const [loading, setloading] = useState(false);
  const [enrollnmentNo, setenrollnmentNo] = useState(210306105104);
  const [password, setpassword] = useState("rutveej");

  const handleLogin = async (e) => {
    setloading(true);
    try {
      await axios.post("/auth/login", {
        enrollnmentNo: enrollnmentNo,
        password: password
      }).then((response) => {
        dispatch(login(response.data.user));
        toast.success("Login Successfull");
        router.push("/dashboard/student");
        setloading(false);
      }).catch((error) => {
        if (error.response) {
          console.log(error.response.data);
          toast.error(error.response.data);
        } else {
          console.error("An error occurred ==>", error);
          toast.error("Something went wrong!");
        }
        setloading(false);
      });
    }
    catch (err) {
      console.log(err);
      toast.error("Something went wrong!");
      setloading(false);
    }
  }

  if (loading) {
    return <Loader />
  }

  return (
    <div className='w-full h-full bg-white rounded-xl drop-shadow-2xl'>
      <div className='p-7'>
        <div>
          <p className="text-center text-2xl font-semibold">Login</p>
          <p className='mt-4 text-gray-500 text-lg max-lg:text-sm'>Welcome back, Simply add your details & continue where you have left!</p>
        </div>
        <div>
          <div className='mt-5'><FormInput label={"Enrollnment No."} type={"number"} placeholder={"Enter your enrollnment here..."} className={"h-10 border-2 rounded-lg p-2 mb-4 focus:outline-orange-400"} required={true} value={enrollnmentNo} onChange={setenrollnmentNo} /></div>
          <div><FormInput label={"Password"} type={"password"} placeholder={"Enter your password here..."} className={"h-10 border-2 rounded-lg p-2 focus:outline-orange-400"} required={true} value={password} onChange={setpassword} /></div>
          <p className='w-max mt-3 text-xs hover:text-blue-600 hover:underline'>Forget Password?</p>
        </div>
        <div className='mt-10'>
          <div className='w-full h-9' onClick={handleLogin}><FormButton text={"Login"} className={"bg-theme-primary rounded-lg text-sm text-white font-normal"} /></div>
          <div className='w-full h-9'><FormButton text={"Sign in with Google"} className={"!bg-gray-100 rounded-lg mt-5 text-sm !text-black font-normal"} logo={<GoogleIcon className={"w-[30px] mr-2"} />} /></div>
          <div className='w-full h-9' onClick={() => router.push("signup")} ><FormButton text={"Sign Up"} className={"!bg-gray-100 mt-5 rounded-lg text-sm !text-theme-primary font-normal"} /></div>
        </div>
      </div>
    </div>
  )
}

export default LoginCard