import fs from "fs/promises";
import { GetServerSideProps } from "next";
import Link from "next/link";
import path from "path";

interface Props {
  products: {
    id: string;
    title: string;
  }[];
}

const HomePage = (props: Props) => {
  const { products } = props;

  return (
    <ul>
      {products.map((product) => (
        <li key={product.id}>
          <Link href={`/products/${product.id}`}>{product.title}</Link>
        </li>
      ))}
    </ul>
  );
};

export const getStaticProps: GetServerSideProps = async (context) => {
  const filePath = path.join(process.cwd(), "data", "dummy-backend.json");
  const jsonData = await fs.readFile(filePath);
  const data = JSON.parse(jsonData.toString());

  if (!data) {
    return {
      redirect: {
        statusCode: 301,
        destination: "/no-data",
      },
    };
  }

  if (!data.products.length) {
    return { notFound: true };
  }

  return {
    props: {
      products: data.products,
    },
    revalidate: 10,
  };
};

export default HomePage;
