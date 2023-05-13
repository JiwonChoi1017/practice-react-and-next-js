import { Data, Response } from "types/Response";
import { NextApiRequest, NextApiResponse } from "next";

import fs from "fs";
import path from "path";

export const buildFeedbackPath = () => {
  return path.join(process.cwd(), "data", "feedback.json");
};

export const extractFeedback = (filePath: string): Data[] => {
  const fileData = fs.readFileSync(filePath);
  return JSON.parse(fileData.toString());
};

const handler = (req: NextApiRequest, res: NextApiResponse<Response>) => {
  const filePath = buildFeedbackPath();
  const data = extractFeedback(filePath);

  if (req.method === "POST") {
    const { email, text } = req.body;
    const newFeedback: Data = { id: new Date().toISOString(), email, text };

    data.push(newFeedback);
    fs.writeFileSync(filePath, JSON.stringify(data));

    res.status(201).json({ message: "Success!", feedback: [newFeedback] });
  } else {
    res.status(200).json({ feedback: data });
  }
};

export default handler;
