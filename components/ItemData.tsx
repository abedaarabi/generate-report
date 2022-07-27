import React from "react";
import DataTable from "./Datatable";
import { RootObject } from "./Items";
import LinearIndeterminate from "./Loading";

export const ItemData = ({
  itemDetails,
}: {
  itemDetails: RootObject;
  loading: boolean;
}) => {
  const [responseElement, setResponseElement] = React.useState({});
  const [loading, setLoading] = React.useState(false);
  const postById = async () => {
    if (!itemDetails) return;
    setLoading(true);
    const { response } = await fetch(`api/${itemDetails.derivativesId}`).then(
      (r) => r.json()
    );
    setLoading(false);

    setResponseElement(response);
  };

  React.useEffect(() => {
    postById();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [itemDetails]);

  if (loading) {
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

      <DataTable
        data={responseElement}
        loading={loading}
        fileName={itemDetails.fileName}
      />
    </div>
  );
};
