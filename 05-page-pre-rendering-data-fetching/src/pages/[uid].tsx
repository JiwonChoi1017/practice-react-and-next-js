import { GetServerSideProps } from "next";

interface Props {
  id: string;
}
const UserIdPage = (props: Props) => {
  return <h1>{props.id}</h1>;
};

export const getServerSideProps: GetServerSideProps = async (context) => {
  const { params } = context;
  const userId = params?.uid;

  return {
    props: {
      id: `userId-${userId}`,
    },
  };
};

export default UserIdPage;
