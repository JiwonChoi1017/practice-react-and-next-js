import PostsGrid from "../posts/posts-grid";
import classes from "./featured-posts.module.css";

interface Props {
  posts: {
    title: string;
    image: string;
    excerpt: string;
    date: string;
    slug: string;
  }[];
}

const FeaturedPosts = ({ posts }: Props) => {
  return (
    <section className={classes.latest}>
      <h2>Featured Posts</h2>
      <PostsGrid posts={posts} />
    </section>
  );
};

export default FeaturedPosts;
