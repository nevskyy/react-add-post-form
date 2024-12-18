import React from "react";
import { Post } from "../types/Post";
import cn from "classnames";

type Props = {
  posts: Post[];
  selectedPostId?: number;
  onDelete?: (id: number) => void;
  onSelect?: (post: Post) => void;
};

export const PostList: React.FC<Props> =
  React.memo(
    ({
      posts,
      selectedPostId,
      onDelete = () => {},
      onSelect = () => {},
    }) => {
      console.log("rendering PostList");
      return (
        <table className="box table is-striped is-narrow">
          <thead>
            <tr className="has-background-link-light">
              <th>#</th>
              <th>Title</th>
              <th>User Email</th>
              <th>Edit post</th>
              <th>Delete post</th>
            </tr>
          </thead>

          <tbody>
            {posts.map((post) => (
              <tr
                key={post.id}
                className={cn({
                  "has-background-info":
                    selectedPostId === post.id,
                })}
              >
                <td>{post.id}</td>
                <td>{post.title}</td>
                <td>{post.user?.email}</td>
                <td>
                  <button
                    className="icon button is-info"
                    onClick={() => onSelect(post)}
                  >
                    <i className="fas fa-pen"></i>
                  </button>
                </td>
                <td>
                  <button
                    className="icon button is-danger"
                    onClick={() =>
                      onDelete(post.id)
                    }
                  >
                    <i className="fas fa-xmark"></i>
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      );
    }
  );
