import Aside from "@/components/Aside";
import Post from "@/components/Post";
import Follower from "@/components/Follower";
import Loading from "./loading.jsx";

import { Suspense } from "react";

export default function Home() {
  return (
    <main className="flex justify-between">
      <Suspense fallback={<Loading />}>
        <Aside />
        <Suspense fallback={<Loading />}>
          <Post />
        </Suspense>
        <Follower />
      </Suspense>
    </main>
  );
}
