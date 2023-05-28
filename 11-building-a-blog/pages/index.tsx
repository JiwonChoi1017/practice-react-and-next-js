import FeaturedPosts from "@/components/home-page/featured-posts";
import { GetStaticProps } from "next";
import Head from "next/head";
import Hero from "@/components/home-page/hero";
import { getFeaturedPosts } from "@/lib/posts-util";

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

const HomePage = ({ posts }: Props) => {
  return (
    <>
      <Head>
        <title>Choi&apos; Blog</title>
        <meta
          name="description"
          content="I post about programming and web development."
        />
      </Head>
      <Hero />
      <FeaturedPosts posts={posts} />
    </>
  );
};

export const getStaticProps: GetStaticProps = () => {
  const featuredPosts = getFeaturedPosts();

  return {
    props: { posts: featuredPosts },
  };
};

export default HomePage;
