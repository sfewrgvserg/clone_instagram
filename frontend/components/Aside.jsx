import { IoHomeOutline } from "react-icons/io5";
import { IoSearch } from "react-icons/io5";
import { TiHeartOutline } from "react-icons/ti";
import { LuBadgePlus } from "react-icons/lu";
import { TbLogout } from "react-icons/tb";
// import AdminProfileFile from "./AdminProfile";

import Link from "next/link";
import Image from "next/image";

export default function Aside() {
  return (
    <aside>
      <div className="h-screen w-[15rem] border-r-2 border-gray-600 max-lg:hidden max-xl:w-[10rem]">
        <div className="p-5 flex flex-col h-full">
          <div>
            <h1 className="flex w-full justify-center items-center">
              <Link href="/">
                <Image
                  src="/image/main_logo/logo_font_instagram.webp"
                  height={65}
                  width={100}
                />
              </Link>
            </h1>
          </div>
          <div>
            <div className="py-5">
              <div className="flex items-center space-x-3 py-5 px-3 w-full hover:rounded-xl duration-100 hover:bg-stone-700/30 cursor-pointer">
                <IoHomeOutline className="max-xl:text-xl max-xl:w-full" />
                <button className="max-xl:hidden">Home</button>
              </div>
              <div className="flex items-center  space-x-3 py-5 px-3 w-full hover:rounded-xl duration-100 hover:bg-stone-700/30 cursor-pointer">
                <IoSearch className="max-xl:text-xl max-xl:w-full" />
                <button className="max-xl:hidden">Search</button>
              </div>
              <div className="flex items-center  space-x-3 py-5 px-3 w-full hover:rounded-xl duration-100 hover:bg-stone-700/30 cursor-pointer">
                <TiHeartOutline className="max-xl:text-xl max-xl:w-full" />
                <button className="max-xl:hidden">Notifications</button>
              </div>
              <div className="flex items-center  space-x-3 py-5 px-3 w-full hover:rounded-xl duration-100 hover:bg-stone-700/30 cursor-pointer">
                <LuBadgePlus className="max-xl:text-xl max-xl:w-full" />
                <button className="max-xl:hidden">Create</button>
              </div>
              {/* <div className="flex items-center  space-x-3 py-5 px-3 w-full hover:rounded-xl duration-100 hover:bg-stone-700/30 cursor-pointer">
              <AdminProfileFile className="max-xl:text-xl max-xl:w-full" />
              <button className="max-xl:hidden">Profile</button>
            </div> */}
            </div>
          </div>
          <div className="h-full flex items-end">
            <div className="flex items-center  space-x-3 py-5 px-3 w-full hover:rounded-xl duration-100 hover:bg-stone-700/30 cursor-pointer">
              <TbLogout className="max-xl:text-xl max-xl:w-full" />
              <button className="max-xl:hidden">Logout</button>
            </div>
          </div>
        </div>
      </div>

      {/* ////////////////////////////////////////////////////////////////////////////////////////////// */}

      <aside className="lg:hidden">
        <div className="h-[5rem] w-screen flex fixed bottom-0 border-r-2 border-gray-600 ">
          <div className="flex justify-center bg-stone-500/75 w-full">
            <div className="flex justify-center space-x-16 items-center">
              <div className="">
                <IoHomeOutline className="text-lg w-full" />
              </div>
              <div className=" ">
                <IoSearch className="text-lg w-full" />
              </div>
              <div className=" ">
                <TiHeartOutline className="text-lg w-full" />
              </div>
              <div className=" ">
                <LuBadgePlus className="text-lg w-full" />
              </div>
            </div>
          </div>
        </div>
      </aside>
    </aside>
  );
}
