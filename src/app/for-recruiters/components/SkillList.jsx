import React from "react";
import SkillItem from "./SkillItem";

const SkillList = ({ skills, className, Header, matchedSkills }) => {
  return (
    <div className={className}>
      {Header}
      <ul>
        {skills?.map((skill, i) => {
          //match-skill is defined in global classes
          const listClassName = matchedSkills?.includes(skill) ? "match-skill" : "skill";

          return <SkillItem skill={skill} key={`${skill}-${i}`} className={listClassName} />;
        })}
      </ul>
    </div>
  );
};

export default SkillList;
