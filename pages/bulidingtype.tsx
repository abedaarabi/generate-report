import React from "react";
import CottageOutlinedIcon from "@mui/icons-material/CottageOutlined";
import Checkbox from "@mui/material/Checkbox";
import RoomPreferencesOutlinedIcon from "@mui/icons-material/RoomPreferencesOutlined";
import LocationCityOutlinedIcon from "@mui/icons-material/LocationCityOutlined";
import { Button } from "../components/btn/Button";
const label = { inputProps: { "aria-label": "Checkbox demo" } };
const bulidingtype = () => {
  return (
    <div>
      <div
        style={{
          display: "flex",
          justifyContent: "flex-start",
          padding: "1rem 2rem",
          width: "30px",
        }}
      >
        <Button style={{ backgroundColor: "#e63946" }} href={"/"}>
          Back
        </Button>
      </div>
      <div
        style={{
          width: "20rem",
          height: "20rem",
          backgroundColor: "#f3e9dc",
          margin: " 2rem 2rem",
          borderRadius: "6px",
          boxShadow: " 0 1px 6px rgba(0, 0, 0, 0.2)",
        }}
      >
        <h3
          style={{
            padding: "1rem 1rem",
          }}
        >
          Please type:
        </h3>
        <div
          style={{
            display: "flex",
            padding: "0rem 2rem",
            alignItems: "center",
          }}
        >
          <p
            style={{
              padding: "0 1rem",
            }}
          >
            House
          </p>
          <CottageOutlinedIcon fontSize="large" />
          <Checkbox {...label} defaultChecked />
        </div>
        <div
          style={{
            display: "flex",
            padding: "0rem 2rem",
            alignItems: "center",
          }}
        >
          <p
            style={{
              padding: "0 1rem",
            }}
          >
            House
          </p>
          <LocationCityOutlinedIcon fontSize="large" />
          <Checkbox {...label} defaultChecked />
        </div>
        <div
          style={{
            display: "flex",
            padding: "0rem 2rem",
            alignItems: "center",
          }}
        >
          <p
            style={{
              padding: "0 1rem",
            }}
          >
            House
          </p>
          <RoomPreferencesOutlinedIcon fontSize="large" />
          <Checkbox {...label} defaultChecked />
        </div>
      </div>
    </div>
  );
};

export default bulidingtype;
