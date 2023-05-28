import AllPosts from "@/components/posts/all-posts";
import { GetStaticProps } from "next";
import Head from "next/head";
import { getAllPosts } from "@/lib/posts-util";

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
  return (
    <>
      <Head>
        <title>All Posts</title>
        <meta
          name="description"
          content="A list of all programming-related tutorials and posts!"
        />
      </Head>
      <AllPosts posts={posts} />
    </>
  );
};

export const getStaticProps: GetStaticProps = () => {
  const allPosts = getAllPosts();

  return {
    props: { posts: allPosts },
  };
};

export default AllPostsPage;
