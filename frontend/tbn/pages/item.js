import SingleItem from "../components/SingleItem";

const item = ({ query }) => {
  return <SingleItem id={query.id} />;
};

export default item;
