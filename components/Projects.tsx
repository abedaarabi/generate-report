import * as React from "react";
import TextField from "@mui/material/TextField";
import Autocomplete from "@mui/material/Autocomplete";
import { Items, Project } from "./Items";
import { ReadXlsx } from "./ReadXlsx";
import { useSelector, useDispatch } from "react-redux";
import { increment } from "../features/xlsxData/xlsxReducer";
import DataTable from "./Datatable";
export interface ProjectType {
  projects: {
    label: string;
    id: string;
    rootFolderId: string;
  }[];
}

export const Projects = ({ projects }: ProjectType) => {
  const [loading, setLoading] = React.useState(false);
  const dispatch = useDispatch();
  const { excelData } = useSelector((state) => state as any);
  const xlsxData = excelData.date.payload;
  const [itemDetails, setItemDetails] = React.useState<Project["itemId"]>();
  const handleItemId = (
    event: React.SyntheticEvent<Element, Event>,
    value: Project["itemId"]
  ) => {
    setLoading(!loading);
    setItemDetails(value);
  };
  React.useEffect(() => {
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [loading]);

  const handelData = (data) => {
    dispatch(increment(data.response));
    // console.log("abed", data.response);
  };

  return (
    <div>
      <div>
        <div style={{ margin: "1em", padding: "0 1rem" }}>
          <div style={{ margin: "1em 0" }}>
            <div style={{ display: "flex", alignItems: "center" }}>
              <ReadXlsx
                title="Upload Material List"
                color="secondary"
                btnData={handelData}
              />
              <div style={{ paddingLeft: "10px" }}>
                <ReadXlsx title=" Download Template" color="success" btn />
              </div>
            </div>
          </div>
          <h4 style={{ color: "#3a86ff", marginBottom: "5px" }}>
            BIM 360 Projects:
          </h4>
          {projects && (
            <Autocomplete
              disablePortal
              id="combo-box-demo"
              options={projects}
              onChange={handleItemId}
              sx={{ width: 300 }}
              renderInput={(params) => (
                <TextField {...params} label="Projects" />
              )}
            />
          )}
        </div>
      </div>
      <div style={{ padding: "0 1rem" }}>
        {itemDetails?.id && <Items itemId={itemDetails} />}
      </div>
      <div style={{ padding: "0 1rem" }}>
        {xlsxData && <DataTable xlsx={xlsxData} />}
      </div>
    </div>
  );
};
