import styled from 'styled-components';

const Card = styled.div`
    background: #fff;
    border-radius: 2px;
    display: inline-block;
    height: 400px;
    margin: 1rem;
    position: relative;
    width: 300px;
    box-shadow: 0 1px 3px rgba(0,0,0,0.12), 0 1px 2px rgba(0,0,0,0.24);
    transition: all 0.5s cubic-bezier(.25,.8,.25,1);
    &:hover { 
        box-shadow: 0 14px 28px rgba(0,0,0,0.25), 0 10px 10px rgba(0,0,0,0.22);
        transform: scale(1.01)
    }
`

const Item = (props) => (
    <Card>
        <p>{props.title}</p>
        <p>{props.description}</p>
        <p>{props.place}</p>
    </Card>

)

export default Item;