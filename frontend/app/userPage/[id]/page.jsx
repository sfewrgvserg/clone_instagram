"use client";

import axios from "axios";
import { useEffect, useState } from "react";
import Image from "next/image";

import { BsList } from "react-icons/bs";
import { CgMenuGridR } from "react-icons/cg";
import { RiArrowLeftWideFill } from "react-icons/ri";
import { PiBellSimpleRingingBold } from "react-icons/pi";

import Link from "next/link";

export default function userPage({ params }) {
  const [dataPost, setDataPost] = useState([]);

  useEffect(() => {
    const fetchingData = async () => {
      const userData = await axios.get(
        `http://localhost:3001/all_users/${params.id}`
      );
      setDataPost(userData.data);
    };
    fetchingData();
  }, []);

  return (
    <div>
      <div className="w-screen h-screen flex justify-center items-center ">
        <div>
          <div className="flex items-center space-x-3">
            <Link href="/">
              <RiArrowLeftWideFill size={25} />
            </Link>
            <h1 className="text-xl font-bold">
              {dataPost.fist_name} {dataPost.last_name}
            </h1>
          </div>

          <div className="flex flex-col items-center justify-center ">
            <Image
              src={dataPost.profile_img}
              width={100}
              height={100}
              className="rounded-full"
            />

            <div className="flex space-x-7 text-sm text-center py-3">
              <div>
                <h2>{dataPost.posts && dataPost.posts.length}</h2>
                <h2>Posts</h2>
              </div>
              <div>
                <h2>0</h2>
                <h2>Followers</h2>
              </div>
              <div>
                <h2>0</h2>
                <h2>Following</h2>
              </div>
            </div>

            <div className="space-y-5 text-sm">
              <div>
                <h2>
                  {dataPost.fist_name} {dataPost.last_name}
                </h2>
                <h4>I'm a Singer</h4>
              </div>

              <div className="space-x-5 grid grid-cols-10 gap-1 pb-3">
                <button className="col-span-4 py-3 px-2 rounded-md bg-sky-500 hover:bg-sky-300 hover:text-stone-800 hover:font-bold duration-150">
                  Follow
                </button>
                <button className="col-span-4 py-3 px-2 rounded-md bg-stone-700 hover:bg-stone-300 hover:text-stone-800 hover:font-bold duration-150">
                  Message
                </button>
                <button className="col-span-2 py-3 px-2 rounded-md bg-white text-black hover:bg-slate-800 hover:text-white duration-150">
                  <PiBellSimpleRingingBold size={25} />
                </button>
              </div>

              <div className="flex justify-center space-x-10 pb-5">
                <button>
                  <BsList size={45} />
                </button>
                <button>
                  <CgMenuGridR size={45} />
                </button>
              </div>
            </div>

            <div>
              <div className="mb-5 grid grid-cols-3 gap-4">
                {dataPost.posts &&
                  dataPost.posts.map((post) => (
                    <div key={post.id} className="">
                      <Link href={`/userPost/${post.id}`}>
                        <Image
                          className="h-[15rem]"
                          src={`${post.media_file}`}
                          width={200}
                          height={250}
                          alt={`${dataPost.fist_name} ${dataPost.last_name}'s post`}
                        />
                      </Link>
                    </div>
                  ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
