import styled from "styled-components";
import Router from "next/router";

import DeleteItem from "../components/DeleteItem";

const Card = styled.div`
  background: #fff;
  border-radius: 2px;
  display: inline-block;
  height: 650px;
  margin: 1rem;
  position: relative;
  width: 350px;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.12), 0 1px 2px rgba(0, 0, 0, 0.24);
  transition: all 0.5s cubic-bezier(0.25, 0.8, 0.25, 1);
  &:hover {
    box-shadow: 0 14px 28px rgba(0, 0, 0, 0.25), 0 10px 10px rgba(0, 0, 0, 0.22);
    transform: scale(1.01);
  }
  .image {
    height: 70%;
    width: 100%;
    padding: 10px;
    border-top-left-radius: 3px;
    border-top-right-radius: 3px;
  }
  .item-header {
    padding-left: 20px;
  }
  .item-title {
    font-size: 4rem;
    margin-top: 10px;
    margin-bottom: 10px;
  }
  .item-place {
    height: 27px;
    position: relative;
    top: 10px;
    /* left: 10px; */
    font-size: 1.8rem;
    color: #767677;
  }
  .item-description {
  }
`;

const handleEdit = id => {
  Router.push({
    pathname: "/update",
    query: { id }
  });
};

const Item = props => (
  <Card>
    <img className="image" src={props.largeImage} />
    <div className="item-header">
      <div className="item-place">{props.place}</div>
      <div className="item-title">{props.title}</div>
      <div className="item-description">{props.description}</div>
    </div>
    <button onClick={() => handleEdit(props._id)}>Edit</button>
    <DeleteItem id={props._id}> Delete this item </DeleteItem>
  </Card>
);

export default Item;
