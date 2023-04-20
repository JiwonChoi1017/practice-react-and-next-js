import EventItem from "./event-item";
import classes from "./event-list.module.css";

const EventList: React.FC<{
  items: {
    id: string;
    title: string;
    description: string;
    location: string;
    date: string;
    image: string;
    isFeatured: boolean;
  }[];
}> = (props) => {
  const { items } = props;
  return (
    <ul className={classes.list}>
      {items.map((event) => (
        <EventItem key={event.id} {...event} />
      ))}
    </ul>
  );
};

export default EventList;
