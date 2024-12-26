import {
  setHours,
  setMinutes,
  isBefore,
  addMinutes,
  format,
  endOfDay,
} from "date-fns";

const handleTime = (time: string) => {
  const timeArr = time.split(":");
  return setHours(
    setMinutes(new Date(), Number(timeArr[1])),
    Number(timeArr[0]),
  );
};

export const generateTimeSlots = ({
  from,
  to,
  step = 15,
}: {
  from?: string;
  to?: string;
  step?: number;
}) => {
  const fromAbstractDate = handleTime(from || "00:00");
  const toAbstractDate = to ? handleTime(to) : endOfDay(fromAbstractDate);
  const arr = [] as string[];
  let abstractDate = new Date(fromAbstractDate.getTime());
  while (isBefore(abstractDate, toAbstractDate)) {
    arr.push(format(abstractDate, "HH:mm"));
    abstractDate = addMinutes(abstractDate, step);
  }
  return arr;
};
