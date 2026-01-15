import React, { useEffect, useState, useRef } from 'react'
import Navigation from '../../../component/Navigation'
import FormInput from '../../../component/FormInput'
import FormTextArea from '../../../component/FormTextArea'
import { EyeIcon, MinusIcon, PlusIcon } from '../../../component/Icon';
import FormButton from '../../../component/FormButton';
import axios from 'axios';
import Loader from '../../../component/Loader';
function DsaQuseationAdd() {

    const [exampleCount, setExampleCount] = useState(1);
    const [showModal, setShowModal] = useState(false);
    const [problem, setProblem] = useState();
    const [loading, setLoading] = useState(true);
    const modalRef = useRef();

    useEffect(() => {
        axios
            .get('data/dsaQuesation.json')
            .then((res) => {
                setProblem(res.data[0]);
                setLoading(false);
            })
            .catch((err) => {
                console.log(err);
            })
    }, [])

    useEffect(() => {
        const closeModal = (e) => {
            console.log(modalRef.current, e.target)
            if(modalRef.current === e.target) {
                setShowModal(false);
            }
        };
        window.addEventListener('click', closeModal);
        return () => window.removeEventListener('click', closeModal);
    });

    if (loading) {
        return (
            <Loader />
        )
    }
    return (
        <div className='w-full h-screen flex'>
            <div className=''>
                <Navigation />
            </div>
            {/* mainBody */}
            <div className='w-full ml-5 mr-10 my-10 overflow-y-scroll no-scrollbar'>
                <FormTextArea label={"Quesation Name"} inputStyle={"h-36"} placeholder={"problem name..."} labelStyle={"!text-base font-semibold"} />
                <FormTextArea label={"Problem Level"} inputStyle={"h-10"} placeholder={"easy, medium or hard"} labelStyle={"!text-base font-semibold"} />
                <FormTextArea label={"Quesation"} inputStyle={"h-36"} placeholder={"problem statement goes here..."} labelStyle={"!text-base font-semibold"} />

                <div className='my-5'>
                    <div className='flex flex-row-reverse justify-between'>
                        <div onClick={(e) => setExampleCount(exampleCount + 1)}>
                            <FormButton text={"Add New Example"} className={"bg-theme-primary p-2 rounded-lg text-base text-white font-bold"} logo={<PlusIcon className={"h-5 mr-2"} />} />
                        </div>
                        <div onClick={(e) => setExampleCount(Math.max(1, exampleCount - 1))}>
                            <FormButton text={"Remove Example"} className={"bg-red-400 p-2 rounded-lg text-base text-white font-bold"} logo={<MinusIcon className={"h-5 mr-2"} />} />
                        </div>
                    </div>
                    <div className='mt-3'>
                        {Array.from({ length: exampleCount }, (_, index) => (
                            <FormTextArea
                                key={index} // Don't forget to specify a unique key for each component
                                label={"Example " + (index + 1)} // Add 1 to index to start from 1
                                inputStyle={"h-36"}
                                placeholder={"Example goes here..."}
                                labelStyle={"!text-base font-semibold"}
                            />
                        ))}
                    </div>
                </div>

                <FormTextArea label={"Constraints"} inputStyle={"h-36"} placeholder={"problem constraints..."} labelStyle={"!text-base font-semibold"} />
                <div className='flex justify-between mb-10 flex-wrap'>
                    <FormTextArea label={"Topic Tags"} inputStyle={"h-20"} placeholder={"topics on which quesation is based"} labelStyle={"!text-base font-semibold"} />
                    <FormTextArea label={"Company Tags"} inputStyle={"h-20"} placeholder={"topics on which quesation is based"} labelStyle={"!text-base font-semibold"} />
                </div>

                <div className='w-1/2 mx-auto' onClick={(e) => setShowModal(true)}>
                    <FormButton text={"Preview"} className={"bg-theme-primary p-2 rounded-lg text-base text-white font-bold"} logo={<EyeIcon className={"h-5 mr-2"} />} />
                </div>
                {showModal && (
                    <>
                        <div
                            className="justify-center h-full items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none"
                            ref={modalRef}
                        >
                            <div className="relative w-auto h-full my-6 mx-auto max-w-3xl">
                                {/*content*/}
                                <div className="border-0 rounded-lg shadow-lg relative flex flex-col w-full bg-white outline-none focus:outline-none">
                                    {/*body*/}
                                    <div className="relative p-6 flex-auto">
                                        <div className='w-full flex-1'>
                                            <div className='mx-5'>
                                                <h1 className='my-5 font-bold text-xl uppercase'>{problem.quesationName}</h1>
                                                <p className='text-base font-medium text-theme-gray'>{problem.quesation}</p>
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
                                    </div>
                                    {/*footer*/}
                                    <div className="flex items-center justify-end p-6 border-t border-solid border-slate-200 rounded-b">
                                        <button
                                            className="text-red-500 background-transparent font-bold uppercase px-6 py-2 text-sm outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                                            type="button"
                                            onClick={() => setShowModal(false)}
                                        >
                                            Close
                                        </button>
                                        <button
                                            className="bg-emerald-500 text-white active:bg-emerald-600 font-bold uppercase text-sm px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                                            type="button"
                                            onClick={() => setShowModal(false)}
                                        >
                                            Save Changes
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="opacity-25 fixed inset-0 z-40 bg-black"></div>
                    </>
                )}
            </div>
        </div>
    )
}

export default DsaQuseationAdd

