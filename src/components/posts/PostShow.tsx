import React from "react";
import { db } from "@/db";
import { notFound } from "next/navigation";

interface PostShowProps {
  postID: string;
}
const PostShow = async ({ postID }: PostShowProps) => {
  const post = await db.post.findFirst({
    where: {
      id: postID,
    },
  });

  if (!post) {
    notFound();
  }
  return (
    <div className="m-4">
      <h1 className="text-2xl font-bold my-2">{post.title}</h1>
      <p className="p-4 border rounded">{post.content}</p>
    </div>
  );
};

export default PostShow;
