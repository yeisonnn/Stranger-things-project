import Nav from "./Nav";

const Layout = (props) => {
  return (
    <div>
      <Nav />
      <section className="main">{props.children}</section>
    </div>
  );
};

export default Layout;
