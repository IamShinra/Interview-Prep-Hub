import axios from 'axios';
import React, { useEffect, useState } from 'react'
import FormButton from './FormButton';
import { UpIcon } from './Icon';
import Loader from './Loader';

function Compiler() {

  const [code, setCode] = useState('');
  const [input, setInput] = useState('');
  const [output, setOutput] = useState('');
  const [lang, setLang] = useState('c++');
  const [customInput, setCustomInput] = useState(false);
  const [langList, setLangList] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    console.log("submitting your code");
    e.preventDefault();
    setLoading(true);
    const myCode = code;
    const myLang = lang === "c++" ? "cpp" : lang === "python" ? "py" : lang === "C" ? "c" : "java";

    // console.log(myCode, myLang, input);
    await axios.post("https://api.codex.jaagrav.in", {
      "code": myCode,
      "language": myLang,
      "input": input,
    })
      .then((res) => {
        console.log("output =>", res.data);
        setCustomInput(false);
        setOutput(res.data.output);
        if(res.data.error) {
          setOutput(res.data.error);
        }
      })
      .catch((err) => {
        console.log("error => ", err)
      })
    setLoading(false);
  }

  useEffect(() => {
    // Add a click event listener to the document body to close langList
    const handleDocumentClick = (e) => {
      if (e.target.id !== "languageList") {
        setLangList(false);
      }

    };

    // Attach the click event listener
    document.body.addEventListener('click', handleDocumentClick);

    // Cleanup the event listener when the component unmounts
    return () => {
      document.body.removeEventListener('click', handleDocumentClick);
    };
  }, [langList]);

  return (
    <>
      {loading ? (
        <Loader />
      ) : (
        <div className='w-full h-screen flex flex-col'>
          <div className='w-full flex-1'>
            <div className='w-full h-full relative'>
              <textarea id="code" name="code" onChange={(e) => setCode(e.target.value)} placeholder='Enter code here...' className='w-full h-full bg-black text-white resize-none p-2' spellCheck="false" value={code}>
              </textarea>
              <div className='absolute right-5 min-w-[100px] min-h-[30px] bottom-5 flex justify-center items-center bg-white font-bold' id='languageList' onClick={(e) => setLangList(true)}>
                {langList &&
                  <div className=''>
                    <p className='p-1 border-2 border-black text-center' onClick={() => { setLang('java'); setLangList(false) }}>java</p>
                    <p className='p-1 border-2 border-t-0 border-black text-center' onClick={() => { setLang('c++'); setLangList(false) }}>c++</p>
                    <p className='p-1 border-2 border-t-0 border-black text-center' onClick={() => { setLang('python'); setLangList(false) }}>python</p>
                    <p className='p-1 border-2 border-t-0 border-black text-center' onClick={() => { setLang('C'); setLangList(false) }}>C</p>
                  </div>
                }
                {!langList && <p className='flex items-center justify-center gap-x-1' id='languageList' onClick={(e) => setLangList(true)}>{lang} <span id='languageList' onClick={(e) => setLangList(true)}><UpIcon className={"w-4"} /></span></p>}
              </div>
            </div>
          </div>

          {/* EEECFF */}
          {/* E6F7FF */}


          <div className='w-full flex-[0.3] flex'>
            <div className='w-full h-full flex-1'>
              <div className='w-full h-full flex flex-col'>

                <div className='flex-1 mt-3'>

                  {!customInput &&
                    <textarea id="output" name="output" placeholder='Your output' value={output} className='w-full h-full placeholder:text-black font-semibold text-black border-2 border-black focus:outline-none cursor-default resize-none p-2' readOnly>
                    </textarea>
                  }

                  {customInput &&
                    <textarea id="code" name="code" onChange={(e) => setInput(e.target.value)} placeholder='Input goes here...' className='w-full h-full placeholder:text-black text-black border-2 border-black focus:outline-none resize-none p-2 font-medium' spellCheck="false">
                    </textarea>
                  }

                </div>

                <div className='w-[40%] h-8 flex flex-[0.3] my-2'>
                  <div className='flex-[0.8]' onClick={() => setCustomInput(false)}>
                    <FormButton text={"output"} className={`${!customInput ? "!w-full !bg-theme-primary !text-white !font-bold !rounded-full" : "!w-full !bg-[#EEECFF] !text-black !font-bold rounded-full"}`} />
                  </div>
                  <div className='flex-1 ml-2' onClick={() => setCustomInput(true)}>
                    <FormButton text={"custom input"} className={`${customInput ? "!w-full !bg-theme-primary !text-white !font-bold !rounded-full" : "!w-full !bg-[#EEECFF] !text-black !font-bold !rounded-full"}`} />
                  </div>
                </div>

              </div>
            </div>

            <div className='w-full h-full flex flex-col flex-[0.5] justify-center'>
              <div className='h-11 mx-5 border-2 border-theme-primary rounded-full' onClick={handleSubmit}>
                <FormButton text={"RUN"} className={"!bg-[#EEECFF] !text-black !font-bold !rounded-full"} />
              </div>
              <div className='m-5 h-11'>
                <FormButton text={"SUBMIT"} className={"w-full bg-theme-primary text-white !font-bold !rounded-full"} />
              </div>
            </div>
          </div>
          {/* <button onClick={handleSubmit}>Submit</button>
      <button onClick={handleSubmit}>Submit</button> */}
        </div>
      )}
    </>
  )
}

export default Compiler