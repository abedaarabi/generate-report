import "../styles/globals.css";
import type { AppProps } from "next/app";
import { store } from "../store/itemStore";
import { Provider } from "react-redux";
import { Typography } from "@mui/material";

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <>
      <Provider store={store}>
        <div
          style={{
            // backgroundColor: "#3a86ff",
            backgroundColor: "#0077b6",
            height: "5rem",
            alignItems: "center",
            display: "flex",
          }}
        >
          <Typography
            sx={{
              paddingLeft: "2.2rem",
              color: "white",
              letterSpacing: "2px",
            }}
            gutterBottom
            variant="h5"
            component="div"
          >
            Auto Cost Report | CO2 Calculator
          </Typography>
        </div>
        <Component {...pageProps} />;
      </Provider>
    </>
  );
}

export default MyApp;
