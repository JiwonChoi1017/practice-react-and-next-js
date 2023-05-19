import EventList from "@/components/events/event-list";
import ResultsTitle from "@/components/results-title/results-title";
import Button from "@/components/ui/button";
import ErrorAlert from "@/components/ui/error-alert";
import { getFilteredEvents } from "@/helpers/api-util";
import { Event } from "@/types/Event";
import { GetServerSideProps } from "next";

interface Props {
  hasError: boolean;
  events: Event[];
  date: {
    year: number;
    month: number;
  };
}

const FilteredEventsPage = ({ hasError, events, date }: Props) => {
  if (hasError) {
    return (
      <>
        <ErrorAlert>
          <p>Invalid filter. Please adjust your values!</p>
        </ErrorAlert>
        <div className="center">
          <Button link="/events">Show All Events</Button>
        </div>
      </>
    );
  }

  if (!events || !events.length || !date) {
    return (
      <>
        <ErrorAlert>
          <p>No events found for the chosen filter!</p>
        </ErrorAlert>
        <div className="center">
          <Button link="/events">Show All Events</Button>
        </div>
      </>
    );
  }

  const { year, month } = date;
  const newDate = new Date(year, month - 1);

  return (
    <>
      <ResultsTitle date={newDate} />
      <EventList items={events} />
    </>
  );
};

export const getServerSideProps: GetServerSideProps = async (context) => {
  const { params } = context;
  const filterData = params?.slug;

  if (!filterData) {
    return { props: { hasError: true } };
  }

  const numYear = +filterData[0];
  const numMonth = +filterData[1];

  if (
    isNaN(numYear) ||
    isNaN(numMonth) ||
    numYear > 2030 ||
    numYear < 2021 ||
    numMonth > 12 ||
    numMonth < 1
  ) {
    return {
      props: { hasError: true },
      // notFound: true,
      // redirect: {
      //   destination: "/error"
      // }
    };
  }

  const filteredEvents = await getFilteredEvents({
    year: numYear,
    month: numMonth,
  });

  return {
    props: {
      events: filteredEvents,
      date: {
        year: numYear,
        month: numMonth,
      },
    },
  };
};

export default FilteredEventsPage;
