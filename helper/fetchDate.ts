import { getDate } from "./getData";

const ForgeSDK = require("forge-apis");
const xlsx = require("xlsx");
const { ModelDerivativeClient, ManifestHelper } = require("forge-server-utils");
// const { SvfReader, GltfWriter } = require("forge-convert-utils");
const { default: axios } = require("axios");

async function delay(ms: number) {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      resolve();
    }, ms);
  });
}

const FORGE_CLIENT_ID = "7KQ4vqb7uJFWgWYgNRnhE6T5ZDnbxPcn";
const FORGE_CLIENT_SECRET = "GMgjs3ljOpfRLuMW";

export const fetchData = async (urn: string) => {
  let gGuid = "";
  const auth = {
    client_id: FORGE_CLIENT_ID,
    client_secret: FORGE_CLIENT_SECRET,
  };
  const modelDerivativeClient = new ModelDerivativeClient(auth);

  const manifestHelper = new ManifestHelper(
    await modelDerivativeClient.getManifest(urn)
  );
  const derivatives = manifestHelper.search({
    type: "resource",
    role: "graphics",
  });

  for (const derivative of derivatives.filter((d: any) => {
    if (
      d.mime === "application/autodesk-svf" && //how about otg & svf2
      d.urn.includes("New Construction.svf")
    ) {
      return true;
    } else return false;
  })) {
    gGuid = derivative.guid;
  }

  const properties = await getModelviewProperties(urn, gGuid);
  const projectMetaData = properties?.data?.collection;

  const resultData = hasIdentityData(projectMetaData).filter((item: any) => {
    return (
      item.name.includes("Basic Wall") ||
      item.name.includes("Floor") ||
      item.name.includes("Basic Roof")
    );
  });

  const result = getDate(resultData);

  const groupBy = Object.keys(result);
  const dataObj = Object.values(result);

  const yy = dataObj.map((d, idx) => {
    const val = Object.values(d);

    return val;
  });

  const newWB = xlsx.utils.book_new();
  groupBy.forEach((val, idx) => {
    const newWS = xlsx.utils.json_to_sheet(yy[idx]);

    xlsx.utils.book_append_sheet(newWB, newWS, val);
    xlsx.writeFile(newWB, "output/metadata_cost.xlsx");
  });

  return result;
};

async function getModelviewProperties(urn: string, guid: string) {
  const credentials = await oAuth2();

  //   const guidd = new ForgeSDK.DerivativesApi();

  while (true) {
    try {
      const url = `	https://developer.api.autodesk.com/modelderivative/v2/designdata/${urn}/metadata/${guid}/properties`;
      const response = await axios({
        method: "GET",
        url,
        params: {
          forceget: true,
        },
        headers: {
          "content-type": "application/vnd.api+json",
          Authorization: `Bearer ${credentials}`,
          "x-user-id": "4RL5NPRJ3LNM",
          "x-ads-derivative-format": "fallback",
        },
      });
      if (response.status === 202) {
        return ` Status:${response.status} Preparing json data for model`;
        await delay(10 * 1000);
        continue;
      } else {
        return response.data;
      }
    } catch (error) {
      return error;
    }
  }
}

//hasIdentityData
const hasIdentityData = (arr) => {
  const eltCollection = arr?.filter((elt) => {
    if (
      elt.properties["Identity Data"] &&
      elt.properties["Identity Data"]["Type Name"]
    ) {
      return true;
    } else return false;
  });

  return eltCollection;
};

const oAuth2TwoLegged = new ForgeSDK.AuthClientTwoLegged(
  FORGE_CLIENT_ID,
  FORGE_CLIENT_SECRET,
  ["data:read", "data:create", "data:write"],
  false
);

async function oAuth2() {
  const credentials = await oAuth2TwoLegged.authenticate();

  return credentials.access_token;
}
