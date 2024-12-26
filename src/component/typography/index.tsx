import styled from "styled-components";
import { PropsWithChildren } from "react";

interface Props {
  color?: string;
  fontSize?: number;
  opacity?: number;
  textAlign?: "center" | "left" | "right";
}

const Typography = ({
  children,
  color = "#0C2A6A",
  fontSize = 16,
  opacity = 1,
  textAlign,
}: PropsWithChildren & Props) => {
  return (
    <Wrapper
      color={color}
      fontSize={fontSize}
      opacity={opacity}
      textAlign={textAlign}
    >
      {children}
    </Wrapper>
  );
};

const Wrapper = styled.div<
  Pick<Props, "color" | "fontSize" | "opacity" | "textAlign">
>`
  color: ${({ color }) => color};
  font-size: ${({ fontSize }) => fontSize}px;
  opacity: ${({ opacity }) => opacity};
  text-align: ${({ textAlign }) => textAlign};
`;

export default Typography;
