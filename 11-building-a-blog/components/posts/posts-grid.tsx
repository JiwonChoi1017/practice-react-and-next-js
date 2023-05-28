import PostItem from "./post-item";
import classes from "./posts-grid.module.css";

interface Props {
  posts: {
    title: string;
    image: string;
    excerpt: string;
    date: string;
    slug: string;
  }[];
}

const PostsGrid = ({ posts }: Props) => {
  return (
    <ul className={classes.grid}>
      {posts.map((post) => (
        <PostItem key={post.title} {...post} />
      ))}
    </ul>
  );
};

export default PostsGrid;
