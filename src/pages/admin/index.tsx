import Header from "../../component/header";
import Card from "../../component/card";
import Button from "../../component/button";

const AdminPage = () => {
  return (
    <div>
      <Header title={"График записей"} />
      <Card borderRadius={"35px 35px 0 0"}>
        <Button title={"Сохранить"} onClick={() => null} />
      </Card>
    </div>
  );
};

export default AdminPage;
