import { Meetup } from "../../types/Meetup";
import MeetupItem from "./MeetupItem";
import classes from "./MeetupList.module.css";

const MeetupList: React.FC<{ meetups: Meetup[] }> = ({ meetups }) => {
  return (
    <ul className={classes.list}>
      {meetups.map((meetup) => {
        return <MeetupItem key={meetup.id} meetup={meetup} />;
      })}
    </ul>
  );
};

export default MeetupList;
