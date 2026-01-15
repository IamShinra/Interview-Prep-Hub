import React, { useEffect, useState } from 'react';
import Navigation from '../../../component/Navigation';
import { PlusIcon } from '../../../component/Icon';
import FormButton from '../../../component/FormButton';
import axios from '../../api/axios';
import { useRouter } from 'next/router';
import Blogpage from './blogpage';
import { useSelector } from 'react-redux';
import { selectUser } from '../../../slices/userSlice';
import { toast } from 'react-toastify';

function Index() {
    const router = useRouter();
    const [activeTab, setActiveTab] = useState('All Blogs');
    const [allBlogs, setAllBlogs] = useState([]);
    const [myBlogs, setMyBlogs] = useState([]);
    const [showBlog, setShowBlog] = useState(null);
    const [searchTerm, setSearchTerm] = useState(''); // Search state
    const user = useSelector(selectUser);

    // Fetch all blogs
    const getAllBlogs = async () => {
        try {
            const res = await axios.get('/blog');
            setAllBlogs(res.data);
            setMyBlogs(res.data.filter(blog => blog.author.authorEmail === user.email));
        } catch (err) {
            if (err.response) {
                console.log(err.response.data);
            } else {
                console.log("An error occurred ==> ", err);
            }
        }
    };

    const handleDeleteBlog = async (blogId) => {
        try {
            const res = await axios.delete(`/blog/${blogId}`, {
                data: { email: user.email } // Send logged-in user's email to verify if they are the owner
            });
            if (res.status === 200) {
                toast.success('Blog deleted successfully');
                // Update blog list after deletion
                setMyBlogs(myBlogs.filter(blog => blog._id !== blogId));
                setAllBlogs(allBlogs.filter(blog => blog._id !== blogId));
            }
        } catch (err) {
            if (err.response) {
                toast.error(err.response.data.message); 
            } else {
                toast.error('An error occurred');
            }
        }
    };

    useEffect(() => {
        // Redirect if user is not logged in
        if (!user) {
            router.push("/login");
        } else {
            getAllBlogs(); // Fetch blogs only if user is logged in
        }
    }, [user]);

    // Filter blogs based on search term
    const filteredAllBlogs = allBlogs.filter(blog =>
        blog.title.toLowerCase().includes(searchTerm.toLowerCase())
    );
    const filteredMyBlogs = myBlogs.filter(blog =>
        blog.title.toLowerCase().includes(searchTerm.toLowerCase())
    );

    // Show individual blog
    if (showBlog) {
        return (
            <div>
                <button onClick={() => setShowBlog(null)} className="my-4 px-4 py-2 ml-4 bg-gray-300 rounded-lg">Back to Blogs</button>
                <Blogpage blog={showBlog} setBlog={setShowBlog} />
            </div>
        );
    }

    return (
        <div className="w-full h-screen flex">
            {/* Navigation */}
            <div>
                <Navigation />
            </div>

            {/* Main Body */}
            <div className="w-full ml-5 mr-10 my-10 overflow-y-scroll no-scrollbar relative">
                {/* Tabs */}
                <div className="w-full flex space-x-5">
                    <div onClick={() => setActiveTab('All Blogs')} className="w-full h-10">
                        <FormButton text={"All Blogs"} className={`${activeTab === "All Blogs" ? "!w-full !bg-theme-primary !text-white !font-bold !rounded-lg" : "!w-full !bg-[#EEECFF] !text-black !font-bold !rounded-lg"}`} />
                    </div>
                    <div onClick={() => setActiveTab('My Blogs')} className="w-full h-10">
                        <FormButton text={"My Blogs"} className={`${activeTab === "My Blogs" ? "!w-full !bg-theme-primary !text-white !font-bold !rounded-lg" : "!w-full !bg-[#EEECFF] !text-black !font-bold !rounded-lg"}`} />
                    </div>
                </div>

                {/* Search Bar */}
                <div className="my-4">
                    <input
                        type="text"
                        placeholder="Search by blog title..."
                        className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring focus:border-blue-300"
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)} // Update search term
                    />
                </div>

                {/* Create Blog Button */}
                <div className="w-36 h-10 fixed bottom-16 right-16" onClick={() => router.push("/section/blog/createblog")}>
                    <FormButton text="Create Blog" className={"!w-full !bg-theme-primary !text-white !font-semibold !rounded-lg !border-2"} logo={<PlusIcon className="w-4 stroke-2 mr-1" />} />
                </div>

                {/* Blog List - All Blogs */}
                {activeTab === 'All Blogs' && (
                    <div className="w-full h-full mt-10">
                        {filteredAllBlogs.map((blog, index) => (
                            <div className="flex items-center my-5 border-b-2 p-3 hover:bg-gray-100 cursor-pointer" key={index} onClick={() => setShowBlog(blog)}>
                                <div className="flex-shrink-0 h-10 w-10">
                                    <img className="h-10 w-10 rounded-full" src="https://i.pravatar.cc/150?img=1" alt="" />
                                </div>
                                <div className="ml-4">
                                    <div className="text-lg font-medium text-gray-900">
                                        {blog.title}
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                )}

                {/* Blog List - My Blogs */}
                {activeTab === 'My Blogs' && (
                    <div className="w-full h-full mt-10">
                        {filteredMyBlogs.map((blog, index) => (
                            <div className="flex justify-between items-center my-5 border-b-2 p-3 hover:bg-gray-100 cursor-pointer" key={index}>
                                <div onClick={() => setShowBlog(blog)} className="text-lg font-medium text-gray-900">
                                    {blog.title}
                                </div>
                                <div className="flex space-x-2">
                                    <button onClick={() => handleDeleteBlog(blog._id)} className="text-red-500 hover:text-red-700">Delete</button>
                                </div>
                            </div>
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
}

export default Index;
