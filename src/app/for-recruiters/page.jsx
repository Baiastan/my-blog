"use client";
import React, { useEffect, useState } from "react";
import Block from "../components/common/block/Block";
import Header from "../components/common/header/Header";
import PostCard from "../components/common/post-card/PostCard";

import styles from "./page.module.scss";
import { usePostReadableStream } from "../hooks/usePostReadableStream";

const ForRecruiters = () => {
  const [jobDesc, setJobDesc] = useState("");
  const [disabled, setDisabled] = useState(true);
  const [apiUrl, setApiUrl] = useState("");

  const { stream, error, handleClick: handleAskAiClick } = usePostReadableStream(apiUrl, jobDesc);

  useEffect(() => {
    if (jobDesc.trim().length !== 0) {
      setDisabled(false);
    } else {
      setDisabled(true);
    }
  }, [jobDesc]);

  useEffect(() => {
    const envApiUrl =
      process.env.NODE_ENV === "development" ? process.env.NEXT_PUBLIC_DEV_API : process.env.NEXT_PUBLIC_PROD_API;

    setApiUrl(envApiUrl);
  }, []);

  return (
    <Block el="section">
      <PostCard el="div">
        <label htmlFor="job-description">
          <Header color="red">Paste your job description below:</Header>
        </label>
        <textarea
          id="job-description"
          rows={20}
          className={styles.textArea}
          value={jobDesc}
          onChange={(e) => setJobDesc(e.target.value)}
        />
        <div>
          <button onClick={handleAskAiClick} disabled={disabled}>
            Ask My AI Assistant
          </button>
        </div>
      </PostCard>
      <PostCard>
        <div style={{ whiteSpace: "pre-wrap" }} className={styles.aiResponseContainer}>
          {stream}
          {error && <p>{error}</p>}
        </div>
      </PostCard>
    </Block>
  );
};

export default ForRecruiters;
