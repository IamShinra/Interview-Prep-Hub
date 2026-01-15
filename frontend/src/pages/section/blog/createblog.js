// blog writeing page

import React, { useRef, useState } from "react";
import { Editor } from "@tinymce/tinymce-react";
import axios from '../../api/axios';
import { useSelector } from "react-redux";
import { selectUser } from "../../../slices/userSlice";
import FormInput from "../../../component/FormInput";
import FormButton from "../../../component/FormButton";
import { useRouter } from "next/router";
import { toast } from "react-toastify";

function CreateBlog() {
  const editorRef = useRef(null);
  const [title, settitle] = useState("");
  const user = useSelector(selectUser);
  const router = useRouter();
  
  const handleSubmit = async () => {
    let blogData = "";
    if (editorRef.current) {
      blogData = editorRef.current.getContent();
    }
    if(!user) {
      router.push("/login");
    }
    try {
      await axios.post("/blog/", { title: title, content: blogData, author: { authorEmail: user.email, authorName: user.name } })
        .then((res) => {
          console.log("successfull blog posted");
          toast.success("Blog posted successfully");
        }
        ).catch((err) => {
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
    settitle("");
    editorRef.current.setContent("");

  };
  return (
    <>
      <div className="m-10">
        <div className='mt-5'>
          <h2 className="font-medium text-xl w-full text-center">BLOG TITLE</h2>
          <FormInput label={""} type={"text"} placeholder={"Blog title"} className={"h-10 border-2 rounded-lg p-2 mb-4 focus:outline-orange-400"} required={true} value={title} onChange={settitle} />
        </div>
        <Editor
          apiKey="vqb6fv782zqefc6nwsh8c86k7fnap4wl0hoypnmgs5xzf0a2"
          onInit={(evt, editor) => (editorRef.current = editor)}
          placeholder="Write your blog here..."
          initialValue=""
          init={{
            height: 500,
            menubar: false,
            plugins: [
              "advlist",
              "autolink",
              "lists",
              "link",
              "image",
              "charmap",
              "preview",
              "anchor",
              "searchreplace",
              "visualblocks",
              "code",
              "fullscreen",
              "insertdatetime",
              "media",
              "table",
              "code",
              "help",
              "wordcount",
            ],
            toolbar:
              "undo redo | blocks | " +
              "bold italic forecolor | alignleft aligncenter " +
              "alignright alignjustify | bullist numlist outdent indent | " +
              "removeformat | help",
            content_style:
              "body { font-family:Helvetica,Arial,sans-serif; font-size:14px }",
          }}
        />
        <div className="w-full flex justify-end">
          <div className='w-48 h-9 mt-3' onClick={handleSubmit}><FormButton text={"Submit"} className={"bg-theme-primary rounded-lg text-sm text-white font-normal"} /></div>
        </div>
      </div>
    </>
  )
}

export default CreateBlog