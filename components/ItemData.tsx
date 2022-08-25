import React from "react";
import { useLazyItemContentQuery } from "../features/api/getItems";
import DataTable from "./Datatable";
import { RootObject } from "./Items";
import LinearIndeterminate from "./Loading";

export const ItemData = ({
  itemDetails,
  xlsxData,
}: {
  xlsxData: any;
  itemDetails: RootObject | undefined | null;
  loading: boolean;
}) => {
  // const { isLoading, data, isFetching } = useItemContentQuery(
  //   itemDetails.derivativesId
  // );

  const [trigger, { isLoading, data, isFetching }] = useLazyItemContentQuery();

  React.useEffect(() => {
    if (itemDetails) {
      trigger(itemDetails.derivativesId);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [itemDetails, xlsxData]);
  React.useEffect(() => {}, [, xlsxData]);

  if (isLoading || isFetching) {
    return (
      <div style={{ flex: "1" }}>
        <LinearIndeterminate />
      </div>
    );
  }
  const file = !itemDetails?.fileName
    ? `Material List -  ${new Date().toUTCString()}`
    : itemDetails?.fileName;


  return (
    <div>
      <div
        style={{
          color: "gray",
        }}
      >
        <h4 style={{ color: "#43a047", textDecoration: "underline" }}>
          {file}
        </h4>
      </div>

      {data?.response || xlsxData ? (
        <DataTable
          data={data?.response || xlsxData}
          loading={isLoading}
          fileName={file}
        />
      ) : (
        []
      )}
    </div>
  );
};
