import {User} from "./useContext/user";
import UseMemoExample from "./useMemo/page";
import {Useref} from "./useRef/page";

export default function Home() {
  return (
    <div className="p-10">
     <User/>
     <UseMemoExample/>
      <Useref/>
    </div>
  );
}
