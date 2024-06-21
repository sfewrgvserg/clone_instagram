"use client";

import { BsThreeDotsVertical } from "react-icons/bs";
import { GoHeartFill } from "react-icons/go";
import { FaRegCommentAlt } from "react-icons/fa";

import Image from "next/image";
import Link from "next/link";

import axios from "axios";
import { useEffect, useState } from "react";

import styles from "../styles/Post.module.css";

export default function Post() {
  const [post, setPost] = useState([]);
  const [isLiked, setIsLiked] = useState([]);
  const [likedPosts, setLikedPosts] = useState([]);

  useEffect(() => {
    const fetchingData = async () => {
      const data = await axios.get("http://localhost:3001/posts");
      const like = await axios.get("http://localhost:3001/like");
      setPost(data.data);
      setIsLiked(like.data);
    };

    fetchingData();
    console.log(post);
  }, []);

  const calculateTimeDifference = (postDatetime) => {
    // Parse the MySQL datetime string into a JavaScript Date object
    const postDate = new Date(postDatetime);

    // Get the current time in milliseconds
    const now = Date.now();

    // Calculate the difference in milliseconds
    const differenceInMs = now - postDate.getTime();

    // Convert the difference to seconds
    const differenceInSeconds = Math.floor(differenceInMs / 1000);

    // Define thresholds and corresponding text
    const thresholds = [
      { limit: 60, text: "just now" },
      { limit: 3600, text: "a minute ago" }, // Up to 1 hour
      { limit: 3600 * 24, text: (hours) => `${hours} hours ago` }, // Up to 1 day
      { limit: 3600 * 24 * 2, text: "yesterday" }, // 2 days ago
    ];

    // Find the matching threshold
    for (const threshold of thresholds) {
      if (differenceInSeconds < threshold.limit) {
        return threshold.text;
      }
    }

    // Handle cases beyond thresholds (e.g., dates)
    const daysAgo = Math.floor(differenceInMs / (1000 * 60 * 60 * 24));
    return `${daysAgo} days ago`;
  };

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

  const userId = 4;

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

  return (
    <div className="h-screen w-full border-r-2 border-gray-600 overflow-auto no-scrollbar py-16 px-16">
      <div>
        {post.map((item, index) => (
          <div key={index} className="flex flex-col items-center text-xs">
            <div>
              <Link href={`/userPage/${item.user.id}`}>
                <div className="flex justify-between">
                  <div className="flex items-center text-center py-3">
                    <Image
                      src={item.user.profile_img}
                      width={35}
                      height={35}
                      alt="logo user"
                      className={`rounded-full border-2 border-pink-700 ${styles.my_image} `}
                      priority
                    />
                    <div className="px-2">
                      <h2 className="font-bold">
                        {item.user.fist_name} {item.user.last_name}
                      </h2>
                    </div>
                    <h4 className="text-gray-500 max-md:hidden">
                      . {calculateTimeDifference(item.created_datetime)}
                    </h4>
                  </div>

                  <button>
                    <BsThreeDotsVertical />
                  </button>
                </div>
              </Link>

              <div>
                <Link href={`/userPost/${item.id}`}>
                  <Image
                    src={item.media_file}
                    width={500}
                    height={500}
                    alt="logo user"
                    priority
                  />
                </Link>
              </div>

              <div className="flex space-x-4 py-3 leading-4">
                <div>
                  <button onClick={() => handleLike(item)}>
                    {true ? (
                      <GoHeartFill size={25} color="red" />
                    ) : (
                      <GoHeartFill size={25} />
                    )}
                  </button>
                  <p className="pl-2 ">{item.likes.length}</p>
                </div>

                <div>
                  <FaRegCommentAlt size={25} />
                </div>
              </div>

              <div className="p-5">{item.caption}</div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
