import NewsList from "@/components/news/news-list";
import { getAvailableNewsMonths, getNewsForYear, getNewsForYearAndMonth } from "@/lib/news";
import { getAvailableNewsYears } from "@/lib/news"
import Link from "next/link";

export default function FilteredNewsPage({ params }) {

  let links = getAvailableNewsYears();
  const selectedYear = params.filter?.[0];
  const selectedMonth = params.filter?.[1];

  let filteredNews;
  if (selectedYear && !selectedMonth) {
    filteredNews = getNewsForYear(selectedYear);
    links = getAvailableNewsMonths(selectedYear);
  }

  if (selectedYear && selectedMonth) {
    filteredNews = getNewsForYearAndMonth(selectedYear, selectedMonth);
    links = [];
  }

  let newsContent = <p>No news found for the selected period.</p>
  if (filteredNews && filteredNews.length > 0) { newsContent = <NewsList news={filteredNews} /> }

  if (selectedYear && !getAvailableNewsYears().includes(+selectedYear) || selectedMonth && !getAvailableNewsMonths().includes(+selectedMonth)) {
    throw new Error('Invalid filter.')
  }

  return (
    <>
      <header id="archive-header">
        <nav>
          <ul>
            {links.map(link => <li key={link}><Link href={selectedYear ? `/archive/${selectedYear}/${link}` : `/archive/${link}`}>{link}</Link></li>)}
          </ul>
        </nav>
      </header>
      {newsContent}
    </>
  )
}