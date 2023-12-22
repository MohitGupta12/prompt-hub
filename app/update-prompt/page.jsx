"use client"

import { useState, useEffect } from 'react';
import { useRouter, useSearchParams } from 'next/navigation'

import Form from "@components/Form"

const EditPrompt = () => {
    const searchParams = useSearchParams();
    const prompt_id = searchParams.get('id');
    const router = useRouter();
    const [submitting, setSubmitting] = useState(false)
    const [post, setPost] = useState({
        prompt:"",
        tag:""
    });

    useEffect(() => {

        const getPromptDetails = async () =>{
            const response = await fetch(`/api/prompt/${prompt_id}`)
            const data = await response.json();

            setPost({
                prompt:data.prompt,
                tag:data.tag
            })
        }
        if(prompt_id) getPromptDetails();
    }, [prompt_id]);

    const editPrompt = async (e) =>{
        e.preventDefault();
        setSubmitting(true);
        if(!prompt_id) return alert("Prompt ID not found")
        try {
            const response = await fetch(`/api/prompt/${prompt_id}`,{
                method:'PATCH',
                body:JSON.stringify({
                    prompt:post.prompt,
                    tag:post.tag
                })
            })
            if(response.ok){
                router.push("/");
            }
        } catch (error) {
            console.log(error);
        }finally{
            setSubmitting(false);
        }
    }
    return (
        <Form
            type = "Edit"
            post={post}
            setPost={setPost}
            submitting={submitting}
            handleSubmit={editPrompt}
        />
    )
}

export default EditPrompt