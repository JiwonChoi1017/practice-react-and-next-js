import { useContext } from "react";
import MeetupList from "../components/meetups/MeetupList";
import FavoritesContext from "../store/favorites-context";

const FavoritesPage = () => {
  const favoriteContext = useContext(FavoritesContext);
  const content = !favoriteContext.totalFavorites ? (
    <p>You got no favorites yet. Start adding some?</p>
  ) : (
    <MeetupList meetups={favoriteContext.favorites} />
  );

  return (
    <section>
      <h1>My Favorites</h1>
      {content}
    </section>
  );
};

export default FavoritesPage;
