import { setHours, setMilliseconds, setMinutes } from "date-fns";

export const generateTimeSlots = ({
  from = "00:00",
  to = "00:00",
  step = 15,
}: {
  from?: string;
  to?: string;
  step?: number;
}) => {
  const fromArr = from.split(":");
  const toArr = to.split(":");
  const fromAbstractDate = setHours(
    setMinutes(setMilliseconds(new Date(), 0), Number(fromArr[1])),
    Number(fromArr[0]),
  );
  const toAbstractDate = setHours(
    setMinutes(setMilliseconds(new Date(), 0), Number(toArr[1])),
    Number(toArr[0]),
  );
  console.log(fromAbstractDate, toAbstractDate);
  const arr = [] as string[];
  console.log(from, to, step);
  return arr;
};
