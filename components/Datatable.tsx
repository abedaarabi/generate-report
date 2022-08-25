import * as React from "react";
import TextField from "@mui/material/TextField";
import Autocomplete from "@mui/material/Autocomplete";
import Button from "@mui/material/Button";

import { DataGrid } from "@mui/x-data-grid";
var fileDownload = require("js-file-download");
import axios from "axios";

import ChartData from "./ChartData";

export default function DataTable({
  data,
  loading,
  fileName,
  xlsx,
}: any | undefined) {
  const [tableElement, setTableElement] = React.useState({
    columns: [],
    tableData: [],
  });
  const [loadingXlsx, setLoadingXlsx] = React.useState(false);

  const options = Object.keys(data || xlsx) || [];

  const handelElement = (event: React.SyntheticEvent<any>, value: string) => {
    if (!data) return;
    try {
      const tableData = Object.values(data[value] || xlsx[value]);

      const columns = Object.keys(tableData[0]).map((i) => {
        if (i === "Sum" || i === "id") {
          return {
            field: i,
            headerName: i,
            width: 80,
          };
        } else if (i === "Basic Wall - Types") {
          return {
            field: i,
            headerName: i,
            width: 180,
          };
        }
        return {
          field: i,
          headerName: i,
          width: 140,
        };
      });

      setTableElement({ tableData, columns });
    } catch (error) {}
  };

  React.useEffect(() => {
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [xlsx]);

  return (
    <div
      style={{
        width: "100%",
        display: "flex",
        flexDirection: "column",
      }}
    >
      <div style={{ margin: "1em 0" }}></div>
      <div>
        <ChartData
          labels={tableElement.tableData}
          data={tableElement.tableData}
          allElement={data || xlsx}
        />
      </div>
      <div
        style={{
          width: "100%",
          display: "flex",
          justifyContent: "space-around",
          alignItems: "center",
        }}
      >
        <div>
          <Autocomplete
            disablePortal
            id="combo-box-demo"
            options={options}
            onChange={handelElement}
            sx={{ width: 300 }}
            renderInput={(params) => (
              <TextField {...params} label="Element Type" />
            )}
          />
        </div>
        <div>
          <Button
            style={{ height: "55px" }}
            variant="contained"
            disabled={loading || loadingXlsx}
            onClick={async () => {
              setLoadingXlsx(true);
              const { data } = await axios.get("/api/download", {
                responseType: "blob",
              });

              const pdfBlob = new Blob([data]);

              setLoadingXlsx(false);
              return fileDownload(pdfBlob, `${fileName}.xlsx`);
            }}
            type="button"
          >
            {loadingXlsx ? "preparing the file..." : "Download Data in Excel"}
          </Button>
        </div>
      </div>

      <div style={{ marginTop: "1em" }}>
        <DataGrid
          rows={tableElement.tableData}
          columns={tableElement.columns}
          pageSize={5}
          rowsPerPageOptions={[5]}
          checkboxSelection
          autoHeight
        />
      </div>
    </div>
  );
}
