import { Data, Response } from "types/Response";
import { buildFeedbackPath, extractFeedback } from "../api/feedback";

import { useState } from "react";

interface Props {
  feedbackItems: Data[];
}

const FeedbackPage = ({ feedbackItems }: Props) => {
  const [feedbackData, setFeedbackData] = useState<Data>({
    id: "",
    email: "",
    text: "",
  });

  const loadFeedbackHandler = (id: string) => {
    fetch(`/api/feedback/${id}`)
      .then((response) => response.json())
      .then((data: Response) => {
        if (!data.feedback) {
          return;
        }
        setFeedbackData(data.feedback[0]);
      });
  };

  return (
    <>
      {feedbackData && <p>{feedbackData.email}</p>}
      <ul>
        {feedbackItems.map((item) => {
          return (
            <li key={item.id}>
              {item.text}
              <button onClick={loadFeedbackHandler.bind(null, item.id)}>
                Show Details
              </button>
            </li>
          );
        })}
      </ul>
    </>
  );
};

export const getStaticProps = async () => {
  const filePath = buildFeedbackPath();
  const data = extractFeedback(filePath);

  return {
    props: {
      feedbackItems: data,
    },
  };
};

export default FeedbackPage;
