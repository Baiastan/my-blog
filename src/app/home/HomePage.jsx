import React from "react";

import Image from "next/image";

import Block from "../components/common/block/Block";
import PostCard from "../components/common/post-card/PostCard";
import Header from "../components/common/header/Header";

import photo from "../assets/profile-photo.JPG";

import styles from "./HomePage.module.scss";
import AllBlogsAnchor from "../frontend-blog/components/all-blogs-anchor/AllBlogsAnchor";

const HomePage = () => {
  return (
    <Block>
      <PostCard align="center">
        <AllBlogsAnchor className={styles.allBlogsAnchor} inline />
        <Header size="xl">Hey, Welcome! My name is Baiastan Zhuzupbekov and I am a frontend developer!</Header>
        <div className={styles.profilePhoto}>
          <Image src={photo} alt="Profile Photo" width={400} height={400} />
        </div>
        <p>
          Hello and welcome! My name is Baiastan, and this blog is a space where I dive deep into the world of front-end
          engineering. Whether you're a seasoned developer or just starting out, I'm glad you're here. This blog is not
          only a platform for me to expand my own knowledge of front-end technologies but also a place to share
          insights, tutorials, and resources that might be helpful to you on your learning journey.
        </p>
        <p>
          Front-end development is a constantly evolving field, with new tools and techniques emerging all the time.
          Here, I'll be focusing on core technologies like React, Next.js, JavaScript, HTML, and CSS—staples in building
          modern, responsive, and interactive web applications. These are the tools that power the user interfaces we
          interact with every day, making our digital experiences seamless and engaging.
        </p>
        <p>
          This website will also serve as my personal playground, where I experiment with various new tools and
          implement new features as I learn and grow. It's important to note that this isn't a space to evaluate my
          professional skills but rather a creative outlet to explore and share ideas.
        </p>
        <p>
          My goal with this blog is to break down complex concepts, provide practical tips, and share real-world
          examples that can help us all become better front-end engineers. Whether you're looking to refine your skills,
          learn something new, or get inspired for your next project, I hope you'll find value in the content I share.
        </p>
        <p>
          Beyond front-end engineering, this blog is also a place for me to share my thoughts on a range of topics that
          interest me. While front-end development will be a central theme, I will keep everything organized, ensuring
          you can easily find content that resonates with your interests.
        </p>
      </PostCard>
    </Block>
  );
};

export default HomePage;
