import { notFound } from "next/navigation";
import Link from "next/link";
import { db } from "@/db";
import PostShow from "@/components/posts/PostShow";
import CommentList from "@/components/comments/comment-list";
import CommentCreateForm from "@/components/comments/comment-create-form";
import paths from "@/paths";
import { fetchCommentsByPostId } from "@/db/queries/comments";

interface PostShowPageProps {
  params: {
    slug: string;
    postId: string;
  };
}

export default async function PostShowPage({ params }: PostShowPageProps) {
  const { slug, postId } = params;

  const post = await db.post.findUnique({
    where: { id: postId },
  });

  const comments = await db.comment.findMany({
    where: { postId },
    include: {
      user: {
        select: {
          name: true,
          image: true,
        },
      },
    },
  });

  if (!post) {
    notFound();
  }

  return (
    <div className="space-y-3">
      <Link className="underline decoration-solid" href={paths.topicShow(slug)}>
        {"< "}Back to {slug}
      </Link>
      <PostShow postID={postId} />
      <CommentCreateForm postId={postId} />
      <CommentList fetchData={() => fetchCommentsByPostId(postId)} />
    </div>
  );
}

export async function generateStaticParams() {
  const topics = await db.topic.findMany({
    include: { posts: { select: { id: true } } },
  });

  return topics.flatMap((topic) => {
    return topic.posts.map((post) => {
      return {
        postId: post.id,
        slug: topic.slug,
      };
    });
  });
}
