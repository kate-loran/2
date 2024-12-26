import { setHours, setMinutes, addDays, isSameDay } from "date-fns";

const handleTime = (time: string) => {
  const timeArr = time.split(":");
  return setHours(
    setMinutes(new Date(), Number(timeArr[1])),
    Number(timeArr[0]),
  );
};

export const generateTimeSlots = ({
  from = "00:00",
  to = "00:00",
  step = 15,
}: {
  from?: string;
  to?: string;
  step?: number;
}) => {
  const fromAbstractDate = handleTime(from);
  let toAbstractDate = handleTime(to);
  if (isSameDay(fromAbstractDate, toAbstractDate)) {
    toAbstractDate = addDays(toAbstractDate, 1);
  }
  console.log(fromAbstractDate, toAbstractDate);
  const arr = [] as string[];
  console.log(from, to, step);
  return arr;
};
