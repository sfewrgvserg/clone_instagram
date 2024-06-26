"use client";

import Image from "next/image";
import Link from "next/link";
import axios from "axios";

import { useEffect, useState } from "react";
import { HiDotsHorizontal } from "react-icons/hi";
import { GoHeartFill } from "react-icons/go";
import { TbLocationShare } from "react-icons/tb";
import { MdOutlineModeComment } from "react-icons/md";
import { RiArrowLeftWideFill } from "react-icons/ri";

import Comment from "@/components/Comment";

export default function postInfo({ params }) {
  const [postIn, setPostIn] = useState([]);
  const [isLiked, setIsLiked] = useState([]);
  const [likedPosts, setLikedPosts] = useState([]);
  const [show, setShow] = useState(false);
  const [comments, setComments] = useState([]);

  useEffect(() => {
    const fetchingData = async () => {
      const data = await axios.get(`http://localhost:3001/posts/${params.id}`);
      const like = await axios.get("http://localhost:3001/like");
      const comments = await axios.get(
        `http://localhost:3001/all_comments/${params.id}`
      );
      setComments(comments.data);
      setPostIn(data.data);
      setIsLiked(like.data);
    };
    fetchingData();
  }, []);

  const userId = 4;
  const handleLike = async (item) => {
    try {
      const postId = item.likes[item.likes.length].post_id;
      try {
        await axios.post("http://localhost:3001/like", {
          post_id: postId,
          user_id: userId,
        });

        setLikedPosts([...likedPosts, postId]);
      } catch (error) {
        if (error.response) {
          deleteLike(item.id, isLiked);
        } else {
          console.error("Error liking post:", error);
          // Handle other errors
        }
      }
    } catch (err) {
      const postId = item.id;
      try {
        await axios.post("http://localhost:3001/like", {
          post_id: postId,
          user_id: userId,
        });
        setLikedPosts([...likedPosts, postId]);
      } catch (error) {
        if (error.response) {
          deleteLike(item.id, isLiked);
        } else {
          console.error("Error liking post:", error);
          // Handle other errors
        }
      }
    }
  };

  const deleteLike = async (post_id, item) => {
    try {
      const bb = item.filter(
        (i) => i.user_id === userId && i.post_id === post_id
      );
      await axios.delete(`http://localhost:3001/like/${bb[0].id}`);
    } catch (err) {
      console.log("error for delete like", err.message);
    }
  };

  const handleShow = () => {
    setShow(!show);
  };

  return (
    <div>
      <div className="w-[35rem] m-auto items-center border-2 border-gray-700">
        <div className="flex items-center w-[35rem] justify-between px-5 py-3 ">
          <div className="flex items-center">
            <Link href="/" className="pr-5">
              <RiArrowLeftWideFill size={25} />
            </Link>
            <Image
              className="rounded-full border-2 border-red-800 "
              src={postIn.user?.profile_img}
              width={50}
              height={50}
              alt={`${postIn.user?.fist_name}`}
            />
            <h1 className="text-sm font-medium pl-3">
              {postIn.user?.fist_name} {postIn.user?.last_name}
            </h1>
          </div>
          <HiDotsHorizontal size={15} />
        </div>

        <div>
          <Image
            src={postIn.media_file}
            onDoubleClick={() => handleLike(postIn)}
            width={500}
            height={500}
            className="w-full h-[40rem]"
            alt={`${postIn.user?.fist_name}`}
          />
          <div className="flex space-x-5 px-5 pt-3">
            <div>
              <button onClick={() => handleLike(postIn)}>
                {true ? (
                  <GoHeartFill size={25} color="red" />
                ) : (
                  <GoHeartFill size={25} />
                )}
              </button>
            </div>
            <div className="flex space-x-5">
              <button onClick={() => handleShow()}>
                <MdOutlineModeComment size={25} />
              </button>
              <button>
                <TbLocationShare size={25} />
              </button>
            </div>
          </div>
          <p className="pl-2 ">{postIn.likes?.length} Likes</p>

          <div className="px-3 text-xs text-gray-600 py-5">
            <button
              className="w-full flex justify-start"
              onClick={() => handleShow()}
            >
              <h2>View all {comments.length} comments</h2>
            </button>
          </div>
        </div>

        {show && <Comment params={params} />}
      </div>
    </div>
  );
}
