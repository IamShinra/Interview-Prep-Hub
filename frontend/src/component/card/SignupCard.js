import React, { useState } from 'react'
import FormInput from '../FormInput';
import FormButton from '../FormButton';
import { GoogleIcon } from '../Icon';
import axios from '../../pages/api/axios';
import { useRouter } from 'next/router';
import { toast } from 'react-toastify';


function SignupCard() {
  const [name, setname] = useState();
  const [enrollnmentNo, setenrollnmentNo] = useState();
  const [password, setpassword] = useState();
  const [email, setemail] = useState();
  const router = useRouter();

  const handleSubmit = async () => {
    try {
      await axios.post("/auth/signup", { name, enrollnmentNo, password, email })
        .then((res) => {
          console.log("successfull logined");
          toast.success("Signup Successfull");
          router.push("/dashboard/student");
        }).catch((err) => {
          console.log(err);
          if (err.response) {
            console.log(err.response.data);
            toast.error(err.response.data);
          } else {
            console.error("An error occurred ==>", err);
            toast.error("Something went wrong!");
          }
        })
    } catch (err) {
      console.log(err);
      toast.error("Something went wrong!");
    }
  }

  return (
    <div className='w-full h-full bg-white rounded-xl drop-shadow-2xl'>
      <div className='p-7'>
        <div>
          <p className="text-center text-2xl font-semibold">SignUp</p>
        </div>
        <div>
          <div className='mt-5'><FormInput label={"User Name"} type={"text"} placeholder={"Enter your name here..."} className={"h-10 border-2 rounded-lg p-2 mb-4 focus:outline-orange-400"} required={true} value={name} onChange={setname} /></div>
          <div><FormInput label={"Enrollnment No."} type={"number"} placeholder={"Enter your enrollnment here..."} className={"h-10 border-2 rounded-lg p-2 mb-4 focus:outline-orange-400"} required={true} value={enrollnmentNo} onChange={setenrollnmentNo} /></div>
          <div><FormInput label={"Email"} type={"text"} placeholder={"Enter your Email here..."} className={"h-10 border-2 rounded-lg p-2 mb-4 focus:outline-orange-400"} required={true} value={email} onChange={setemail} /></div>
          <div><FormInput label={"Password"} type={"password"} placeholder={"Enter your password here..."} className={"h-10 border-2 rounded-lg p-2 focus:outline-orange-400"} required={true} value={password} onChange={setpassword} /></div>
          <p className='w-max mt-3 text-xs hover:text-blue-600 hover:underline'>Forget Password?</p>
        </div>
        <div className='mt-10'>
          <div className='w-full h-9' onClick={handleSubmit}><FormButton text={"Sign Up"} className={"bg-theme-primary rounded-lg text-sm text-white font-normal"} /></div>
          <div className='w-full h-9'><FormButton text={"Sign in with Google"} className={"bg-gray-100 rounded-lg mt-5 text-sm font-normal"} logo={<GoogleIcon className={"w-[30px] mr-2"} />} /></div>
        </div>
      </div>
    </div>
  )
}

export default SignupCard