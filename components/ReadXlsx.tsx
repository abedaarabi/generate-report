import React from "react";
import Button from "@mui/material/Button";

const xlsx = require("xlsx");
import axios from "axios";
var fileDownload = require("js-file-download");

import { useDispatch } from "react-redux";
import { increment } from "../features/xlsxData/xlsxReducer";
interface ReadXlsxProps {
  title: string;
  color?:
    | "inherit"
    | "primary"
    | "secondary"
    | "success"
    | "error"
    | "info"
    | "warning"
    | undefined;
  btn?: boolean;
}
export const ReadXlsx = ({ title, color, btn }: ReadXlsxProps) => {
  const [loadingXlsx, setLoadingXlsx] = React.useState(false);
  const dispatch = useDispatch();
  // const uploadToClient = (event: { target: { files: any[] } }) => {
  //   if (event.target.files && event.target.files[0]) {
  //     const i = event.target;

  //     setImage(i);
  //   }
  // };

  const uploadToServer = async (data) => {
    await fetch("/api/xlsxdata", {
      body: JSON.stringify(data),
      headers: {
        "Content-Type": "application/json",
      },
      method: "POST",
    })
      .then(function (response) {
        return response.json();
      })
      .then(function (data) {
        dispatch(increment(data.response));
      });
  };

  const readUploadFile = (e: any) => {
    e.preventDefault();
    if (e.target.files) {
      const reader = new FileReader();
      try {
        reader.onload = async (e) => {
          const data = e.target.result;

          const workbook = xlsx.read(data, { type: "array" });
          const sheetName = workbook.SheetNames[0];
          const worksheet = workbook.Sheets[sheetName];
          const json = await xlsx.utils.sheet_to_json(worksheet);

          await uploadToServer(json);
        };
        reader.readAsArrayBuffer(e.target.files[0]);
      } catch (error) {
        throw new Error("Select File");
      }
    }
  };

  const downloadXlsxTemp = async () => {
    setLoadingXlsx(true);
    const { data } = await axios.get("/api/download?fileName=temp", {
      responseType: "blob",
    });

    const pdfBlob = new Blob([data]);

    setLoadingXlsx(false);
    return fileDownload(pdfBlob, `cost-template.xlsx`);
  };

  return (
    <div>
      {btn ? (
        <Button variant="contained" color={color} onClick={downloadXlsxTemp}>
          {loadingXlsx ? "preparing the file..." : "Download Data in Excel"}
        </Button>
      ) : (
        <Button variant="contained" component="label" color={color}>
          {title}
          <input type="file" hidden onChange={readUploadFile} />
        </Button>
      )}
    </div>
  );
};
