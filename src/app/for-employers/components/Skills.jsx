"use item";
import React from "react";

import SkillList from "./SkillList";
import Header from "@/app/components/common/header/Header";

import styles from "./Skills.module.scss";

const Skills = ({ data = { jobSkills: [], matchedSkills: [] }, error, isLoading }) => {
  if (error) {
    return <p className="error">{error}</p>;
  }

  if (isLoading) {
    return <div className="loading">Parsing...</div>;
  }

  return data.jobSkills.length > 0 ? (
    <div className={styles.skillsContainer}>
      <SkillList
        skills={data?.jobSkills}
        matchedSkills={data?.matchedSkills}
        key={"job-skills"}
        Header={<Header>Job skills:</Header>}
        className={styles.jobSkillsList}
      />
      <SkillList
        className={styles.matchedSkillsList}
        skills={data?.matchedSkills}
        key={"matched-skills"}
        Header={<Header>Matched job skills with Baiastan's skills:</Header>}
      />
    </div>
  ) : null;
};

export default Skills;
