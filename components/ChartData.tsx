import React from "react";
import { Line } from "react-chartjs-2";
import Chart from "chart.js/auto";
import { CategoryScale } from "chart.js";

const ChartData = ({ data }: any) => {
  Chart.register(CategoryScale);

  const labels = data.map(
    (i) =>
      i["Basic Wall - Types"] || i["Floor - Types"] || i["Basic Roof - Types"]
  );
  const price = data.map((i) => i["Total Price"]);
  const hours = data.map((i) => i["Total Hours"]);

  return (
    <div style={{ marginBottom: "1rem" }}>
      {
        <>
          <h4 style={{ color: "#2196f3" }}>
            Total Price:{" "}
            {price.length === 0
              ? "Select element"
              : price.reduce((acc, val) => {
                  acc + val;
                  return acc;
                })}
          </h4>
          <Line
            height={150}
            width={650}
            datasetIdKey="id"
            data={{
              labels: labels || [],
              datasets: [
                {
                  label: "Price",
                  data: price || [],
                  //@ts-ignore
                  backgroundColor: ["rgba(255, 159, 64, 0.2)"],
                  //@ts-ignore
                  borderColor: [
                    "rgba(255, 99, 132, 1)",
                    "rgba(54, 162, 235, 1)",
                    "rgba(255, 206, 86, 1)",
                    "rgba(75, 192, 192, 1)",
                    "rgba(153, 102, 255, 1)",
                    "rgba(255, 159, 64, 1)",
                  ],
                  borderWidth: 3,
                },
              ],
            }}
          />
          <h4 style={{ color: "#2196f3" }}>
            Total Hours:{" "}
            {hours.length === 0
              ? "Select element"
              : hours.reduce((acc, val) => acc + val)}
          </h4>
          <Line
            height={150}
            width={650}
            datasetIdKey="id"
            data={{
              labels: labels || [],
              datasets: [
                {
                  label: "Hours",
                  data: hours || [],
                  //@ts-ignore
                  backgroundColor: ["rgba(255, 99, 132, 0.2)", ,],
                  //@ts-ignore
                  borderColor: [
                    "rgba(255, 99, 132, 1)",
                    "rgba(54, 162, 235, 1)",
                    "rgba(255, 206, 86, 1)",
                    "rgba(75, 192, 192, 1)",
                    "rgba(153, 102, 255, 1)",
                    "rgba(255, 159, 64, 1)",
                  ],
                  borderWidth: 3,
                },
              ],
            }}
          />
        </>
      }
    </div>
  );
};

export default ChartData;
