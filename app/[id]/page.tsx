


export default function Page({ params }: { params: { id: string } }) {

  return <div>Dynamic Route: {params.id}</div>
}