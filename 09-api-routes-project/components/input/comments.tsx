import { useEffect, useState } from "react";

import CommentList from "./comment-list";
import NewComment from "./new-comment";
import classes from "./comments.module.css";

interface Props {
  eventId: string;
}

const Comments = (props: Props) => {
  const { eventId } = props;

  const [showComments, setShowComments] = useState<boolean>(false);
  const [comments, setComments] = useState<
    {
      id: string;
      name: string;
      text: string;
    }[]
  >([]);

  useEffect(() => {
    if (showComments) {
      fetch(`/api/comments/${eventId}`)
        .then((response) => response.json())
        .then(
          (data: {
            comments: {
              id: string;
              name: string;
              text: string;
            }[];
          }) => {
            setComments(data.comments);
          }
        );
    }
  }, [showComments, eventId]);

  function toggleCommentsHandler() {
    setShowComments((prevStatus) => !prevStatus);
  }

  function addCommentHandler(commentData: {
    email: string;
    name: string;
    text: string;
  }) {
    fetch(`/api/comments/${eventId}`, {
      method: "POST",
      body: JSON.stringify(commentData),
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((response) => response.json())
      .then((data) => console.log(data));
  }

  return (
    <section className={classes.comments}>
      <button onClick={toggleCommentsHandler}>
        {showComments ? "Hide" : "Show"} Comments
      </button>
      {showComments && <NewComment onAddComment={addCommentHandler} />}
      {showComments && <CommentList items={comments} />}
    </section>
  );
};

export default Comments;
