import React from "react";
import styled from "styled-components";

const Navbar = ({ users, getUsersPosts }) => {
  return (
    <Container>
      {users.map((user, index) => {
        return <h1 onClick={() => getUsersPosts(index)}>{user.name}</h1>;
      })}
    </Container>
  );
};

const Container = styled.div`
  width: 100vw;
  height: 50px;
  background-color: lightseagreen;
  display: flex;
  justify-content: space-evenly;
  align-items: center;
`;

export default Navbar;
