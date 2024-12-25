import Header from "../../component/header";
import Card from "../../component/card";
import Button from "../../component/button";
import ContentLayout from "../../layout/contentLayout";
import Calendar from "../../component/calendar";

const AdminPage = () => {
  return (
    <>
      <Header title={"График записей"} />
      <ContentLayout>
        <Card>
          <Calendar />
        </Card>
      </ContentLayout>
      <Card borderRadius={"35px 35px 0 0"}>
        <Button title={"Сохранить"} onClick={() => null} />
      </Card>
    </>
  );
};

export default AdminPage;
