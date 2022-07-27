// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from "next";
import { fetchData } from "../../helper/fetchDate";

type Data = {
  name: string;
};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  const { item } = req.query;
  const result = await fetchData(item);

  res
    .status(200)
    //@ts-ignore
    .json({ message: "Data Fetched successfully!", response: result });
}
