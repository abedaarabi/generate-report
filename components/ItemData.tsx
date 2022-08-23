import React from "react";
import { useItemContentQuery } from "../features/api/getItems";
import DataTable from "./Datatable";
import { RootObject } from "./Items";
import LinearIndeterminate from "./Loading";

export const ItemData = ({
  itemDetails,
}: {
  itemDetails: RootObject;
  loading: boolean;
}) => {
  const { isLoading, data, isFetching } = useItemContentQuery(
    itemDetails.derivativesId
  );

  if (isLoading || isFetching) {
    return (
      <div style={{ flex: "1" }}>
        <LinearIndeterminate />
      </div>
    );
  }

  return (
    <div>
      <div
        style={{
          color: "gray",
        }}
      >
        <h4 style={{ color: "#43a047", textDecoration: "underline" }}>
          {itemDetails.fileName}:{" "}
        </h4>
      </div>

      {data?.response ? (
        <DataTable
          data={data?.response}
          loading={isLoading}
          fileName={itemDetails.fileName}
        />
      ) : (
        []
      )}
    </div>
  );
};
