import Header from "../../component/header";
import Card from "../../component/card";
import Button from "../../component/button";
import ContentLayout from "../../layout/contentLayout";
import Calendar from "../../component/calendar";
import { useNavigate } from "react-router-dom";
import { routes } from "../../config/routes.ts";
import { useState } from "react";
import { useGetDaysPeriod } from "../../hooks/useGetDaysPeriod.ts";
import { getStartEndOfMonth } from "../../utils/getStartEndOfMonth.ts";
import { getAvailableDates } from "../../utils/getAvailableDates.ts";
import { DayInterface } from "../../config/types.ts";

const AdminPage = () => {
  const navigate = useNavigate();
  const [currentDate, setCurrentDate] = useState<Date>();

  const { data } = useGetDaysPeriod(getStartEndOfMonth(currentDate));

  const availableDates = getAvailableDates({
    dates: data?.data as DayInterface[],
  });

  return (
    <>
      <Header title={"График записей"} />
      <ContentLayout>
        <Card>
          <Calendar
            setCurrentDate={setCurrentDate}
            availableDates={availableDates}
          />
        </Card>
      </ContentLayout>
      <Card borderRadius={"35px 35px 0 0"}>
        <Button
          title={"Редактировать"}
          onClick={() => navigate(routes.adminEdit.path)}
        />
      </Card>
    </>
  );
};

export default AdminPage;
