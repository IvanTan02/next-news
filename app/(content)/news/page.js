
import NewsList from "@/components/news/news-list";
import { getAllNews } from "@/lib/news";

export default async function NewsPage() {

  const news = await getAllNews();

  return (
    <>
      <header>
        <h1>News Page</h1>
      </header>
      <main>
        <NewsList news={news} />
      </main>
    </>
  )
}