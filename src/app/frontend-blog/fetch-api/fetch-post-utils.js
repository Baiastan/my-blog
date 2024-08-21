import fs from "fs";
import path from "path";

export const fetchPostLinks = async () => {
  const filePath = path.join(process.cwd(), "src/app/frontend-blog/data", "data.json");
  const jsonData = fs.readFileSync(filePath, "utf8");
  const posts = JSON.parse(jsonData);

  return posts;
};

export const fetchPostDetails = async (postId) => {
  const filePath = path.join(process.cwd(), "src/app/frontend-blog/data", `${postId}.json`);
  const jsonData = fs.readFileSync(filePath, "utf8");
  const post = JSON.parse(jsonData);

  return post;
};
