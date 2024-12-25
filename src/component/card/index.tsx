import styled from "styled-components";
import { PropsWithChildren } from "react";

interface Props {
  borderRadius?: string;
}

const Card = ({
  borderRadius = "15px",
  children,
}: PropsWithChildren<Props>) => {
  return <Wrapper borderRadius={borderRadius}>{children}</Wrapper>;
};

const Wrapper = styled.div<{ borderRadius: string }>`
  border-radius: ${({ borderRadius }) => borderRadius};
  padding: 15px;
  box-shadow: 0 -1px 10px 0 #0c2a6a33;
  background: white;
`;

export default Card;
