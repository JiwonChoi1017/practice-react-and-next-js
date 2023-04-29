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

  if (!loadedProduct) {
    return <p>Loading...</p>;
  }

  return (
    <>
      <h1>{loadedProduct.title}</h1>
      <p>{loadedProduct.description}</p>
    </>
  );
};

const getData = async () => {
  const filePath = path.join(process.cwd(), "data", "dummy-backend.json");
  const jsonData = await fs.readFile(filePath);
  const data = JSON.parse(jsonData.toString());

  return data;
};

export const getStaticProps: GetStaticProps = async (context) => {
  const { params } = context;
  const productId = params?.pid;

  const data = await getData();

  const product = data.products.find(
    (product: { id: string; title: string; description: string }) =>
      product.id === productId
  );

  if (!product) {
    return { notFound: true };
  }

  return {
    props: {
      loadedProduct: product,
    },
  };
};

export const getStaticPaths: GetStaticPaths = async () => {
  const data = await getData();
  const idList: string[] = data.products.map(
    (product: { id: string; title: string; description: string }) => product.id
  );
  const paths = idList.map((id) => ({ params: { pid: id } }));

  return {
    paths,
    fallback: true,
  };
};

export default ProductionDetailPage;
