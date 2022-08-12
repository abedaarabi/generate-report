import { getXlsxValues } from "./xlsxreder";

export async function getDate(data) {
  const xlsx = await getXlsxValues();

  const obj1 = data.reduce((acc, element) => {
    const wallName = element.name;

    const wWallName = wallName.includes("med")
      ? wallName.split("med")[0]
      : wallName.split("[")[0];
    acc[wWallName] = {};
    return acc;
  }, {});

  for (let wall of data) {
    const wallTypes = wall["Type Name"];

    const unit = xlsx[wallTypes] ? xlsx[wallTypes]["Written Uint"] : "no unit";

    const elementByUnit = wall[unit];

    let totalByUnit = 0;
    if (unit === "Volume") {
      totalByUnit = Number(elementByUnit.split("m^3")[0]);
    } else if (unit === "Area") {
      totalByUnit = Number(elementByUnit.split("m^2")[0]);
    } else if (unit === "Length") {
      totalByUnit = Number(elementByUnit.split("mm")[0]) / 1000;
    } else if (unit === "Count") {
      totalByUnit++;
    }

    const wallName = wall.name;
    const wWallName = wallName.includes("med")
      ? wallName.split("med")[0]
      : wallName.split("[")[0];

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
    obj1[wWallName][wallTypes]["Total"] += totalByUnit;
    obj1[wWallName][wallTypes]["Unit"] = xlsx[wallTypes]
      ? xlsx[wallTypes]["Units"]
      : "no unit";

    obj1[wWallName][wallTypes].id = wall.externalId;
    obj1[wWallName][wallTypes]["Total Price"] += xlsx[wallTypes]
      ? totalByUnit * +xlsx[wallTypes]["Price per unit"]
      : 0;

    obj1[wWallName][wallTypes].Sum++;

    obj1[wWallName][wallTypes]["Total Hours"] += xlsx[wallTypes]
      ? totalByUnit * xlsx[wallTypes]["Hours per unit"]
      : 0;
  }

  return obj1;
}
