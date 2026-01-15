import React, { useEffect, useState } from 'react'
import Compiler from '../../../component/compiler';
import Loader from '../../../component/Loader';


function Solveproblem({ selectedQuesation, setSelectedQuesation }) {
  const [problem, setProblem] = useState(selectedQuesation);
  const [loading, setLoading] = useState(false);

  if (!problem) {
    // If problem is undefined, show a loader or a fallback message
    return <div><Loader /></div>;
  }
  
  return (
    <div className='w-full h-screen flex'>
      <div className='w-full flex-1'>
        <div className='mx-5'>
          <button onClick={() => setSelectedQuesation(null)} className="mt-4 px-4 py-2 ml-4 bg-gray-300 rounded-lg sticky top-">Back to Blogs</button>
          <h1 className='mt-4 mb-5 font-bold text-xl uppercase'>{problem.questionName}</h1>
          <p className='text-base font-medium text-theme-gray'>{problem.question}</p>
          <h1 className='my-5 font-semibold text-lg uppercase'>Sample Testcases:</h1>
          {/* {console.log(problem.examples)} */}
          {problem.examples.map((testcase, index) => {
            return (
              <div key={index} className='my-2 border-2 border-black p-2'>
                <h1 className='font-semibold uppercase'>Input:</h1>
                <p className='text-base font-medium text-theme-gray'>{testcase.input}</p>
                <h1 className='font-semibold uppercase'>Output:</h1>
                <p className='text-base font-medium text-theme-gray'>{testcase.output}</p>
                <h1 className='font-semibold uppercase'>Explanation:</h1>
                <p className='text-base font-medium text-theme-gray'>{testcase.explanation}</p>
              </div>
            )
          })}
          <div>
            <h1 className='my-5 font-semibold text-lg uppercase'>Constraints:</h1>
            <p className='text-base font-medium text-theme-gray'>{problem.constraints[0]}</p>
            <p className='text-base font-medium text-theme-gray'>{problem.constraints[1]}</p>
          </div>
          <div>
            <h1></h1>
          </div>
        </div>
      </div>
      <div className='w-full flex-1'>
        <Compiler />
      </div>
    </div>
  )
}

export default Solveproblem