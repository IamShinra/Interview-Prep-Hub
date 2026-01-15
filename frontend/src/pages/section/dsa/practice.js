import React, { useEffect, useState } from 'react';
import Navigation from '../../../component/Navigation';
import Loader from '../../../component/Loader';
import axios from 'axios';
import FormButton from '../../../component/FormButton';
import Solveproblem from './solveproblem';

function Practice() {
    const [problems, setProblems] = useState([]);
    const [loading, setLoading] = useState(true);
    const [tagVisibility, setTabVisibility] = useState(true);
    const [selectedQuesation, setselectedQuesation] = useState(null);
    const [searchTerm, setSearchTerm] = useState(''); // Search state

    useEffect(() => {
        axios
            .get('/data/dsaQuesation.json')
            .then((res) => {
                console.log(res.data);
                setProblems(res.data);
                setLoading(false);
            })
            .catch((err) => {
                console.log(err);
            });
    }, []);

    // Filtered questions based on search term
    const filteredQuestions = problems.filter((problem) =>
        problem.questionName.toLowerCase().includes(searchTerm.toLowerCase())
    );

    if (selectedQuesation) {
        return (
            <div>
                <Solveproblem selectedQuesation={selectedQuesation} setselectedQuesation={setselectedQuesation} />
            </div>
        );
    }

    if (loading) {
        console.log(selectedQuesation)
        return <Loader />;
    }

    return (
        <div className='w-full h-screen flex'>
            <div className=''>
                <Navigation />
            </div>
            {/* mainBody */}
            <div className='w-full ml-5 mr-10 my-10 overflow-y-scroll no-scrollbar'>
                <div className="w-full p-4 bg-white border border-gray-200 rounded-lg shadow sm:p-8 dark:bg-gray-800 dark:border-gray-700">
                    <div className="flex items-center justify-between mb-8">
                        <h5 className="text-4xl font-bold leading-none text-gray-900 dark:text-white">Famous DSA Questions</h5>
                        <a className="text-base font-medium text-blue-600 dark:text-blue-500 hover:cursor-pointer" onClick={() => setTabVisibility(!tagVisibility)}>
                            {tagVisibility ? "Hide Tags" : "View Tags"}
                        </a>
                    </div>

                    {/* Search Bar */}
                    <div className="mb-6">
                        <input
                            type="text"
                            placeholder="Search by question name..."
                            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring focus:border-blue-300"
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)} // Update search term
                        />
                    </div>

                    <div className="flow-root">
                        <ul role="list" className="divide-y divide-gray-200 dark:divide-gray-700">
                            {filteredQuestions.map((problem, index) => (
                                <li key={index} className="py-3 sm:py-4">
                                    <div className="flex items-center justify-between">
                                        <div className="flex flex-1 justify-between flex-shrink-0 ms-4">
                                            <p className="text-xl font-medium text-gray-900 truncate dark:text-white text-wrap">
                                                {problem.questionName}
                                            </p>

                                            {tagVisibility && (
                                                <div className='mr-10'>
                                                    {problem.topicTags.map((topic, i) => (
                                                        <p className="text-base text-end text-theme-gray truncate dark:text-gray-400 text-wrap" key={i}>
                                                            {topic}
                                                        </p>
                                                    ))}
                                                </div>
                                            )}
                                        </div>

                                        <div>
                                            <div className='w-full h-9' onClick={() =>  setselectedQuesation(problem)}>
                                                <FormButton text={"Solve"} className={"bg-theme-primary rounded-lg text-sm text-white font-normal py-4 px-10"} />
                                            </div>
                                        </div>
                                    </div>
                                </li>
                            ))}
                        </ul>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Practice;
