import { NextApiRequest, NextApiResponse } from "next";
import { buildFeedbackPath, extractFeedback } from ".";

import { Response } from "types/Response";

const handler = (req: NextApiRequest, res: NextApiResponse<Response>) => {
  const { feedbackId } = req.query;
  const filePath = buildFeedbackPath();
  const feedbackData = extractFeedback(filePath);
  const selectedFeedback = feedbackData.find(
    (feedback) => feedback.id === feedbackId
  );
  res
    .status(200)
    .json({ feedback: !!selectedFeedback ? [selectedFeedback] : [] });
};

export default handler;
