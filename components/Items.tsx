import * as React from "react";
import ArticleIcon from "@mui/icons-material/Article";
import { ItemData } from "./ItemData";
import LinearIndeterminate from "./Loading";
import { useLazyGetItemQuery } from "../features/api/getItems";

export interface Project {
  itemId:
    | {
        label: string;
        id: string;
        rootFolderId: string;
      }
    | undefined;

  xlsx: any;
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
export const Items = ({ itemId, xlsx }: Project) => {
  const [ItemById, setItemById] = React.useState<RootObject | null>(null);

  // const { data, isLoading, refetch } = useGetItemQuery(itemId.id);
  const [trigger, { isLoading, data }] = useLazyGetItemQuery();

  React.useEffect(() => {
    if (itemId) {
      trigger(itemId.id);
    }
  }, [itemId, trigger, xlsx]);

  if (isLoading) {
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
          {data &&
            data?.map((item) => {
              return (
                <div
                  key={item.versionId}
                  style={{
                    display: "flex",
                    cursor: "pointer",
                    padding: "0 1rem",
                  }}
                  onClick={() => {
                    setItemById(item);
                  }}
                >
                  <ArticleIcon />
                  {item.fileName}
                </div>
              );
            })}
        </div>
      </div>

      <div style={{ flex: "0.6", marginRight: "1rem", marginTop: "-11rem" }}>
        {(ItemById || xlsx) && (
          <ItemData
            loading={isLoading}
            itemDetails={ItemById}
            xlsxData={xlsx}
          />
        )}
      </div>
    </div>
  );
};
