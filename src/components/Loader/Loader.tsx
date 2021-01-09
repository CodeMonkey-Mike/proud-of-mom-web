import React from 'react';
import styled, { keyframes } from 'styled-components';
import { Flex } from 'theme-ui';

const rotate = keyframes`
  from {transform: rotate(0deg);}
  to {transform: rotate(360deg);}
`;

const Backdrop = styled(Flex)`
  position: fixed;
  z-index: 9999;
  background-color: rgba(0, 0, 0, 0.2);
  width: 100%;
  height: 100%;
  left: 0;
  top: 0;
`;

const Spinner = styled.div`
  width: 24px;
  height: 24px;
  border: 4px solid #ffffff;
  /* border-top: 4px solid #009e7f; */
  border-top: 3px solid ${(props) => (props.color ? props.color : '#009e7f')};
  border-radius: 50%;
  transition-property: transform;
  animation-name: ${rotate};
  animation-duration: 1.2s;
  animation-iteration-count: infinite;
  animation-timing-function: linear;
`;

export const Loader = ({ loading }: { loading: boolean }) => {
  return (
    <Backdrop hidden={!loading} sx={{ justifyContent: 'center', alignItems: 'center' }}>
      <Spinner />
    </Backdrop>
  );
};
