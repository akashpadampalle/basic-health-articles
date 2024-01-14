'use client';
import dynamic from 'next/dynamic';
import React, { useLayoutEffect, useState } from 'react';
import { useRouter } from "next/navigation"
import "easymde/dist/easymde.min.css";

const SimpleMdeReact = dynamic(() => import('react-simplemde-editor'), { ssr: false })

const CreateArticle = () => {
    const [content, setContent] = useState("");
    const [title, setTitle] = useState("")
    const [isValid, setIsValid] = useState(false);
    const [user, setUser] = useState("");
    const router = useRouter();

    const handleSubmit = async () => {
        try {
            // submit data to backent
            let article: { title: string, content: string, user?: string } = { title, content };

            if (user) {
                article.user = user;
            }

            const response = await fetch('/api', {
                method: 'POST',
                body: JSON.stringify(article)
            });

            const data = await response.json();

            // clear all states
            setContent("");
            setTitle("")
            // navigate to home page
            router.push('/');

        } catch (error) {
            console.log(error)
        }

    }

    useLayoutEffect(() => {
        if (content && title)
            setIsValid(true)
        else
            setIsValid(false)
    }, [content, title])

    return (
        <>
            <h1>create Article</h1>
            <input type="text" value={user} onChange={(event) => setUser(event.target.value)} placeholder='auther...' className='p-2 border-b outline-none focus:border-b-blue-400' />
            <div className='flex space-x-4 items-center my-2'>
                <input type="text" value={title} onChange={(event) => setTitle(event.target.value)} placeholder='*title...' className='flex-grow p-2 text-xl border-b outline-none focus:border-b-blue-400' />
                <button disabled={!isValid} onClick={handleSubmit} className='rounded bg-green-400 p-2 disabled:bg-slate-400'>create</button>
            </div>
            <SimpleMdeReact placeholder='*content...' value={content} onChange={setContent} />;
        </>
    );
};

export default CreateArticle;