import Header from "../../component/header";
import ContentLayout from "../../layout/contentLayout";
import Card from "../../component/card";
import Calendar from "../../component/calendar";
import Button from "../../component/button";
import { useNavigate } from "react-router-dom";
import { routes } from "../../config/routes.ts";
import Typography from "../../component/typography";
import { useState } from "react";
import Checkbox from "../../component/checkbox";

const AdminEditPage = () => {
  const navigate = useNavigate();

  const [selectedData, setSelectedData] = useState<Date>();
  const [nonWorkingDay, setNonWorkingDay] = useState<boolean>(false);

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
          <Calendar selectedDate={selectedData} onSelect={setSelectedData} />
        </Card>
        {selectedData && (
          <>
            <Checkbox
              value={nonWorkingDay}
              onChange={setNonWorkingDay}
              label={"Нерабочий день"}
            />
          </>
        )}
      </ContentLayout>
      <Card borderRadius={"35px 35px 0 0"}>
        <Button title={"Сохранить"} onClick={() => null} disabled={true} />
      </Card>
    </>
  );
};

export default AdminEditPage;
