export type Data = {
  id: string;
  email: string;
  text: string;
};

export type Response = {
  message?: string;
  feedback: Data[] | undefined;
};
