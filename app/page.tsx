'use client'
import { useEffect, useState } from "react"
import { Article } from "./api/schema"
import Link from "next/link";

export default function Home() {

  const [articles, setArticles] = useState<Article[]>([])
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    try {
      const fetchData = async () => {
        setLoading(true)
        const response = await fetch('/api');
        const data = await response.json()

        setArticles(data as Array<Article>)
        setLoading(false)
      }

      fetchData();
    } catch (error) {
      console.log(error)
    }

  }, []);

  if (loading) {
    return <p>Loading...</p>
  }

  return (
    <main>
      <ul>
        {articles.map((article) => <li key={article.id} className="p-2 m-2 rounded">
          <Link href={`/read/${article.id}`}>
            <div className="text-slate-400 text-sm">by {article.user}</div>
            <div className="text-xl">{article.title}</div>
          </Link>
        </li>)}
      </ul>
    </main>
  )
}
