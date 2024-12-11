import React from 'react';
import { PostForm } from './components/PostForm';



export const App: React.FC = () => {
  return (
    <div className="App">
      <h1>Create a post</h1>
      <PostForm />

    </div>
  );
}

export default App;
