import React from 'react';
import { Flex, Spinner } from 'theme-ui';

const Loading = ({ text }: { text: string }) => {
  return (
    <Flex
      sx={{
        alignItems: 'center',
        justifyContent: 'center',
      }}
    >
      <Spinner>{text}</Spinner>
    </Flex>
  );
};

export default Loading;
