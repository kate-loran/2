import { PropsWithChildren } from "react";
import styled from "styled-components";

const ContentLayout = ({ children }: PropsWithChildren) => {
  return <Wrapper>{children}</Wrapper>;
};

const Wrapper = styled.div`
  background: #ebf2f8;
  padding: 15px;
  width: 100%;
  height: calc(100% - 130px);
  overflow-y: auto;
`;

export default ContentLayout;
