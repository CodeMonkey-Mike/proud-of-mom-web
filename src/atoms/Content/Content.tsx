import styled from 'styled-components';
import { IInstance } from 'src/interfaces';

const Instance = styled.div<IInstance>`
  flex: 1;
  display: flex;
  height: 100%;
  max-width: ${({ maxWidth = '800px' }) => maxWidth && `${maxWidth}`};
  padding: ${({ padding = '20px' }) => padding && `${padding}`};
  ${({ flexWrap }) => flexWrap && `flex-wrap: ${flexWrap}`};
  align-content: ${({ alignContent }) => (alignContent ? `flex-${alignContent}` : 'center')};
  align-items: ${({ alignItems }) => (alignItems ? `flex-${alignItems}` : 'center')};
  justify-content: ${({ justifyContent }) =>
    justifyContent ? `flex-${justifyContent}` : 'center'};
`;

export interface IContent {
  children: React.ReactNode;
}

export const Content = ({ children, ...props }: IContent & IInstance) => (
  <Instance {...props}>{children}</Instance>
);
