"use client";
import React, { useEffect, useState } from "react";
import Block from "../components/common/block/Block";
import Header from "../components/common/header/Header";
import PostCard from "../components/common/post-card/PostCard";

import styles from "./page.module.scss";
import { usePostReadableStream } from "../hooks/usePostReadableStream";
import { AI_RESUME_JD_ENDPOINT, RESUME_JD_ANALYSIS_ENDPOINT } from "../data/end-points/local-server-enpoints";
import { usePostRequest } from "../hooks/usePostRequest";
import Skills from "./components/Skills";
import UploadResume from "./components/UploadResume";

const ForEmployers = () => {
  const [jobDesc, setJobDesc] = useState("");
  const [showResume, setShowResume] = useState(false);

  const {
    stream,
    error,
    handleClick: makeAIRequest,
    disableAfterFirstResponse: disabled,
    isLoading,
  } = usePostReadableStream(AI_RESUME_JD_ENDPOINT, jobDesc, setJobDesc);

  useEffect(() => {
    if (disabled) {
      setShowResume(disabled);
    }
  }, [disabled]);

  const {
    response,
    handleClick: makeRequest,
    error: postError,
    isLoading: postIsLoading,
  } = usePostRequest(RESUME_JD_ANALYSIS_ENDPOINT, jobDesc);

  const handleAIClick = async () => {
    makeRequest();
  };

  useEffect(() => {
    if (response.status === "SUCCESS") {
      makeAIRequest(response?.data);
      console.log("Requesting!");
    }
  }, [response.status]);

  return (
    <Block el="section">
      {/* <PostCard>
        <button>Request my resume</button>
      </PostCard> */}
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
        <div className={styles.buttonsContainer}>
          <button onClick={handleAIClick} disabled={disabled}>
            Ask My AI Assistant
          </button>
          {!showResume && <UploadResume />}
        </div>
      </PostCard>
      <PostCard>
        <div style={{ whiteSpace: "pre-wrap" }} className={styles.aiResponseContainer}>
          <Skills error={postError} isLoading={postIsLoading} data={response?.data} />

          {error && <p className=" ">{error}</p>}
          {isLoading ? <div className="loading">Typing...</div> : null}
          {stream}
        </div>
      </PostCard>
    </Block>
  );
};

export default ForEmployers;
