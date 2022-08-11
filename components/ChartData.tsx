import React from "react";
import { Line, Bar, Pie } from "react-chartjs-2";
import Chart from "chart.js/auto";
import { CategoryScale } from "chart.js";

const ChartData = ({ data, allElement }: any) => {
  Chart.register(CategoryScale);
  const label1 = Object.keys(allElement);
  const data1 = label1.map((i) => {
    return Object.values(allElement[i])
      .flat()
      .reduce(
        (acc, val) => {
          const price = acc["price"] + val["Total Price"];
          const hours = acc["hours"] + val["Total Hours"];

          return { price, hours };
        },
        { price: 0, hours: 0 }
      );
  });

  console.log(data1.map((i) => i["hours"]));

  return (
    <div style={{ marginBottom: "1rem" }}>
      {
        <>
          <div>
            <h4 style={{ color: "#2196f3" }}>
              Total Price:{" "}
              {data1.map((i) => i["price"]).reduce((acc, val) => acc + val)}
            </h4>
            <h4 style={{ color: "#2196f3" }}>
              Total Hours:{" "}
              {data1.map((i) => i["hours"]).reduce((acc, val) => acc + val)}
            </h4>
          </div>
          <Bar
            height={150}
            width={650}
            datasetIdKey="id"
            data={{
              labels: label1 || [],
              datasets: [
                {
                  label: "Price",
                  data: data1.map((i) => i.price) || [],
                  //@ts-ignore
                  backgroundColor: [
                    "rgba(255, 99, 132, 1)",
                    "rgba(54, 162, 235, 1)",
                    "rgba(255, 206, 86, 1)",
                    "rgba(75, 192, 192, 1)",
                    "rgba(153, 102, 255, 1)",
                    "rgba(255, 159, 64, 1)",
                  ],
                  //@ts-ignore
                  borderColor: [
                    "rgba(255, 99, 132, 1)",
                    "rgba(54, 162, 235, 1)",
                    "rgba(255, 206, 86, 1)",
                    "rgba(75, 192, 192, 1)",
                    "rgba(153, 102, 255, 1)",
                    "rgba(255, 159, 64, 1)",
                  ],
                  borderWidth: 1,
                },
              ],
            }}
          />
          <Bar
            height={150}
            width={650}
            datasetIdKey="id"
            data={{
              labels: label1 || [],
              datasets: [
                {
                  label: "Hours",
                  data: data1.map((i) => i.hours) || [],
                  //@ts-ignore
                  backgroundColor: [
                    "rgba(255, 99, 132, 1)",
                    "rgba(54, 162, 235, 1)",
                    "rgba(255, 206, 86, 1)",
                    "rgba(75, 192, 192, 1)",
                    "rgba(153, 102, 255, 1)",
                    "rgba(255, 159, 64, 1)",
                  ],
                  //@ts-ignore
                  borderColor: [
                    "rgba(255, 99, 132, 1)",
                    "rgba(54, 162, 235, 1)",
                    "rgba(255, 206, 86, 1)",
                    "rgba(75, 192, 192, 1)",
                    "rgba(153, 102, 255, 1)",
                    "rgba(255, 159, 64, 1)",
                  ],
                  borderWidth: 1,
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
