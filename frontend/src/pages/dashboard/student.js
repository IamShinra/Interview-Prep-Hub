import React, { use, useEffect } from 'react'
import Navigation from '../../component/Navigation'
import PieChart from '../../component/chart/Piechart.js'
import Timestamp from 'react-timestamp'
import dynamic from 'next/dynamic'
import TodoApp from '../../component/toDoSection/TodoApp'
import FriendsPanal from '../../component/FriendsPanal'
import { useDispatch, useSelector } from 'react-redux'
import axios from '../api/axios'
import { login, selectUser } from '../../slices/userSlice.js'

const CountdownTimer = dynamic(() => import('../../component/CountdownTimer'), { ssr: false }) // switching off server side rendering for this component

function StudentDashboard() {
  const myDate = new Date();
  const user = useSelector(selectUser);
  const dispatch = useDispatch();

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const response = await axios.get(`/findUserByEnrollment/${user.enrollnmentNo}`);
        // console.log('User data:', response.data);
        dispatch(login(response.data)); // Assuming the response data is what the login action expects
      } catch (error) {
        console.error('Error fetching user data:', error);
      }
    };

    if (user?.enrollnmentNo) {
      fetchUserData();
    }
  }, [user?.enrollnmentNo, dispatch]);

  return (
    <div className='w-full h-screen flex'>
      <div className=''>
        <Navigation />
      </div>
      {/* mainBody */}
      <div className='w-full ml-5 mr-10 my-10 overflow-y-scroll no-scrollbar'>
        <div className='flex flex-col'>
          <div className='flex space-x-20 items-center'>

            {/* overview */}
            <div>
              <p className='text-2xl font-semibold'>Overview</p>
              <div className='flex flex-col justify-between flex-wrap ml-5'>
                <div className='flex space-x-5'>
                  <div className='w-[250px] h-[100px] bg-white rounded-xl drop-shadow-2xl mt-5'>
                    <div className='p-5'>
                      <p className='text-lg font-semibold'>Total Questions Solved</p>
                      <p className='text-4xl font-bold text-end'>10</p>
                    </div>
                  </div>
                  <div className='w-[250px] h-[100px] bg-white rounded-xl drop-shadow-2xl mt-5'>
                    <div className='p-5'>
                      <p className='text-lg font-semibold'>Highest Streak</p>
                      <p className='text-4xl font-bold text-end'>10</p>
                    </div>
                  </div>
                </div>
                <div className='w-full flex justify-center space-x-5'>
                  <div className='w-[250px] h-[100px] bg-white rounded-xl drop-shadow-2xl mt-5'>
                    <div className='p-2'>
                      <p className='text-xs capitalize font-semibold text-red-300'>TIME REMAINING FOR ON-CAMPUS</p>
                      <CountdownTimer />
                    </div>
                  </div>
                  <div className='w-[250px] h-[100px] bg-white rounded-xl drop-shadow-2xl mt-5'>
                    <div className='p-5'>
                      <p className='text-lg font-semibold'>Total Rating</p>
                      <p className='text-4xl font-bold text-end'>500</p>
                    </div>
                  </div>
                </div>

              </div>

            </div>

            {/* currentStreak */}
            <div className='w-full flex items-center overflow-hidden justify-between '>
              <div className='w-[300px] h-[100px] bg-white rounded-xl drop-shadow-2xl ml-4 mr-8'>
                <div className='p-5'>
                  <p className='text-lg font-semibold text-theme-primary'>Upcoming Contest</p>
                  <p className='text-4xl font-bold text-end'>Start</p>
                </div>
              </div>
              <PieChart />
            </div>
          </div>

          <div className='flex space-x-10 mt-20'>
            {/* task manager */}
            <div className='flex-1'>
              <p className='text-2xl font-semibold'>Today's Task</p>
              <div className='w-full'>
                <TodoApp />
              </div>
            </div>
            {/* friends section */}
            <div className='flex-1'>
              <p className='text-2xl font-semibold'>Friends</p>
              <div className='h-72 mt-3'>
                <FriendsPanal />
              </div>

            </div>

          </div>
        </div>
      </div>
    </div>
  )
}

export default StudentDashboard

