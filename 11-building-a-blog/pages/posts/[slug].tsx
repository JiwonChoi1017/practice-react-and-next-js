import { GetStaticPaths, GetStaticProps } from "next";
import { getPostData, getPostsFiles } from "@/lib/posts-util";

import PostContent from "@/components/posts/post-detail/post-content";

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

const PostDetailPage = ({ post }: Props) => {
  return <PostContent post={post} />;
};

export const getStaticProps: GetStaticProps = async (context) => {
  const { params } = context;
  const slug = params?.slug;

  if (!slug || typeof slug !== "string") {
    return {
      notFound: true,
    };
  }

  const postData = getPostData(slug);

  return {
    props: {
      post: postData,
    },
    revalidate: 600,
  };
};

export const getStaticPaths: GetStaticPaths = () => {
  const postFilenames = getPostsFiles();
  const slugs = postFilenames.map((fileName) => fileName.replace(/\.md$/, ""));

  return {
    paths: slugs.map((slug) => ({ params: { slug: slug } })),
    fallback: false,
  };
};

export default PostDetailPage;
