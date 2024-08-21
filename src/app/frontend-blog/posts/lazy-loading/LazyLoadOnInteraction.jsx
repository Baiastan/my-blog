"use client";
import React, { useState } from "react";
import Header from "@/app/components/common/header/Header";

const LazyLoadOnInteraction = () => {
  const [Post, setPost] = useState(null);

  const handleClick = () => {
    import("../../components/util-components/Post").then((module) => {
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
