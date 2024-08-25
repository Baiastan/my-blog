import React from "react";
import DynamicLazyLoad from "./DynamicLazyLoad";
import PostCard from "@/app/components/common/post-card/PostCard";
import CodeSnippet from "@/app/components/common/code-snippet/CodeSnippet";
import Header from "@/app/components/common/header/Header";
import { fetchPostDetails } from "../../fetch-api/fetch-post-utils";
import HTMLParser from "@/app/components/common/html-parser/HTMLParser";
import LazyLoadOnInteraction from "./LazyLoadOnInteraction";
import LazyIntersectionObserver from "./LazyLoadOnIntersection";
import AllBlogsAnchor from "../../components/all-blogs-anchor/AllBlogsAnchor";
import PostHeader from "@/app/components/common/header/PostHeader";
import PostLayout from "../PostLayout";

const LazyLoad = async () => {
  const post = await fetchPostDetails("lazy-load");

  return (
    <PostLayout>
      <PostHeader>{post["post-title"]}</PostHeader>
      <PostCard el="article">
        <HTMLParser>{post.text}</HTMLParser>
      </PostCard>
      <PostCard>
        <Header size="l">1. {post.title}</Header>

        <CodeSnippet>
          {`import React, { lazy, Suspense } from "react";
import Header from "@/app/components/common/header/Header";

//dynamically importing the Post component
const Post = lazy(() => import("../../components/util-components/Post"));

const DynamicLazyLoad = () => {
  return (
    <div>
      {/* Using Suspense to render fallback while Post is dynamically loading */}
      <Header color="red">Dynamic Lazy Load</Header>
      <Suspense fallback={<div>Loading...</div>}>
        <Post />
      </Suspense>
    </div>
  );
};

export default DynamicLazyLoad;`}
        </CodeSnippet>

        <DynamicLazyLoad />
      </PostCard>
      <PostCard>
        <Header>2. Lazy Load On Interaction</Header>

        <CodeSnippet>
          {`
import React, { useState } from "react";
import Header from "@/app/components/common/header/Header";

const LazyLoadOnInteraction = () => {
  const [Post, setPost] = useState(null);

  const handleClick = () => {
    import("../../util-components/Post").then((module) => {
      setPost(() => module.default);
    });
  };

  return (
    <div>
      <Header color="red"> Lazy Loading on Interaction </Header>
      {Post ? <Post /> : <button onClick={handleClick}>Load Post</button>}
    </div>
  );
};

export default LazyLoadOnInteraction;
          `}
        </CodeSnippet>

        <LazyLoadOnInteraction />
      </PostCard>
      <PostCard>
        <Header>3. Lazy Loading with Intersection Observer</Header>

        <CodeSnippet>
          {`
import React, { useState, useRef, lazy, Suspense } from "react";
import useIntersectionObserver from "../../hooks/useIntersectionObserver";
import Header from "@/app/components/common/header/Header";

const Post = lazy(() => import("../../components/util-components/Post"));

const LazyIntersectionObserver = () => {
  const [shouldRenderPost, setShouldRenderPost] = useState(false);

  const postRef = useRef(null);

  const handleIntersect = ([entry]) => {
    if (entry.isIntersecting) {
      setTimeout(() => {
        setShouldRenderPost(true);
      }, 1000); //setTimeout is only for loading effect - dont use in production
    }
  };

  useIntersectionObserver(postRef, handleIntersect, { treshhold: 0 });

  return (
    <div>
      <Header color="red">Lazy Loading with the Intersection Observer</Header>
      <div style={{ height: "500px" }}>Some Content before the post</div>
      <div ref={postRef}>
        {shouldRenderPost ? (
          <Suspense fallback={<div>Loading Suspense ...</div>}>
            <Post />
          </Suspense>
        ) : (
          <div>Loading...</div>
        )}
      </div>
      <div style={{ height: "500px" }}>Some Content after the post</div>
    </div>
  );
};

export default LazyIntersectionObserver;
`}
        </CodeSnippet>
        <Header>useIntersectionObserver implementation</Header>
        <CodeSnippet>{`import { useEffect } from "react";

const useIntersectionObserver = (ref, callback, options) => {
  useEffect(() => {
    const observer = new IntersectionObserver((entries) => {
      callback(entries);
    }, options);

    const element = ref.current;
    if (element) {
      observer.observe(element);
    }

    return () => {
      if (element) {
        observer.unobserve(element);
      }
    };
  }, [ref, callback, options]);
};

export default useIntersectionObserver;`}</CodeSnippet>

        <LazyIntersectionObserver />
      </PostCard>
      <PostCard>
        <Header>4. Route-Based Lazy Loading</Header>

        <p>
          When using React Router, you can lazy load components associated with specific routes. This ensures that only
          the components necessary for the current route are loaded, reducing the initial bundle size.
        </p>

        <CodeSnippet>{`import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import React, { Suspense } from 'react';

const Home = React.lazy(() => import('./Home'));
const About = React.lazy(() => import('./About'));

function App() {
  return (
    <Router>
      <Suspense fallback={<div>Loading...</div>}>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
        </Routes>
      </Suspense>
    </Router>
  );
}`}</CodeSnippet>
      </PostCard>
      <PostCard>
        <Header>5. Image Lazy Loading</Header>
        <p>
          {`Native HTML Loading Attribute: The simplest method for lazy loading images is to use the loading="lazy" attribute on the '<img>' tag. This instructs the browser to delay loading the image until it’s in or near the viewport.`}
        </p>
        <CodeSnippet>{`<img src="image.jpg" alt="Example" loading="lazy" />`}</CodeSnippet>
      </PostCard>
      <PostCard el="div">
        <Header>Useful resources on Lazy Load</Header>
        <a href="https://react.dev/reference/react/lazy" className="link-to-resources" target="_blank">
          React docs: Lazy Load
        </a>
      </PostCard>
    </PostLayout>
  );
};

export default LazyLoad;
