import "../styles/globals.css";
import type { AppProps } from "next/app";
import { store } from "../store/itemStore";
import { Provider } from "react-redux";

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <>
      <Provider store={store}>
        <div
          style={{
            // backgroundColor: "#3a86ff",
            backgroundColor: "#0077b6",
            height: "3rem",
            alignItems: "center",
            display: "flex",
          }}
        >
          <h2
            style={{
              paddingLeft: "2.2rem",
              color: "white",
              letterSpacing: "2px",
            }}
          >
            Auto Cost Report | CO2 Calculator
          </h2>
        </div>
        <Component {...pageProps} />;
      </Provider>
    </>
  );
}

export default MyApp;
