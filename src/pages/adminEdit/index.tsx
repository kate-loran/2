import Header from "../../component/header";
import ContentLayout from "../../layout/contentLayout";
import Card from "../../component/card";
import Calendar from "../../component/calendar";
import Button from "../../component/button";
import { useNavigate } from "react-router-dom";
import { routes } from "../../config/routes.ts";
import Typography from "../../component/typography";
import { useEffect, useState } from "react";
import Checkbox from "../../component/checkbox";
import styled from "styled-components";
import TimeSelect from "../../component/timeSelect";
import { generateTimeSlots } from "../../utils/generateTimeSlots.ts";
import { useDayCreateUpdate } from "../../hooks/useDayCreateUpdate.ts";
import { getServerFormatDate } from "../../utils/getServerFormatDate.ts";

const AdminEditPage = () => {
  const navigate = useNavigate();

  const [selectedDate, setSelectedDate] = useState<Date>();
  const [nonWorkingDay, setNonWorkingDay] = useState<boolean>(false);
  const [timeFrom, setTimeFrom] = useState<string | undefined>();
  const [timeTo, setTimeTo] = useState<string | undefined>();

  useEffect(() => {
    setNonWorkingDay(false);
    setTimeFrom(undefined);
    setTimeTo(undefined);
  }, [selectedDate]);

  const enabledButton = nonWorkingDay || (timeFrom && timeTo);

  const { dayCreateUpdateMutation } = useDayCreateUpdate();

  const onSave = async () => {
    try {
      if (selectedDate) {
        const slots = generateTimeSlots({ from: timeFrom, to: timeTo });
        await dayCreateUpdateMutation.mutateAsync({
          id: undefined,
          data: {
            date: getServerFormatDate(selectedDate) || "",
            slots: nonWorkingDay
              ? []
              : slots.map((time) => ({
                  time,
                  available: true,
                })),
          },
        });
        navigate(routes.admin.path);
      }
    } catch (e) {
      //
    }
  };

  return (
    <>
      <Header
        title={"Редактирование графика"}
        onBack={() => navigate(routes.admin.path)}
      />
      <ContentLayout>
        <Card>
          <Typography color={"#0D275E"} fontSize={16} textAlign={"center"}>
            Выберите день для настройки особого расписания
          </Typography>
        </Card>
        <Card>
          <Calendar selectedDate={selectedDate} onSelect={setSelectedDate} />
        </Card>
        {selectedDate && (
          <>
            <Checkbox
              value={nonWorkingDay}
              onChange={setNonWorkingDay}
              label={"Нерабочий день"}
            />
            {!nonWorkingDay && (
              <>
                <Row>
                  <TimeWrapper>
                    <Typography color={"#0C2A6A"} fontSize={16}>
                      с
                    </Typography>
                    <TimeSelect
                      value={timeFrom}
                      list={generateTimeSlots({ to: timeTo }).map((el) => ({
                        value: el,
                        label: el,
                      }))}
                      onChange={setTimeFrom}
                    />
                  </TimeWrapper>
                  <TimeWrapper>
                    <Typography color={"#0C2A6A"} fontSize={16}>
                      по
                    </Typography>
                    <TimeSelect
                      value={timeTo}
                      list={generateTimeSlots({
                        from: timeFrom,
                        isToDateList: !!timeFrom,
                      })
                        .map((el) => ({
                          value: el,
                          label: el,
                        }))
                        .slice(timeFrom ? 1 : 0)}
                      onChange={setTimeTo}
                    />
                  </TimeWrapper>
                </Row>
              </>
            )}
          </>
        )}
      </ContentLayout>
      <Card borderRadius={"35px 35px 0 0"}>
        <Button
          title={"Сохранить"}
          onClick={onSave}
          disabled={!enabledButton}
        />
      </Card>
    </>
  );
};

const Row = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
`;

const TimeWrapper = styled.div`
  display: flex;
  align-items: center;
  gap: 10px;
`;

export default AdminEditPage;
