import styled from 'styled-components';
import { IInstance } from 'src/interfaces';

export const Instance = styled.div<IInstance>`
  flex: 1;
  display: flex;
  height: 100%;
  ${({ flexWrap }) => flexWrap && `flex-wrap: ${flexWrap}`};
  align-content: ${({ alignContent }) => (alignContent ? `flex-${alignContent}` : 'center')};
  align-items: ${({ alignItems }) => (alignItems ? `flex-${alignItems}` : 'center')};
  justify-content: ${({ justifyContent }) =>
    justifyContent ? `flex-${justifyContent}` : 'center'};
`;

const Loading = styled.div`
  position: fixed;
  width: 100%;
  height: 100%;
  z-index: 10000;
  background: rgba(0, 0, 0, 0.3);
  display: flex;
  justify-content: center;
  align-content: center;
`;
export interface IContainer {
  children: React.ReactNode;
  loading?: boolean;
  id?: string;
}

export const Container = ({ children, loading, ...props }: IContainer & IInstance) => {
  return (
    <Instance {...props}>
      {loading && <Loading>Loading...</Loading>}
      {children}
    </Instance>
  );
};
