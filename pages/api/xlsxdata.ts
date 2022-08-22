import type { NextApiRequest, NextApiResponse } from "next";
// import formidable from "formidable";

import { getDate } from "../../helper/getData";

export const config = {
  api: {
    // bodyParser: false,
  },
};
export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const payload = req.body;
  if (req.method === "POST") {
    try {
      const result = await getDate(payload);

      res
        .status(200)
        .json({ message: "Data Fetched successfully!", response: result });
    } catch (error) {
      res.status(500).json({ message: "Server Error" });
    }
  }

  // const promise = new Promise((resolve, reject) => {

  //   const form = formidable();

  //   form.parse(req, (err, fields, files) => {
  //     if (err) reject(err);
  //     resolve({ fields, files });
  //   });
  // });

  // return promise.then(({ fields, files }: any) => {
  //   console.log(files.file[0].originalFilename);
  // });
}
