import { useLocation, useNavigate } from "react-router-dom";
import styled from "styled-components";
import Button from "../../component/button";
import Card from "../../component/card";
import { routes } from "../../config/routes.ts";
import SuccessImage from "../../assets/icons/successImage.tsx";
import Typography from "../../component/typography";
import { ru } from "date-fns/locale";
import { format } from "date-fns";
import { useEffect, useRef } from "react";
import { toPng } from "html-to-image";

const SuccessPage = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const ref = useRef();

  useEffect(() => {
    const fetchData = async () => {
      const res = await toPng(ref.current);
      const a = document.createElement("a");
      a.href = res;
      a.download = `запись.png`;
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
    };
    fetchData();
  }, []);

  return (
    <Wrapper ref={ref}>
      <SuccessImage />
      <Typography
        color={"white"}
        fontWeight={600}
        fontSize={20}
        textAlign={"center"}
      >
        Запись на прием{" "}
        {format(location.state?.selectedDate, "dd LLLL", { locale: ru })} в{" "}
        {location.state?.selectedTime} успешно завершена!
      </Typography>
      <ButtonWrapper>
        <Card borderRadius={"35px 35px 0 0"}>
          <Button
            title={"На главную"}
            onClick={() => navigate(routes.main.path)}
          />
        </Card>
      </ButtonWrapper>
    </Wrapper>
  );
};

const Wrapper = styled.div`
  background: #113d9e;
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  gap: 50px;
  padding: 0 70px;
`;

const ButtonWrapper = styled.div`
  position: absolute;
  width: 100%;
  bottom: 0;
`;

export default SuccessPage;
