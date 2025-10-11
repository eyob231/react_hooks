import {User} from "./useContext/user";
import UseMemoExample from "./useMemo/page";
import {Useref} from "./useRef/page";
import Pagination from "./pagination/page";
import  Link from "next/link";


export default function Home() {
  return (
    <div className="p-10">
     <User/>
     <UseMemoExample/>
      <Useref/>
      <Pagination/>
      <button className="mt-5 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600">
        Click Me
      </button>
     <Link href="/1">Go to Dynamic Route with id 1</Link> 
      <Link href="/2">Go to Dynamic Route with id 2</Link>
      <Link href="/3">Go to Dynamic Route with id 3</Link>
      <Link href="/4">Go to Dynamic Route with id 4</Link>
      <Link href="/5">Go to Dynamic Route with id 5</Link>

    </div>
  );
}
