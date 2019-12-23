import styled from "styled-components";
import Router from "next/router";
import Link from 'next/link';

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
    cursor: pointer;
  }
  .item-header {
    padding-left: 20px;
    cursor: pointer;
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
  .item-buttons {
    display: flex;
    flex-direction: row;
    justify-content: space-evenly;
    margin-top: 20px;
      button {
      flex-grow: 0.3;
      padding: 3px;
    }
  }
`;

const handleEdit = id => {
  Router.push({
    pathname: "/update",
    query: { id }
  });
};

/*TODO putting everything inside one Link
  messes up the styling
  that's the reason why I had to use two
*/

const Item = props => (
  <Card>
    <Link href={{
      pathname: 'item',
      query: { id: props._id }
    }}>
      <img className="image" src={props.largeImage} />
    </Link>
    <Link href={{
      pathname: 'item',
      query: { id: props._id }
    }}>
      <div className="item-header">
        <div className="item-place">{props.place}</div>
        <div className="item-title">{props.title}</div>
        <div className="item-description">{props.description}</div>
      </div>
    </Link>
    <div className="item-buttons">
      <button onClick={() => handleEdit(props._id)}>Edit</button>
      <DeleteItem id={props._id}> Delete this item </DeleteItem>
      <button> Button</button>
    </div>
  </Card>
);




export default Item;
