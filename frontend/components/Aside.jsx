import { IoHomeOutline } from "react-icons/io5";
import { IoSearch } from "react-icons/io5";
import { TiHeartOutline } from "react-icons/ti";
import { LuBadgePlus } from "react-icons/lu";
import { TbLogout } from "react-icons/tb";
import AdminProfileFile from "./AdminProfile";

export default function Aside() {
  return (
    <aside className="h-screen w-[17rem] border-r-2 border-gray-600">
      <div className="pl-5 py-5 flex flex-col h-full">
        <div>
          <h1>Instagram</h1>
        </div>
        <div>
          <div className="py-5">
            <div className="flex items-center space-x-3 py-5 px-3 w-full hover:rounded-xl duration-100 hover:bg-stone-700/30 cursor-pointer">
              <IoHomeOutline />
              <button>Home</button>
            </div>
            <div className="flex items-center space-x-3 py-5 px-3 w-full hover:rounded-xl duration-100 hover:bg-stone-700/30 cursor-pointer">
              <IoSearch />
              <button>Search</button>
            </div>
            <div className="flex items-center space-x-3 py-5 px-3 w-full hover:rounded-xl duration-100 hover:bg-stone-700/30 cursor-pointer">
              <TiHeartOutline />
              <button>Notifications</button>
            </div>
            <div className="flex items-center space-x-3 py-5 px-3 w-full hover:rounded-xl duration-100 hover:bg-stone-700/30 cursor-pointer">
              <LuBadgePlus />
              <button>Create</button>
            </div>
            <div className="flex items-center space-x-3 py-5 px-3 w-full hover:rounded-xl duration-100 hover:bg-stone-700/30 cursor-pointer">
              <AdminProfileFile />
              <button>Profile</button>
            </div>
          </div>
        </div>
        <div className="h-full flex items-end">
          <div className="flex items-center space-x-3 py-5 px-3 w-full hover:rounded-xl duration-100 hover:bg-stone-700/30 cursor-pointer">
            <TbLogout />
            <button>Logout</button>
          </div>
        </div>
      </div>
    </aside>
  );
}
