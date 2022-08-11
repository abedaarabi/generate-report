import { getXlsxValues } from "./xlsxreder";

export async function getDate(data) {
  const xlsx = await getXlsxValues();

  const obj1 = data.reduce((acc, elment) => {
    const wallName = elment.name;
    const wWallName = wallName.split("[")[0];
    acc[wWallName] = {};
    return acc;
  }, {});

  for (let wall of data) {
    const wallTypes = wall.properties["Identity Data"]["Type Name"];
    const foundation = wall.properties["Dimensions"]["Volume"];
    const totalVolume = Number(foundation.split("m^3")[0]);
    const unit = xlsx[wallTypes] ? xlsx[wallTypes]["Written Uint"] : "no unit";

    const wallArea = wall.properties["Dimensions"][unit];

    // const totalArea = Number(wallArea.split("m^2")[0]);
    // console.log(totalArea);
    const wallName = wall.name;
    const wWallName = wallName.split("[")[0];

    if (!obj1[wWallName][wallTypes]) {
      obj1[wWallName][wallTypes] = {
        [wWallName + "- Types"]: wallTypes,
        Sum: 0,
        id: "",
        ["Total"]: 0,
        ["Unit"]: "",
        ["Total Price"]: 0,
        ["Total Hours"]: 0,
      };
    }
    obj1[wWallName][wallTypes]["Total"] += totalVolume;
    obj1[wWallName][wallTypes]["Unit"] = xlsx[wallTypes]
      ? xlsx[wallTypes]["Unit"]
      : "no unit";

    obj1[wWallName][wallTypes].id = wall.externalId;
    obj1[wWallName][wallTypes]["Total Price"] += xlsx[wallTypes]
      ? totalVolume * +xlsx[wallTypes]["Price"]
      : 0;

    obj1[wWallName][wallTypes].Sum++;

    obj1[wWallName][wallTypes]["Total Hours"] += xlsx[wallTypes]
      ? totalVolume * xlsx[wallTypes]["Hour"]
      : 0;
  }

  return obj1;
}
