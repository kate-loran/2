import styled from "styled-components";
import { PropsWithChildren } from "react";

interface Props {
  color?: string;
  fontSize?: number;
  opacity?: number;
}

const Typography = ({
  children,
  color = "#0C2A6A",
  fontSize = 16,
  opacity = 1,
}: PropsWithChildren & Props) => {
  return (
    <Wrapper color={color} fontSize={fontSize} opacity={opacity}>
      {children}
    </Wrapper>
  );
};

const Wrapper = styled.div<Pick<Props, "color" | "fontSize" | "opacity">>`
  color: ${({ color }) => color};
  font-size: ${({ fontSize }) => fontSize}px;
  opacity: ${({ opacity }) => opacity};
`;

export default Typography;
