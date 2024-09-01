"use client";
import React, { useEffect, useState } from "react";
import Block from "../components/common/block/Block";
import Header from "../components/common/header/Header";
import PostCard from "../components/common/post-card/PostCard";

import styles from "./page.module.scss";
import { usePostReadableStream } from "../hooks/usePostReadableStream";
import { AI_RESUME_JD_ENDPOINT, RESUME_JD_ANALYSIS_ENDPOINT } from "../data/end-points/local-server-enpoints";
import { usePostRequest } from "../hooks/usePostRequest";

const ForRecruiters = () => {
  const [jobDesc, setJobDesc] = useState("");

  const {
    stream,
    error,
    handleClick: handleAskAiClick,
    disableAfterFirstResponse: disabled,
    isLoading,
  } = usePostReadableStream(AI_RESUME_JD_ENDPOINT, jobDesc, setJobDesc);

  const { response, handleClick: makeRequest } = usePostRequest(RESUME_JD_ANALYSIS_ENDPOINT, jobDesc);

  const handleAIClick = async () => {
    makeRequest();
  };

  console.log(response);

  return (
    <Block el="section">
      <PostCard>
        <button>Request my resume</button>
      </PostCard>
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
        <button onClick={handleAIClick} disabled={disabled}>
          Ask My AI Assistant
        </button>
      </PostCard>
      <PostCard>
        <div style={{ whiteSpace: "pre-wrap" }} className={styles.aiResponseContainer}>
          {isLoading ? <div>Typing...</div> : null}
          {stream}
          {error && <p>{error}</p>}
        </div>
      </PostCard>
    </Block>
  );
};

export default ForRecruiters;
