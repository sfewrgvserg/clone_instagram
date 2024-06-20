"use client";

import styles from "@/styles/Comment.module.css";
import { useEffect, useState } from "react";
import { IoCloseSharp } from "react-icons/io5";

import Image from "next/image";

import { Suspense } from "react";
import Loading from "@/app/loading";
import axios from "axios";

export default function Comment({ params }) {
  const [show, setShow] = useState(true);
  const [data, setData] = useState([]);
  const [value, setValue] = useState("");

  const handleShow = () => {
    setShow(false);
  };

  useEffect(() => {
    const fetchingData = async () => {
      const ID = params.id;
      const commentLinst = await axios.get(
        `http://localhost:3001/all_comments/${ID}`
      );
      if (commentLinst) {
        console.log(commentLinst.data);
        setData(commentLinst.data);
      } else {
        setData([]);
      }
    };
    fetchingData();
  }, []);

  const calculateTimeDifference = (commentTime) => {
    // Parse the MySQL datetime string into a JavaScript Date object
    const postDate = new Date(commentTime);

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
  const user_id = 4;

  const handleEnter = async (event) => {
    if (event.key === "Enter") {
      setValue(event.target.value);
      await axios.post("http://localhost:3001/all_comments", {
        created_by_user_id: user_id,
        post_id: params.id,
        comment_entered: event.target.value,
      });
    }
  };

  return (
    <div>
      {show && (
        <div className={styles.box}>
          <div className="overflow-auto fixed top-[15rem] w-[35rem] no-scrollbar bg-black text-purple-100 h-full border-2 border-gray-700 rounded-t-2xl">
            <div className="flex justify-between items-center w-7/12 ml-auto py-5 pr-3">
              <h3 className="font-bold text-xl">Comment</h3>
              <button onClick={() => handleShow()}>
                <IoCloseSharp size={25} />
              </button>
            </div>
            <Suspense fallback={<Loading />}>
              <div className="px-5 pb-6 text-sm">
                <div>
                  {data.length === 0 ? (
                    <div className="text-center text-sm py-5">
                      <h2>Sorry Dude You Don't Have Any Comment</h2>
                    </div>
                  ) : (
                    data.map((item, index) => (
                      <div key={index}>
                        {/* <div className="flex flex-col space-y-2" key={index}> */}
                        <div className="">
                          {/* <div className="flex items-center space-x-3"> */}
                          <div className="flex items-center space-x-3 text-xs py-3">
                            <Image
                              src={item.user.profile_img}
                              height={40}
                              width={40}
                              className="rounded-full"
                            />
                            <h3>{item.user.fist_name}</h3>
                            <p>
                              {calculateTimeDifference(item.created_datetime)}
                            </p>
                          </div>

                          <div>
                            <p>{item.comment}</p>
                          </div>
                        </div>
                      </div>
                    ))
                  )}
                </div>

                <div className="fixed flex items-center space-x-5 bottom-5 w-[32rem]">
                  <div>
                    <Image
                      src="/image/user_logo/admin.jpg"
                      width={50}
                      height={50}
                      className="rounded-full"
                    />
                  </div>
                  <input
                    onKeyDown={(event) => {
                      handleEnter(event);
                    }}
                    type="text"
                    placeholder="Add a comment as user1"
                    className="py-3 px-2 rounded-full outline-none w-full text-white bg-stone-700 font-medium text-sm"
                  />
                </div>
              </div>
            </Suspense>
          </div>
        </div>
      )}
    </div>
  );
}
