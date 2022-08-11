// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from "next";
import fs from "fs";
import path from "path";

type Data = {
  name: string;
};

export default function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  const filePath = path.join(process.cwd(), `/output/metadata_cost.xlsx`);
  try {
    const imageBuffer = fs.readFileSync(filePath);
    // res.setHeader("Content-Type", "files/test.txt");

    setTimeout(() => {
      //@ts-ignore

      res.send(imageBuffer);
    }, 500);
  } catch (e) {
    //@ts-ignore
    res.status(400).json({ error: true, message: "Image not found" });
  }
}
