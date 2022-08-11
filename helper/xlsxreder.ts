import * as reader from "xlsx";

// Reading our test file
const file = reader.readFile("./output/Materials.xlsx");

export const getXlsxValues = async () => {
  let data = [] as any;

  const sheets = file.SheetNames;

  for (let i = 0; i < sheets.length; i++) {
    const temp = await reader.utils.sheet_to_json(
      file.Sheets[file.SheetNames[i]]
    );

    temp.forEach((res) => {
      data.push(res);
    });
  }
  return data.reduce((acc, val) => {
    acc[val.Types] = val;
    return acc;
  }, {});
};
