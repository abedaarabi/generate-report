import * as React from "react";
import TextField from "@mui/material/TextField";
import Autocomplete from "@mui/material/Autocomplete";
import { Items, Project } from "./Items";

export interface ProjectType {
  projects: {
    label: string;
    id: string;
    rootFolderId: string;
  }[];
}

export const Projects = ({ projects }: ProjectType) => {
  const [loading, setLoading] = React.useState(false);

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

  return (
    <div>
      <div style={{ marginTop: "1em", padding: "0 1rem" }}>
        {projects && (
          <Autocomplete
            disablePortal
            id="combo-box-demo"
            options={projects}
            onChange={handleItemId}
            sx={{ width: 300 }}
            renderInput={(params) => <TextField {...params} label="Projects" />}
          />
        )}
      </div>

      <div>{itemDetails?.id && <Items itemId={itemDetails} />}</div>
    </div>
  );
};
