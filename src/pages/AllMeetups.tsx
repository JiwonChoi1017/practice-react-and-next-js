import { useEffect, useState } from "react";
import MeetupList from "../components/meetups/MeetupList";

const AllMeetupsPage = () => {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [loadedMeetups, setLoadedMeetups] = useState<
    {
      id: string;
      title: string;
      image: string;
      address: string;
      description: string;
    }[]
  >([]);

  useEffect(() => {
    fetch(
      "https://react-http-b7917-default-rtdb.firebaseio.com/meetups.json",
      {}
    )
      .then((response) => {
        return response.json();
      })
      .then((data) => {
        setIsLoading(false);
        setLoadedMeetups(data);
      });
  }, []);

  if (isLoading) {
    return (
      <section>
        <p>Loading...</p>
      </section>
    );
  }

  return (
    <section>
      <h1>All Meetups</h1>
      <MeetupList meetups={loadedMeetups} />
    </section>
  );
};

export default AllMeetupsPage;
