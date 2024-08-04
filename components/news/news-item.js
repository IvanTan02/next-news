import Link from "next/link";

export default function NewsItem({ id }) {
  return (
    <p><Link href={`news/${id}`}>News Item - {id}</Link></p>
  )
}