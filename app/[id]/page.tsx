// ...existing code...
import Link from 'next/link';
export default function Page({ params }: { params: { id: string } }) {
 return(
  <>
  <Link href={`/${params.id}/string`}>new</Link>
  <div>Dynamic Page ID: {params.id}</div>
  <Link href={`/${params.id}/number`}>Go to Number 123</Link>
  </>
 )}