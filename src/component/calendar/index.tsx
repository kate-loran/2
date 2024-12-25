import styled from "styled-components";
import ShortArrow from "../../assets/icons/shortArrow.tsx";
import Typography from "../typography";
import {
  add,
  addDays,
  addYears,
  endOfMonth,
  endOfYear,
  format,
  isAfter,
  isBefore,
  isSameDay,
  startOfMonth,
  startOfYear,
  sub,
  subDays,
} from "date-fns";
import { ru } from "date-fns/locale";
import { useCallback, useEffect, useState } from "react";

interface ICalendarItem {
  // сама дата
  day: Date;
  // день недели, начинается с 1
  weekday: number;
  // это выбранная дата
  isSelected: boolean;
  // это выбранный месяц
  isCurrentMonth: boolean;
  // номер строки
  row: number;
  // дата на которую нельзя кликнуть - меньше чем мин дата или больше чем макс дата
  disabled: boolean;
  // это сегодняшний день
  isToday: boolean;
  // это дата после искомой
  isAfter: boolean;
  // это выходной
  isHoliday: boolean;
}

interface IFillDateProps {
  day: Date;
  minDate: Date;
  maxDate: Date;
  selectedDate: Date;
  currentMonth: number;
  days: ICalendarItem[];
}

const getWeekday = (day: Date) => Number(format(day, "i"));

const d = new Date();
const defaultMinDate = startOfYear(addYears(new Date(), -100));
const defaultMaxDate = endOfYear(addYears(new Date(), 100));

const fillDate = ({
  day,
  minDate,
  maxDate,
  selectedDate,
  currentMonth,
  days,
}: IFillDateProps) => {
  let disabled = false;
  if (!disabled && minDate) {
    disabled = isBefore(day, minDate) && !isSameDay(day, minDate);
  }
  if (!disabled && maxDate) {
    disabled = isAfter(day, maxDate) && !isSameDay(day, maxDate);
  }
  const weekday = getWeekday(day);
  return {
    // сама дата
    day,
    // день недели, начинается с 1
    weekday,
    // это выбранная дата
    isSelected: isSameDay(day, selectedDate),
    // это выбранный месяц
    isCurrentMonth: day.getMonth() === currentMonth,
    // номер строки
    row: Math.floor(days.length / 7),
    // дата на которую нельзя кликнуть - меньше чем мин дата или больше чем макс дата
    disabled,
    // это сегодняшний день
    isToday: isSameDay(day, new Date()),
    // это день более сегодняшнего
    isAfter: isAfter(day, new Date()),
    //
    isHoliday: [6, 7].includes(weekday),
  };
};

const renderDayOfWeek = (index: number) => {
  switch (index) {
    case 1:
      return "Пн";
    case 2:
      return "Вт";
    case 3:
      return "Ср";
    case 4:
      return "Чт";
    case 5:
      return "Пт";
    case 6:
      return "Сб";
    case 7:
      return "Вс";
    default:
      return "";
  }
};

interface Props {
  selectedDate?: Date;
  maxDate?: Date;
  minDate?: Date;
  onSelect?: (date: Date) => void;
}

const Calendar = ({
  selectedDate = d,
  maxDate = defaultMaxDate,
  minDate = defaultMinDate,
  onSelect,
}: Props) => {
  const [curDate, setCurDate] = useState<Date>(selectedDate);

  useEffect(() => {
    setCurDate(selectedDate);
  }, [selectedDate]);

  const fillValues = () => {
    const first = startOfMonth(curDate as Date);
    const last = endOfMonth(curDate as Date);

    const days: ICalendarItem[] = [];
    let current = new Date(first.getTime());
    for (let prefixI = 1; prefixI < getWeekday(first); prefixI += 1) {
      const date = subDays(new Date(first.getTime()), prefixI);
      days.unshift(
        fillDate({
          day: date,
          minDate,
          maxDate,
          selectedDate,
          currentMonth: curDate?.getMonth(),
          days,
        } as IFillDateProps),
      );
    }

    while (isAfter(last, current)) {
      const day = new Date(current.getTime());
      days.push(
        fillDate({
          day,
          minDate,
          maxDate,
          selectedDate,
          currentMonth: curDate?.getMonth(),
          days,
        } as IFillDateProps),
      );
      current = addDays(current, 1);
    }

    for (let postfixI = 1; postfixI <= 7 - getWeekday(last); postfixI += 1) {
      const date = addDays(new Date(last.getTime()), postfixI);
      days.push(
        fillDate({
          day: date,
          minDate,
          maxDate,
          selectedDate,
          currentMonth: curDate?.getMonth(),
          days,
        } as IFillDateProps),
      );
    }

    const handleClick = (item: ICalendarItem) => onSelect && onSelect(item.day);

    return days.map((item: ICalendarItem) => {
      return (
        <DayCell
          key={`row-${item.row}-col-${item.weekday}`}
          onClick={() => (item.disabled ? null : handleClick(item))}
          isToday={item.isToday}
          isSelected={item.isSelected}
          isCurrentMonth={item.isCurrentMonth}
          disabled={item.disabled}
          isHoliday={item.isHoliday}
        >
          <Typography
            color={"#0D275E"}
            fontSize={16}
            opacity={!item.isCurrentMonth || item.isHoliday ? 0.25 : 1}
          >
            {format(item.day, "d")}
          </Typography>
        </DayCell>
      );
    });
  };

  const fillDaysOfWeek = () => {
    const arr = [];
    for (let i = 1; i <= 7; i += 1) {
      arr.push(
        <Cell key={`weekday-${i}`}>
          <Typography color={"#0D275E"} fontSize={16}>
            {renderDayOfWeek(i)}
          </Typography>
        </Cell>,
      );
    }
    return arr;
  };

  const subDate = useCallback(() => {
    setCurDate((state) => {
      const newState = sub(state as Date, { months: 1 });
      const endMonth = endOfMonth(newState);
      if (isAfter(minDate as Date, endMonth)) {
        return state;
      }
      return newState;
    });
  }, [minDate]);

  const addDate = useCallback(() => {
    setCurDate((state) => {
      const newState = add(state as Date, { months: 1 });
      const startMonth = startOfMonth(newState);
      if (isBefore(maxDate as Date, startMonth)) {
        return state;
      }
      return newState;
    });
  }, [maxDate]);

  return (
    <Wrapper>
      <Head>
        <ArrowButton onClick={subDate}>
          <ShortArrow />
        </ArrowButton>
        <Typography fontSize={16} color={"#0C2A6A"}>
          {format(curDate, "LLLL yyyy", { locale: ru })}
        </Typography>
        <ArrowButton onClick={addDate}>
          <ShortArrow rotate={180} />
        </ArrowButton>
      </Head>
      <Grid>
        {fillDaysOfWeek()}
        {fillValues()}
      </Grid>
    </Wrapper>
  );
};

const Grid = styled.div`
  display: grid;
  grid-template-columns: repeat(7, 1fr);
`;

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 15px;
`;

const Head = styled.div`
  width: 100%;
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const ArrowButton = styled.div`
  width: 16px;
  height: 16px;
  display: flex;
  justify-content: center;
  align-items: center;
  cursor: pointer;
`;

const Cell = styled.div`
  display: flex;
  border-radius: 50%;
  width: 44px;
  height: 44px;
  align-items: center;
  justify-content: center;
`;

const DayCell = styled(Cell)<
  Pick<
    ICalendarItem,
    "isToday" | "isSelected" | "isCurrentMonth" | "disabled" | "isHoliday"
  >
>``;

export default Calendar;
