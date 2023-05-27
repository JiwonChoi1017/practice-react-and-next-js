import { useContext, useEffect, useState } from "react";

import CommentList from "./comment-list";
import NewComment from "./new-comment";
import { NotificationContext } from "@/store/notification-context";
import classes from "./comments.module.css";

interface Props {
  eventId: string;
}

const Comments = (props: Props) => {
  const { eventId } = props;

  const { showNotification } = useContext(NotificationContext);

  const [showComments, setShowComments] = useState<boolean>(false);
  const [comments, setComments] = useState<
    {
      _id: string;
      name: string;
      text: string;
    }[]
  >([]);
  const [isFetchingComments, setIsFetchingComments] = useState<boolean>(false);

  useEffect(() => {
    if (showComments) {
      setIsFetchingComments(true);
      fetch(`/api/comments/${eventId}`)
        .then((response) => response.json())
        .then(
          (data: {
            comments: {
              _id: string;
              name: string;
              text: string;
            }[];
          }) => {
            setComments(data.comments);
            setIsFetchingComments(false);
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
    showNotification({
      title: "Sending comment...",
      message: "Your comment is currently being stored into a database.",
      status: "pending",
    });

    fetch(`/api/comments/${eventId}`, {
      method: "POST",
      body: JSON.stringify(commentData),
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((response) => {
        if (response.ok) {
          return response.json();
        }

        response.json().then((data) => {
          showNotification({
            title: "Error!",
            message: data.message || "Something went wrong!",
            status: "error",
          });
        });
      })
      .then((data) => {
        showNotification({
          title: "Success!",
          message: "Your comment was saved!",
          status: "success",
        });
      });
  }

  return (
    <section className={classes.comments}>
      <button onClick={toggleCommentsHandler}>
        {showComments ? "Hide" : "Show"} Comments
      </button>
      {showComments && <NewComment onAddComment={addCommentHandler} />}
      {showComments && !isFetchingComments && <CommentList items={comments} />}
      {showComments && isFetchingComments && <p>Loading...</p>}
    </section>
  );
};

export default Comments;
