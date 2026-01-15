import mongoose from 'mongoose';

const blogPostSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
    },
    content: {
        type: String,
        required: true,
    },
    author: {
        authorEmail: {
            type: String,
            required: true,
        },
        authorName: {
            type: String,
        },
    },
    date: {
        type: Date,
        default: Date.now,
    },
    likes: {
        type: Number,
        default: 0,
    },
    comments: [
        {
            name: String,
            comment: {
                type: String,
                required: [true, "empty comment123 not allowed"],
            },
            profilePic: String,
            enrollnmentNo: Number,
            email: String,
            date: {
                type: Date,
                default: Date.now
            }
        }
    ]
})

const BlogPost = mongoose.model('blogposts', blogPostSchema);

export default BlogPost;