import React, { useEffect, useState } from "react";
import styled from "styled-components";
import Navbar from "./components/Navbar";
import Post from "./components/Post";
import Form from "./components/Form";
import { fetchUsers } from "./utils/";

const App = () => {
  const [posts, setPosts] = useState([]);
  const [users, setUsers] = useState([]);
  const [user, setUser] = useState("");
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");

  useEffect(() => {
    fetchUsers(setUsers);
  }, []);

  const getUsersPosts = async (index) => {
    const response = await fetch(`http://localhost:5000/posts/${users[index]._id}`);
    const data = await response.json();
    console.log(data);
    setPosts(data);
    setUser(users[index]);
  };

  const addPost = async (event) => {
    event.preventDefault();

    const response = await fetch(`http://localhost:5000/posts/${user._id}`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        title: title,
        content: content,
        author: user._id,
      }),
    });

    const data = await response.json();

    let temp = [...posts];
    temp.push(data);
    setPosts(temp);
  };

  return (
    <Container>
      <Navbar users={users} getUsersPosts={getUsersPosts} />
      <h1>{!user && "Choose a user"}</h1>
      <PostContainer>
        {posts.map((post, index) => {
          return <Post post={post} />;
        })}
      </PostContainer>
      {user && <Form setTitle={setTitle} setContent={setContent} addPost={addPost} />}
    </Container>
  );
};

const Container = styled.div`
  height: 100vh;
  width: 100vw;
  background-color: lightsalmon;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const PostContainer = styled.div`
  width: 100vw;
  display: flex;
  flex-wrap: wrap;
`;

export default App;
