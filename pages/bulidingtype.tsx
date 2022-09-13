import React from "react";

import CottageOutlinedIcon from "@mui/icons-material/CottageOutlined";
import RoomPreferencesOutlinedIcon from "@mui/icons-material/RoomPreferencesOutlined";
import LocationCityOutlinedIcon from "@mui/icons-material/LocationCityOutlined";
import {
  Grid,
  Card,
  Typography,
  Button,
  Radio,
  RadioGroup,
  FormControlLabel,
  FormControl,
  TextField,
} from "@mui/material";

// const label = { inputProps: { "aria-label": "Checkbox demo" } };

const bulidingtype = () => {
  // eslint-disable-next-line react-hooks/rules-of-hooks
  const [input, setInput] = React.useState(() => "office");
  // eslint-disable-next-line react-hooks/rules-of-hooks
  const [inputNumber, setInputNumber] = React.useState("");
  // eslint-disable-next-line react-hooks/rules-of-hooks
  const [result, setResult] = React.useState("");

  const getResult = () => {
    if (!input || !inputNumber) {
      alert("fill both ");
    }
    const priceType = { office: 50, hotel: 60, house: 70 };

    const result = Number(priceType[input]) * +inputNumber;

    setResult(result);
  };

  return (
    <>
      <Grid
        container
        spacing={4}
        display="flex"
        alignItems={"center"}
        justifyContent="center"
      >
        <Grid item>
          <Card
            sx={{
              display: "flex",
              flexDirection: "column",
              height: "30rem",
              width: "30rem",
              marginTop: " 5rem",
              backgroundColor: "#415a77",
            }}
          >
            <Grid>
              <Typography
                variant="h5"
                align="center"
                color={"textPrimary"}
                gutterBottom
                paddingTop={2}
              >
                Select Option
              </Typography>
              <Grid display="flex" paddingLeft={4} flexDirection={"column"}>
                {/* <Typography variant="h6" color={"textPrimary"}>
                  Housing Price
                </Typography> */}
                <Grid display="flex" marginTop={1}>
                  <FormControl>
                    <RadioGroup
                      aria-labelledby="demo-radio-buttons-group-label"
                      value={input}
                      name="radio-buttons-group"
                      onChange={(
                        event: React.ChangeEvent<HTMLInputElement>
                      ) => {
                        setInput(event.target.value);
                      }}
                    >
                      <Grid
                        display="flex"
                        // marginTop={1}
                        justifyContent="center"
                        alignContent={"center"}
                      >
                        <Grid>
                          <CottageOutlinedIcon fontSize="large" />
                        </Grid>
                        <Grid style={{ paddingLeft: "1rem" }}>
                          <FormControlLabel
                            value="house"
                            control={<Radio />}
                            label="House"
                          />
                        </Grid>
                      </Grid>
                      <Grid
                        display="flex"
                        // marginTop={1}
                        justifyContent="center"
                        alignContent={"center"}
                      >
                        <Grid>
                          <LocationCityOutlinedIcon fontSize="large" />
                        </Grid>
                        <Grid style={{ paddingLeft: "1rem" }}>
                          <FormControlLabel
                            value="hotel"
                            control={<Radio />}
                            label="Hotel"
                          />
                        </Grid>
                      </Grid>
                      <Grid
                        display="flex"
                        // marginTop={1}
                        justifyContent="center"
                        alignContent={"center"}
                      >
                        <Grid>
                          <RoomPreferencesOutlinedIcon fontSize="large" />
                        </Grid>
                        <Grid style={{ paddingLeft: "1rem" }}>
                          <FormControlLabel
                            value="office"
                            control={<Radio />}
                            label="Office"
                          />
                        </Grid>
                      </Grid>
                    </RadioGroup>
                  </FormControl>
                </Grid>
              </Grid>
            </Grid>

            <Grid marginTop={5}>
              <Grid
                sx={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "space-around",

                  flexDirection: "column",
                }}
              >
                <TextField
                  required
                  id="outlined-required"
                  label="Add Unit"
                  defaultValue={0}
                  color="primary"
                  // type={"number"}
                  onChange={(
                    event: React.ChangeEvent<
                      HTMLTextAreaElement | HTMLInputElement
                    >
                  ) => setInputNumber(event.target.value)}
                />
                <Grid
                  sx={{
                    padding: "1rem",
                  }}
                >
                  <Button onClick={getResult} variant="contained">
                    Go
                  </Button>
                </Grid>
                <Typography
                  variant="h5"
                  align="center"
                  color={"whitesmoke"}
                  gutterBottom
                >
                  Price:{result + "  kr"}
                </Typography>
              </Grid>
            </Grid>
          </Card>
        </Grid>
      </Grid>
    </>
  );
};

export default bulidingtype;
