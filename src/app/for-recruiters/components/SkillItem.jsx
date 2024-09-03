import React from "react";

const SkillItem = ({ skill, className }) => {
  return <li className={`${className} skill-item`}>{skill}</li>;
};

export default SkillItem;
