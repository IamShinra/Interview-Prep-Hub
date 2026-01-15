import React, { useEffect } from 'react'
import Login from './login/index.js'
import Blogpage from './section/blog/index.js'
import Compiler from '../component/compiler.js'
import Solveproblem from './section/dsa/solveproblem'
import DsaQuseationAdd from './teacher/QuesationAdd/dsaQuseationAdd'
import StudentDashboard from './dashboard/student.js'
import { selectUser } from '../slices/userSlice.js'
import { useSelector } from 'react-redux'
import { useRouter } from 'next/router';
import Loader from '../component/Loader.js'
import Appointments from './section/appointments/index.js'
import Practice from './section/dsa/practice.js'

function Index() {
  const user = useSelector(selectUser);
  const router = useRouter();

  if(!user) {
    return <Login />
  }

  return (
    <div>
      <StudentDashboard />
    </div>
  )
}

export default Index
