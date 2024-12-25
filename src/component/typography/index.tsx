import styled from "styled-components";
import { PropsWithChildren } from "react";

interface Props {
  color?: string;
  fontSize?: number;
}

const Typography = ({
  children,
  color = "#0C2A6A",
  fontSize = 16,
}: PropsWithChildren & Props) => {
  return (
    <Wrapper color={color} fontSize={fontSize}>
      {children}
    </Wrapper>
  );
};

const Wrapper = styled.div<{ color: string; fontSize: number }>`
  color: ${({ color }) => color};
  font-size: ${({ fontSize }) => fontSize}px;
`;

export default Typography;
