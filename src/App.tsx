import React, { useState } from "react";
import "@fortawesome/fontawesome-free/css/all.css";
import "bulma";
import "./index.scss";

import { Post } from "./types/Post";
import { PostForm } from "./components/PostForm";
import { PostList } from "./components/PostList";
import postsFromServer from "./api/posts.json";
import { getUserById } from "./services/user";

const initialPosts: Post[] = postsFromServer.map(
  (post) => ({
    ...post,
    user: getUserById(post.userId),
  })
);

function getNewPostId(posts: Post[]) {
  const maxId = Math.max(
    ...posts.map(post => post.id)
  )
  return maxId + 1;
  // return +Math.random().toFixed(12).slice(2);
}

export const App: React.FC = () => {
  const [posts, setPosts] =
    useState<Post[]>(initialPosts);

  const addPost = (post: Post) => {
    const newPost = {
      ...post,
      id: getNewPostId(posts),
    };
    setPosts((currentPosts) => [
      newPost,
      ...currentPosts,
    ]);
  };
  return (
    <div className="section">
      <h1 className="title">Create a post</h1>
      <PostForm onSubmit={addPost} />
      <PostList posts={posts} />
    </div>
  );
};

export default App;
