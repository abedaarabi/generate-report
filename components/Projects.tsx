import * as React from "react";
import TextField from "@mui/material/TextField";
import Autocomplete from "@mui/material/Autocomplete";
import { Items, Project } from "./Items";
import { ReadXlsx } from "./ReadXlsx";
import { useSelector } from "react-redux";
import { Button } from "./btn/Button";

export interface ProjectType {
  projects: {
    label: string;
    id: string;
    rootFolderId: string;
  }[];
}

export const Projects = ({ projects }: ProjectType) => {
  const [loading, setLoading] = React.useState(false);

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
  }, [loading, xlsxData]);

  return (
    <div>
      <div>
        <div style={{ margin: "1em", padding: "0 1rem" }}>
          <div style={{ margin: "1em 0" }}>
            <div style={{ display: "flex", alignItems: "center" }}>
              <div
                style={{
                  margin: "10px",
                }}
              >
                <Button style={{ backgroundColor: "#e63946" }} href={"/"}>
                  Back
                </Button>
              </div>
              <ReadXlsx title="Upload Material List" color="secondary" />
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
        {(itemDetails?.id || xlsxData) && (
          <Items itemId={itemDetails} xlsx={xlsxData} />
        )}
      </div>
    </div>
  );
};
