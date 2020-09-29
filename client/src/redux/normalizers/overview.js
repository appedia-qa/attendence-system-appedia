export const normalizeOverviewData = (dataList) => {
  try {
    return dataList.forEach(item => normalizeOverviewDataItem(item));
  } catch (e) {
    return dataList;
  }
}


const normalizeOverviewDataItem = (data) => {
  try {
    return {
      ...data,
      name: data.name,
      type: data.type,
      temperature_current: data.temperature_current,
      temperature_previous_1: data.temperature_previous_1,
      temperature_previous_2: data.temperature_previous_2,
      temperature_historical_mean: data.temperature_historical_mean,
      temperature_historical_high: data.temperature_historical_high,
      temperature_historical_low: data.temperature_historical_low,
      productivity_current: data.productivity_current,
      productivity_previous_1: data.productivity_previous_1,
      productivity_previous_2: data.productivity_previous_2,
      productivity_historical_mean: data.productivity_historical_mean,
      productivity_historical_high: data.productivity_historical_high,
      productivity_historical_low: data.productivity_historical_low
    }
  } catch (e) {
    return data;
  }
}