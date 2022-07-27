import * as React from "react";
import ArticleIcon from "@mui/icons-material/Article";
import { ItemData } from "./ItemData";
import LinearIndeterminate from "./Loading";

export interface Project {
  itemId: {
    label: string;
    id: string;
    rootFolderId: string;
  };
}

export interface RootObject {
  projectName: string;
  projectId: string;
  versionId: string;
  versionType: string;
  derivativesId: string;
  createUserName: string;
  fileType: string;
  createTime: Date;
  lastModifiedTime: Date;
  lastModifiedUserName: string;
  storageSize: number;
  fileName: string;
  extension: string;
  originalItemUrn: string;
  projectGuid: string;
  downloadItem: string;
  publishStatus: string;
}
export const Items = ({ itemId }: Project) => {
  const [loading, setLoading] = React.useState(false);
  const [itemsDetails, setItemsDetails] = React.useState<RootObject[]>([]);
  const [ItemById, setItemById] = React.useState<RootObject>("");

  const getItems = async () => {
    setLoading(true);
    const result = await fetch(
      `http://10.25.38.36:9090/projects/${itemId.id}`
    ).then((r) => r.json());

    setLoading(false);
    setItemsDetails(result);
  };

  React.useEffect(() => {
    getItems();

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [itemId.id]);

  if (loading) {
    return (
      <div
        style={{
          width: "100vm",
          position: "absolute",
        }}
      >
        <LinearIndeterminate />
      </div>
    );
  }
  return (
    <div
      style={{
        display: "flex",
        flexDirection: "row",
        justifyContent: "space-between",
      }}
    >
      <div style={{ flex: "0.3" }}>
        <div style={{ marginTop: "1em" }}>
          {itemsDetails.map((item) => (
            <div
              key={item.versionId}
              style={{ display: "flex", cursor: "pointer", padding: "0 1rem" }}
              onClick={() => {
                setItemById(item);
              }}
            >
              <div>
                <ArticleIcon />
              </div>
              <div> {item.fileName}</div>
            </div>
          ))}
        </div>
      </div>
      <div style={{ flex: "0.6", marginRight: "1rem", marginTop: "-5rem" }}>
        {ItemById && <ItemData loading={loading} itemDetails={ItemById} />}
      </div>
    </div>
  );
};
