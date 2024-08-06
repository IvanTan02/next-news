import NewsList from "@/components/news/news-list";
import { getAvailableNewsMonths, getNewsForYear, getNewsForYearAndMonth } from "@/lib/news";
import { getAvailableNewsYears } from "@/lib/news"
import Link from "next/link";
import { Suspense } from "react";

async function FilteredNews({ year, month }) {
  let news;

  if (year && !month) {
    news = await getNewsForYear(year);
  } else if (year && month) {
    news = await getNewsForYearAndMonth(year, month);
  }

  let newsContent = <p>No news found for the selected period.</p>
  if (news && news.length > 0) { newsContent = <NewsList news={news} /> }
  return newsContent;
}

async function FilterHeader({ year, month }) {
  const availableYears = await getAvailableNewsYears();
  let links = availableYears;

  if ((year && !availableYears.includes(year)) || (month && !getAvailableNewsMonths(year).includes(month))) {
    throw new Error('Invalid filter.')
  }

  if (year && !month) {
    links = getAvailableNewsMonths(year);
  }

  if (year && month) {
    links = [];
  }

  return <header id="archive-header">
    <nav>
      <ul>
        {links.map(link => <li key={link}><Link href={year ? `/archive/${year}/${link}` : `/archive/${link}`}>{link}</Link></li>)}
      </ul>
    </nav>
  </header>
}

export default async function FilteredNewsPage({ params }) {

  const selectedYear = params.filter?.[0];
  const selectedMonth = params.filter?.[1];

  return (
    <>
      <Suspense fallback={<p>Loading Filter...</p>}>
        <FilterHeader year={selectedYear} month={selectedMonth} />
      </Suspense>
      <Suspense fallback={<p>Loading...</p>}>
        <FilteredNews year={selectedYear} month={selectedMonth} />
      </Suspense>
    </>
  )
}