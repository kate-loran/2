import styled from "styled-components";

interface Props {
  title: string;
  onClick: VoidFunction;
  disabled?: boolean;
}

const Button = ({ title, onClick, disabled = false }: Props) => {
  return (
    <Wrapper onClick={onClick} disabled={disabled}>
      {title}
    </Wrapper>
  );
};

const Wrapper = styled.div<{ disabled: boolean }>`
  display: flex;
  align-items: center;
  justify-content: center;
  color: white;
  width: 100%;
  height: 56px;
  border-radius: 28px;
  background: #0c2a6a;
  cursor: pointer;
  ${({ disabled }) => (disabled ? 0.75 : 1)}
`;

export default Button;
