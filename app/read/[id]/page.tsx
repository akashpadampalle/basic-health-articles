'use client'
import { Article } from '@/app/api/schema';
import React, { useEffect, useState } from 'react';
import  ReactMarkdown from "react-markdown"

interface Props {
  params: { id: string }
}

const ReadArticle: React.FC<Props> = ({ params }) => {

  const [data, setData] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true)
      const response = await fetch(`/api/${params.id}`);
      const article: Article = await response.json();
      setData(article.content);
      setLoading(false)
    }

    fetchData()
  }, [params.id]);

  if(loading) {
    return <p>Loading...</p>
  }

  return (
    <div><ReactMarkdown>{data}</ReactMarkdown></div>
  );
};

export default ReadArticle;