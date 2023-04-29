import { GetServerSideProps, GetServerSidePropsContext } from "next";

interface Props {
  username: string;
}

const UserProfilePage = (props: Props) => {
  return <h1>{props.username}</h1>;
};

export const getServerSideProps: GetServerSideProps = async (context) => {
  const { params, req, res } = context;
  return {
    props: {
      username: "Choi",
    },
  };
};

export default UserProfilePage;
