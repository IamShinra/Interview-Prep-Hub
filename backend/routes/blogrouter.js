import express from 'express';
import mongoose from 'mongoose';
import BlogPost from "../models/blogpost.js"

const blogRouter = express.Router();

const createBlog = async (req, res) => {
    console.log("creating blog");
    const blogData = req.body;
    console.log(blogData);
    try {
        const data = await BlogPost.create(blogData);
        if (data) {
            res.status(200).send("Post created");
        } else {
            res.status(500).send("Post not created");
        }
    } catch (err) {
        console.log(err);
        res.status(500).send("Connection error");
    }
};

const getAllBlog = async (req, res) => {
    console.log("getting all blog");
    try {
        console.log("get all post");
        const posts = await BlogPost.find();
        if (posts) {
            res.status(200).send(posts);
        } else {
            res.status(500).send("posts not found")
        }

    } catch (err) {
        res.status(500).send("Connection error");
    }
};

const deleteBlog = async (req, res) => {
    const blogId = req.params.id;
    const userEmail = req.body.email; // Make sure to send the logged-in user's email with the request

    try {
        const blog = await BlogPost.findById(blogId);

        // Check if the logged-in user is the author of the blog
        if (blog.author.authorEmail === userEmail) {
            await BlogPost.findByIdAndDelete(blogId);
            return res.status(200).json({ message: "Blog deleted successfully" });
        } else {
            return res.status(403).json({ message: "Unauthorized to delete this blog" });
        }
    } catch (err) {
        return res.status(500).json({ error: "Server error" });
    }
}

const postComment = async (req, res) => {
    console.log("posting comment");
    const commentData = req.body;
    const blogId = req.params.id;
    try {
        const blog = await BlogPost.findById(blogId);
        if (blog) {
            blog.comments.push(commentData);
            const data = await blog.save().catch((err) => {
                console.log(err)
                res.status(500).send("Invalid comment")
            });
            if (data) {
                res.status(200).send(data);
            }
        } else {
            res.status(500).send("Blog not found");
        }
    } catch (err) {
        res.status(500).send("Connection error");
    }
};

const deleteComment = async (req, res) => {
    console.log("deleting comment");
    const commentId = req.body.commentId;
    const blogId = req.params.id;

    try {
        const blog = await BlogPost.findById(blogId);
        if (blog) {
            blog.comments.pull(commentId);
            const data = await blog.save().catch((err) => {
                res.status(500).send("Comment not deleted");
            });
            if (data) {
                res.status(200).send("Comment deleted");
            }
        } else {
            res.send(500).send("Blog not found");
        }
    } catch (err) {
        res.status(500).send("Connection error");
    }
};

blogRouter.route('/')
    .get(getAllBlog)
    .post(createBlog)

blogRouter.route('/:id')
    .delete(deleteBlog);

blogRouter.route('/comment/:id')
    .post(postComment)
    .delete(deleteComment);

export default blogRouter;