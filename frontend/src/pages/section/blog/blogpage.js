import React, { use, useEffect, useState } from 'react'
import { useRouter } from 'next/router';
import axios from '../../api/axios'
import { TrashIcon } from '../../../component/Icon';
import DOMPurify from 'dompurify';
import { useSelector } from 'react-redux';
import { selectUser } from '../../../slices/userSlice';
import { toast } from 'react-toastify';
import Loader from '../../../component/Loader';

function Blogpage({ blog, setBlog }) {
    const router = useRouter();
    const [comment, setComment] = useState('');
    const user = useSelector(selectUser);

    useEffect(() => {
        if (!user) {
            router.push("/login");
        }
    }, [blog]);

    if (!blog) {
        return <div><Loader />;</div>
    }
    const handlePostComment = async () => {
        let commentData = {
            name: user.name,
            comment: comment,
            profilePic: user.profilePic || "https://flowbite.com/docs/images/people/profile-picture-2.jpg",
            enrollnmentNo: user.enrollnmentNo,
            email: user.email,
            date: new Date().toISOString() // Ensure the date is a string in ISO format
        }
        try {
            await axios.post(`/blog/comment/${blog._id}`, commentData)
                .then((res) => {
                    setComment('');
                    toast.success("Comment posted successfully");
                    setBlog({ ...blog, comments: [...blog.comments, commentData] });
                })
                .catch((err) => {
                    if (err.response) {
                        console.log(err.response.data);
                    }
                    else {
                        console.error("An error occurred ==>", err);
                    }
                })
        } catch (err) {
            console.log(err);
        }
    }

    const handleDeleteComment = (comment) => {
        const commentToDelete = comment;
        try {
            axios.delete(`/blog/comment/${blog._id}`, {
                data: { commentId: comment._id }
            })
                .then((res) => {
                    const updatedComments = blog.comments.filter(comment => comment._id !== commentToDelete._id);
                    setBlog({ ...blog, comments: updatedComments });
                    toast.success("Comment deleted successfully");
                })
                .catch((err) => {
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

    const sanitizedContent = DOMPurify.sanitize(blog.content);

    return (
        <div>
            <main className="pt-8 pb-16 lg:pt-16 lg:pb-24 bg-white dark:bg-gray-900 antialiased">
                <div className="flex justify-between px-4 mx-auto max-w-screen-xl ">
                    <article className="mx-auto w-full max-w-2xl format format-sm sm:format-base lg:format-lg format-blue dark:format-invert">
                        <header className="mb-4 lg:mb-6 not-format">
                            <address className="flex items-center mb-6 not-italic">
                                <div className="inline-flex items-center mr-3 text-sm text-gray-900 dark:text-white">
                                    <img className="mr-4 w-16 h-16 rounded-full" src="https://flowbite.com/docs/images/people/profile-picture-2.jpg" alt="Jese Leos" />
                                    <div>
                                        <a href="#" rel="author" className="text-xl font-bold text-gray-900 dark:text-white">{blog.author.authorName}</a>
                                        <p className="text-base text-gray-500 dark:text-gray-400">{blog.author.authorEmail}</p>
                                        <p className="text-base text-gray-500 dark:text-gray-400">
                                            <time pubdate="true" dateTime={blog.date} title={new Date(blog.date).toLocaleDateString()}>
                                                {new Date(blog.date).toLocaleDateString()}
                                            </time>
                                        </p>
                                    </div>
                                </div>
                            </address>
                            <h1 className="mb-4 text-3xl font-extrabold leading-tight text-gray-900 lg:mb-6 lg:text-4xl dark:text-white">{blog.title}</h1>
                        </header>

                        <div className='mb-5' dangerouslySetInnerHTML={{ __html: sanitizedContent }} />

                        <div className="not-format">
                            <div className="flex justify-between items-center mb-6">
                                <h2 className="text-lg lg:text-2xl font-bold text-gray-900 dark:text-white">Discussion {blog.comments.length}</h2>
                            </div>
                            <div className="mb-6">
                                <div className="p-2 mb-4 bg-white rounded-lg rounded-t-lg border border-gray-200 dark:bg-gray-800 dark:border-gray-700">
                                    <textarea id="comment" rows="6" value={comment} onChange={(e) => setComment(e.target.value)}
                                        className="px-0 h-20 w-full text-sm text-gray-900 outline-none dark:text-white dark:placeholder-gray-400 resize-none"
                                        placeholder="Write a comment..." required></textarea>
                                </div>
                                <button type="submit" onClick={handlePostComment}
                                    className="inline-flex items-center py-2.5 px-4 text-xs font-medium text-center text-white bg-primary-700 rounded-lg focus:ring-4 focus:ring-primary-200 dark:focus:ring-primary-900 bg-theme-primary">
                                    Post comment
                                </button>
                            </div>

                            {blog.comments.map((comment, index) => (
                                <div className="p-6 mb-6 text-base bg-white rounded-lg dark:bg-gray-900" key={index}>
                                    <div className="flex justify-between items-center mb-2">
                                        <div className="flex items-center">
                                            <p className="inline-flex items-center mr-3 font-semibold text-sm text-gray-900 dark:text-white">
                                                <img className="mr-2 w-6 h-6 rounded-full" src="https://flowbite.com/docs/images/people/profile-picture-2.jpg" alt="Commenter" />
                                                {comment.name}
                                            </p>
                                            <p className="text-sm text-gray-600 dark:text-gray-400">
                                                <time pubdate dateTime={comment.date} title={new Date(comment.date).toLocaleDateString()}>
                                                    {new Date(comment.date).toLocaleDateString()}
                                                </time>
                                            </p>
                                        </div>
                                        <button id="dropdownComment1Button" data-dropdown-toggle="dropdownComment1"
                                            className="inline-flex items-center p-2 text-sm font-medium text-center text-gray-500 bg-white rounded-lg hover:bg-gray-100 focus:ring-4 focus:outline-none focus:ring-gray-50 dark:text-gray-400 dark:bg-gray-900 dark:hover:bg-gray-700 dark:focus:ring-gray-600"
                                            type="button">
                                            {comment.enrollnmentNo === user.enrollnmentNo ? <div className='w-5 h-5' onClick={() => handleDeleteComment(comment)}><TrashIcon /></div> : "Report"}
                                        </button>
                                    </div>
                                    <p>
                                        {comment.comment}
                                    </p>
                                </div>
                            ))}
                        </div>
                    </article>
                </div>
            </main>
        </div>
    )
}

export default Blogpage;
