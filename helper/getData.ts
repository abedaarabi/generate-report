//Price and Units

const wallPrices = {
  //Price for each wall type
  "Sandwichelement - 480mm": 4200,
  "Sandwichelement - 450mm": 4000,
  "Beton vægelement - 150mm": 1300,
  "Fundament - 900mm": 5500,
  "Beton bagvægs sternelement  - 240mm": 5500,
  "Huldæk - 180mm": 5500,
  "Generic - 400mm": 5900,
};
const hours = {
  //Price for each wall type
  "Sandwichelement - 480mm": 2,
  "Sandwichelement - 450mm": 1.7,
  "Beton vægelement - 150mm": 3,
  "Fundament - 900mm": 3.21,
  "Beton bagvægs sternelement  - 240mm": 3,
  "Huldæk - 180mm": 0.5,
  "Generic - 400mm": 0.8,
};

export function getDate(data) {
  const obj1 = data.reduce((acc, elment) => {
    const wallName = elment.name;
    const wWallName = wallName.split("[")[0];
    acc[wWallName] = {};
    return acc;
  }, {});

  for (let wall of data) {
    const wallIdentityData =
      wall.properties["Identity Data"]["Type Name"].split("-")[1];

    const wallArea = wall.properties["Dimensions"]["Area"];

    const foundation = wall.properties["Dimensions"]["Volume"];
    const totalVolume = Number(foundation.split("m^3")[0]);
    const wallTypes = wall.properties["Identity Data"]["Type Name"];

    const totalArea = Number(wallArea.split("m^2")[0]);
    const wallName = wall.name;
    const wWallName = wallName.split("[")[0];

    if (!obj1[wWallName][wallTypes]) {
      obj1[wWallName][wallTypes] = {
        [wWallName + "- Types"]: wallTypes,
        Sum: 0,
        id: "",
        ["Total Area"]: 0,
        ["Total Width"]: 0,
        ["Total Price"]: 0,
        ["Total Hours"]: 0,
      };
    }

    if (wallTypes === "Fundament - 900mm") {
      obj1[wWallName][wallTypes]["Total Width"] += totalVolume;
      obj1[wWallName][wallTypes].id = wall.externalId;
      obj1[wWallName][wallTypes]["Total Price"] +=
        totalVolume * +wallPrices[wallTypes];
      obj1[wWallName][wallTypes].Sum++;
      obj1[wWallName][wallTypes]["Total Hours"] += hours[wallTypes];
      delete obj1[wWallName][wallTypes]["Total Area"];
    } else {
      delete obj1[wWallName][wallTypes]["Total Width"];
      obj1[wWallName][wallTypes].id = wall.externalId;
      obj1[wWallName][wallTypes]["Total Area"] += Number(totalArea);
      obj1[wWallName][wallTypes]["Total Hours"] += totalArea * hours[wallTypes];
      obj1[wWallName][wallTypes]["Total Price"] +=
        totalArea * +wallPrices[wallTypes];
      obj1[wWallName][wallTypes].Sum++;
    }
  }

  // await writeXls("test.xlsx", obj1);BTW, fremover må du gerne huske på at reglen er min 3 ugentlige dage på kontoret

  return obj1;
}
