import React from 'react'

function Temp() {
  return (
    <div>Temp</div>
  )
}

export default Temp
// import React, { use, useState } from 'react'
// import FormTextArea from '../../../component/FormTextArea'
// import Navigation from '../../../component/Navigation'
// import FormButton from '../../../component/FormButton'
// import { useRouter } from 'next/router';
// import axios from '../../api/axios'
// import { useSelector } from 'react-redux';
// import { selectUser } from '../../../slices/userSlice';

// function createblog() {
//     const router = useRouter();
//     const [title, setTitle] = useState('');
//     const [body, setBody] = useState('');
//     const user = useSelector(selectUser);
//     const handleBlog = () => {
//         const myBlog = {
//             title: title,
//             content: body,
//             author: {
//                 authorEmail: "email",
//                 authorName: "name",
//             },
//         }
//         console.log("from slicer", user);
//         // try {
//         //     console.log("posting blog");
//         //     axios.post('/blog', myBlog)
//         //         .then((res) => {
//         //             console.log(res.data);
//         //             router.push("/section/blog/blogpage");
//         //         })
//         //         .catch((err) => {
//         //             if (err.response) {
//         //                 console.log(err.response.data);
//         //             }
//         //             else {
//         //                 console.error("An error occurred ==>", err);
//         //             }
//         //         })
//         // } catch (err) {
//         //     console.log(err);
//         // }
//     }

//     return (
//         <div className='w-full h-screen flex relative'>
//             <div className=''>
//                 <Navigation />
//             </div>
//             {/* mainBody */}
//             <div className='w-full ml-5 mr-10 my-10 overflow-y-scroll no-scrollbar'>
//                 <FormTextArea label={"BLOG TITLE"} inputStyle={"h-10"} placeholder={"blog title..."} labelStyle={"!text-lg font-semibold"} value={title} onChange={setTitle} />
//                 <FormTextArea label={"BLOG CONTENT"} inputStyle={"h-60"} placeholder={"blog body..."} labelStyle={"!text-lg font-semibold"} value={body} onChange={setBody} />
//             </div>

//             <div className='w-36 h-12 absolute bottom-10 right-10' onClick={handleBlog}>
//                 <FormButton text='POST BLOG' className={"!w-full !bg-theme-primary !text-white !text-lg !font-semibold !rounded-lg !border-2 "} />
//             </div>
//         </div>
//     )
// }

// export default createblog