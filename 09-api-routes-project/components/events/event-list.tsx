import { Event } from "@/types/Event";
import EventItem from "./event-item";
import classes from "./event-list.module.css";

const EventList: React.FC<{
  items: Event[];
}> = (props) => {
  const { items } = props;

  if (!items) {
    return <></>;
  }

  return (
    <ul className={classes.list}>
      {items.map((event) => (
        <EventItem key={event.id} {...event} />
      ))}
    </ul>
  );
};

export default EventList;
