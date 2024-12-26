export interface RouteInterface {
  path: string;
}

export interface DayInterface {
  date: string; // yyyy-mm-dd
  slots: {
    time: string; // hh:mm
    available: boolean;
  }[];
}
