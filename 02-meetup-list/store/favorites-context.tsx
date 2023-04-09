import { createContext, useState } from "react";
import { Meetup } from "../types/Meetup";

type FavoriteContextType = {
  favorites: Meetup[];
  totalFavorites: number;
  addFavorite: (favoriteMeetup: Meetup) => void;
  removeFavorite: (meetupId: string) => void;
  itemIsFavorite: (meetupId: string) => boolean;
};

const FavoritesContext = createContext<FavoriteContextType>({
  favorites: [],
  totalFavorites: 0,
  addFavorite: (favoriteMeetup: Meetup) => {},
  removeFavorite: (meetupId: string) => {},
  itemIsFavorite: (meetupId: string) => false,
});

export const FavoritesContextProvider: React.FC<{
  children: React.ReactNode;
}> = (props) => {
  const [userFavorites, setUserFavorites] = useState<Meetup[]>([]);
  const addFavoriteHandler = (favoriteMeetup: Meetup) => {
    setUserFavorites((prevUserFavorites) => {
      return prevUserFavorites.concat(favoriteMeetup);
    });
  };
  const removeFavoriteHandler = (meetupId: string) => {
    setUserFavorites((prevUserFavorites) => {
      return prevUserFavorites.filter((meetup) => {
        return meetup.id !== meetupId;
      });
    });
  };
  const itemIsFavoriteHandler = (meetupId: string) => {
    return userFavorites.some((meetup) => {
      return meetup.id === meetupId;
    });
  };
  const context = {
    favorites: userFavorites,
    totalFavorites: userFavorites.length,
    addFavorite: addFavoriteHandler,
    removeFavorite: removeFavoriteHandler,
    itemIsFavorite: itemIsFavoriteHandler,
  };
  return (
    <FavoritesContext.Provider value={context}>
      {props.children}
    </FavoritesContext.Provider>
  );
};

export default FavoritesContext;
