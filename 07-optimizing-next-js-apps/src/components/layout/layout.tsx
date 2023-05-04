import MainHeader from "./main-header";

const Layout = (props: { children: React.ReactNode }) => {
  const { children } = props;

  return (
    <>
      <MainHeader />
      <main>{children}</main>
    </>
  );
};

export default Layout;
