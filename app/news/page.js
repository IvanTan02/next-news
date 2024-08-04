import NewsItem from "@/components/news/news-item";
import Link from "next/link";
import { DUMMY_NEWS } from "@/dummy-news";
import NewsList from "@/components/news/news-list";

export default function NewsPage() {
  return (
    <>
      <header>
        <h1>News Page</h1>
      </header>
      <main>
        <NewsList news={DUMMY_NEWS} />
      </main>
    </>
  )
}