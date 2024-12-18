// #region imports
import React, {
  useCallback,
  useMemo,
  useRef,
  useState,
} from "react";
import "@fortawesome/fontawesome-free/css/all.css";
import "bulma";
import "./index.scss";
// import debounce from 'lodash.debounce'

import postsFromServer from "./api/posts.json";

import { Post } from "./types/Post";
import { PostForm } from "./components/PostForm";
import { PostList } from "./components/PostList";
import { getUserById } from "./services/user";
//  #endregion

function debounce(callback: Function, delay: number) {
  let timerId = 0;
  return (...args: any) => {
    window.clearTimeout(timerId);

    timerId = window.setTimeout(() => {
      callback(...args);
    }, delay)
  };
}

const initialPosts: Post[] = postsFromServer.map(
  (post) => ({
    ...post,
    user: getUserById(post.userId),
  })
);

function getNewPostId(posts: Post[]) {
  const maxId = Math.max(
    ...posts.map((post) => post.id)
  );
  return maxId + 1;
  // return +Math.random().toFixed(12).slice(2);
}

export const App: React.FC = () => {
  
  const [count, setCount] = useState(0);
  const [selectedPost, setSelectedPost] = useState<Post | null>(null);
  const [posts, setPosts] = useState<Post[]>(initialPosts);
  const [query, setQuery] = useState("");
  const [appliedQuery, setAppliedQuery] = useState('');
  
  // #region query
  const applyQuery = useCallback(debounce(setAppliedQuery, 1000), [])
  
  const handleQueryChange = (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    setQuery(e.target.value);
    applyQuery(e.target.value);
  };
  // #endregion

  // #region posts
  const addPost = useCallback((post: Post) => {
    setPosts((currentPosts) => {
      const newPost = {
        ...post,
        id: getNewPostId(currentPosts),
      };

      return [newPost, ...currentPosts];
    });
  }, []);

  const deletePost = useCallback(
    (postId: number) => {
      setPosts((currentPosts) =>
        currentPosts.filter(
          (post) => post.id !== postId
        )
      );
    },
    []
  );

  const filtredPosts = useMemo(() => {
    return posts.filter((post) =>
      post.title.includes(appliedQuery)
    );
  }, [appliedQuery, posts]);

  const updatePost = useCallback(
    (updatedPost: Post) => {
      setPosts((currentPosts) => {
        const newPosts = [...currentPosts];
        const index = newPosts.findIndex(
          (post) => post.id === updatedPost.id
        );

        newPosts.splice(index, 1, updatedPost);

        return newPosts;
      });
    },
    []
  );
  // #endregion


  return (
    <div className="section py-5">
      <button
        className="button is-primary"
        onClick={() => setCount((pc) => pc + 1)}
      >
        {count}
      </button>
      {selectedPost?.id}
      <div className="columns is-mobile">
        <div className="column">
          <h1 className="title">Posts</h1>
        </div>
        <div className="column">
          <input
            type="text"
            className="input is-rounded"
            value={query}
            onChange={handleQueryChange}
          />
        </div>
      </div>

      <div className="section">
        <PostList
          posts={filtredPosts}
          selectedPostId={selectedPost?.id}
          onDelete={deletePost}
          onSelect={setSelectedPost}
        />
        {selectedPost ? (
          <PostForm
            key={selectedPost.id}
            post={selectedPost}
            onSubmit={updatePost}
            onReset={() => setSelectedPost(null)}
          />
        ) : (
          <PostForm onSubmit={addPost} />
        )}
      </div>
    </div>
  );
};

export default App;
