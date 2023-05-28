import PostsGrid from "./posts-grid";
import classes from "./all-posts.module.css";

interface Props {
  posts: {
    title: string;
    image: string;
    excerpt: string;
    date: string;
    slug: string;
  }[];
}

const AllPosts = ({ posts }: Props) => {
  return (
    <section className={classes.posts}>
      <h1>All Posts</h1>
      <PostsGrid posts={posts} />
    </section>
  );
};

export default AllPosts;
