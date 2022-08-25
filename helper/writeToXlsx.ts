import xlsx from "xlsx";

export const writeToXlsx = async (result: any) => {
  const groupBy = Object.keys(result);
  const dataObj = Object.values(result);

  const yy = dataObj.map((d, idx) => {
    const val = Object.values(d);

    return val;
  });

  const newWB = xlsx.utils.book_new();
  groupBy.forEach((val, idx) => {
    const newWS = xlsx.utils.json_to_sheet(yy[idx]);

    xlsx.utils.book_append_sheet(newWB, newWS, val);
    xlsx.writeFile(newWB, "output/metadata_cost.xlsx");
  });
};
