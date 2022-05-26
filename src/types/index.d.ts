export type location = {
  // 经度/维度
  latitude: number;
  longitude: number;
};

export type locationParams = {
  location: string;
}

export type weatherParams = {
  lat: number;
  lon: number;
  exclude: string;
};

export type Hourly = {
  id: number;
  time: string;
  temp: string | number;
};

export type daily = {
  id: number;
  week: string;
  icon: string;
  tempHigh: string;
  tempLow: string;
};
