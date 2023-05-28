import PostHeader from "./post-header";
import { ReactMarkdown } from "react-markdown/lib/react-markdown";
import classes from "./post-content.module.css";

interface Props {
  post: {
    slug: string;
    title: string;
    date: string;
    image: string;
    excerpt: string;
    isFeatured: boolean;
    content: string;
  };
}

const PostContent = ({ post }: Props) => {
  const imagePath = `/images/posts/${post.slug}/${post.image}`;

  return (
    <article className={classes.content}>
      <PostHeader title={post.title} image={imagePath} />
      <ReactMarkdown>{post.content}</ReactMarkdown>
    </article>
  );
};

export default PostContent;
