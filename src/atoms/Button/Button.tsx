import React from 'react';
import styled from 'styled-components';
import { buttonStyle, colorStyle, buttonSize } from '../../theme/customVariant';

const ButtonStyled = styled.button`
  cursor: pointer;
  width: 100%;
  ${buttonStyle}
  ${colorStyle}
  ${buttonSize}
`;

export type ButtonProps = {
  children: React.ReactChild;
  onClick?: (e: any) => void;
  color?: string;
  variant?: string;
  size?: string;
  disabled?: boolean;
};

export const Button = ({ children, onClick, ...props }: ButtonProps) => {
  return (
    <ButtonStyled onClick={onClick} {...props}>
      {children}
    </ButtonStyled>
  );
};
