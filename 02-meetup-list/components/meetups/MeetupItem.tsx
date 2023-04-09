import { useContext } from "react";
import FavoritesContext from "../../store/favorites-context";
import { Meetup } from "../../types/Meetup";
import Card from "../ui/Card";
import classes from "./MeetupItem.module.css";

const MeetupItem: React.FC<{ meetup: Meetup }> = (props) => {
  const { meetup } = props;
  const { id, image, title, address, description } = meetup;

  const favoriteContext = useContext(FavoritesContext);
  const itemIsFavorite = favoriteContext.itemIsFavorite(id);

  const toggleFavoriteStatusHandler = () => {
    if (itemIsFavorite) {
      favoriteContext.removeFavorite(id);
    } else {
      favoriteContext.addFavorite(meetup);
    }
  };

  return (
    <li className={classes.item}>
      <Card>
        <div className={classes.image}>
          <img src={image} alt={title} />
        </div>
        <div className={classes.content}>
          <h3>{title}</h3>
          <address>{address}</address>
          <p>{description}</p>
        </div>
        <div className={classes.actions}>
          <button onClick={toggleFavoriteStatusHandler}>
            {itemIsFavorite ? "Remove from Favorites" : "To Favorites"}
          </button>
        </div>
      </Card>
    </li>
  );
};

export default MeetupItem;
