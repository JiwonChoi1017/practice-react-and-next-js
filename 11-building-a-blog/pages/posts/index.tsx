import { getAllPosts, getFeaturedPosts } from "@/lib/posts-util";

import AllPosts from "@/components/posts/all-posts";
import { GetStaticProps } from "next";

interface Props {
  posts: {
    slug: string;
    title: string;
    date: string;
    image: string;
    excerpt: string;
    isFeatured: boolean;
    content: string;
  }[];
}

const AllPostsPage = ({ posts }: Props) => {
  return <AllPosts posts={posts} />;
};

export const getStaticProps: GetStaticProps = () => {
  const allPosts = getAllPosts();

  return {
    props: { posts: allPosts },
  };
};

export default AllPostsPage;
