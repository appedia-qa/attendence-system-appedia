const MarineSpanish = {
  "Elizabeth Bay": "Bahia Elizabeth",
  "Far North": "Extremo Norte",
  "North": "Norte",
  "Southeast": "Sureste",
  "West": "Oeste"
};

const MarineEnglish = {
  "Bahia Elizabeth": "Elizabeth Bay",
  "Extremo Norte": "Far North",
  "Norte": "North",
  "Sureste": "Southeast",
  "Oeste": "West"
};

export const MarineToSpanish = (zone) => {
  if (MarineSpanish[zone]) {
    return MarineSpanish[zone];
  } else {
    return zone;
  }
};

export const MarineToEnglish = (zone) => {
  if (MarineEnglish[zone]) {
    return MarineEnglish[zone];
  } else {
    return zone;
  }
};

export default MarineSpanish;
