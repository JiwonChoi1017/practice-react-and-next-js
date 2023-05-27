import classes from "./comment-list.module.css";

interface Props {
  items: {
    _id: string;
    name: string;
    text: string;
  }[];
}

const CommentList = ({ items }: Props) => {
  return (
    <ul className={classes.comments}>
      {items.map((item) => (
        <li key={item._id}>
          <p>{item.text}</p>
          <div>
            By <address>{item.name}</address>
          </div>
        </li>
      ))}
    </ul>
  );
};

export default CommentList;
