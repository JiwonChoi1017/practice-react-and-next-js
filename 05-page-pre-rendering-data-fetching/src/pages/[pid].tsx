import { GetServerSideProps, GetStaticPaths, GetStaticProps } from "next";
import path from "path";
import fs from "fs/promises";

interface Props {
  loadedProduct: {
    title: string;
    description: string;
  };
}
const ProductionDetailPage = (props: Props) => {
  const { loadedProduct } = props;
  return (
    <>
      <h1>{loadedProduct.title}</h1>
      <p>{loadedProduct.description}</p>
    </>
  );
};

export const getStaticProps: GetServerSideProps = async (context) => {
  const { params } = context;
  const productId = params?.pid;

  const filePath = path.join(process.cwd(), "data", "dummy-backend.json");
  const jsonData = await fs.readFile(filePath);
  const data = JSON.parse(jsonData.toString());

  const product = data.products.find(
    (product: { id: string; title: string; description: string }) =>
      product.id === productId
  );

  return {
    props: {
      loadedProduct: product,
    },
  };
};

export const getStaticPaths: GetStaticPaths = async () => {
  return {
    paths: [
      {
        params: { pid: "p1" },
      },
      {
        params: { pid: "p2" },
      },
      {
        params: { pid: "p3" },
      },
    ],
    fallback: false,
  };
};

export default ProductionDetailPage;
