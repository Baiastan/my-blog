import React, { lazy, Suspense } from "react";

//dynamically importing the Post component
const Post = lazy(() => import("../../components/util-components/Post"));

const DynamicLazyLoad = () => {
  return (
    <div>
      {/* Using Suspense to render fallback while Post is dynamically loading */}
      <Suspense fallback={<div>Loading...</div>}>
        <Post />
      </Suspense>
    </div>
  );
};

export default DynamicLazyLoad;
