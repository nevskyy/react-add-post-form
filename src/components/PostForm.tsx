import cn from "classnames";
import React, { useState } from "react";
import usersFromServer from '../api/users.json';
import { Post } from "../types/Post";
import { getUserById } from "../services/user";

type Props = {
  onSubmit: (post: Post) => void,
}

export const PostForm: React.FC<Props> = ({onSubmit}) => {
  const [title, setTitle] = useState("");
  const [hasTitleError, setHasTitleError] =
    useState(false);

  const [userId, setUserId] = useState(0);
  const [hasUserIdError, setHasUserIdError] =
    useState(false);

  const [body, setBody] = useState("");
  const [hasBodyError, setHasBodyError] =
    useState(false);

    
    const handleTitleChange = (
      e: React.ChangeEvent<HTMLInputElement>
    ) => {
      setTitle(e.target.value);
      setHasTitleError(false);
    };
    
    const handleUserIdChange = (
      e: React.ChangeEvent<HTMLSelectElement>
    ) => {
      setUserId(+e.target.value);
      setHasUserIdError(false);
    };
    
    const handleBodyChange = (
      e: React.ChangeEvent<HTMLTextAreaElement>
    ) => {
      setBody(e.target.value);
      setHasBodyError(false);
    };
    
    const handleSubmit = (e: React.FormEvent) => {
      e.preventDefault();

      setHasTitleError(!title);
      setHasUserIdError(!userId);
      setHasBodyError(!body);
  
      if (!title || !userId || !body) {
        return;
      }

      onSubmit({
        id: 0,
        title,
        body,
        userId,
        user: getUserById(userId)
      })

      reset();
    };

    const reset = () => {
      setTitle('');
      setUserId(0);
      setBody('');

      setHasTitleError(false);
      setHasUserIdError(false);
      setHasBodyError(false);
    }


  return (
    <form
      action="/api/posts"
      method="POST"
      className="box"
      onSubmit={handleSubmit}
      onReset={reset}
    >
      <div className="field">
        <label
          className="label"
          htmlFor="post-title"
        >
          Title
        </label>
        <div
          className={cn("control", {
            "has-icons-right": hasTitleError,
          })}
        >
          <input
            id="post-title"
            className={cn("input", {
              "is-danger": hasTitleError,
            })}
            type="text"
            placeholder="Email input"
            value={title}
            onChange={handleTitleChange}
          />

          {hasTitleError && (
            <span className="icon is-small is-right">
              <i className="fas fa-exclamation-triangle has-text-danger"></i>
            </span>
          )}
        </div>

        {hasTitleError && (
          <p className="help is-danger">
            Title is required
          </p>
        )}
      </div>

      <div className="field">
        <label
          className="label"
          htmlFor="post-user-id"
        >
          Subject
        </label>
        <div className="control has-icons-left">
          <div
            className={cn("select", {
              "is-danger": hasUserIdError,
            })}
          >
            <select
              id="post-user-id"
              value={userId}
              onChange={handleUserIdChange}
            >
              <option value='0'>Select a user</option>

              {usersFromServer.map(user => (
                <option value={user.id} key={user.id}>
                  {user.name}
                </option>
              ))}
            </select>
          </div>
          <span className="icon is-small is-left">
            <i className="fas fa-user"></i>
          </span>
        </div>

        {hasUserIdError && (
          <p className="help is-danger">
            Please select a user
          </p>
        )}
      </div>

      <div className="field">
        <label className="label">Message</label>
        <div className="control">
          <textarea
            className={cn("textarea", {
              "is-danger": hasBodyError,
            })}
            placeholder="Add some text here"
            value={body}
            onChange={handleBodyChange}
          ></textarea>
        </div>

        {hasBodyError && (
          <p className="help is-danger">
            Please enter some message
          </p>
        )}
      </div>

      <div className="buttons ">
        <button
          className="button is-link"
          type="submit"
        >
          Submit
        </button>
        <button
          className="button is-link is-light"
          type="reset"
        >
          Cancel
        </button>
      </div>
    </form>
  );
};
