import { Avatar as Instance, AvatarProps } from 'theme-ui';

export interface IAvatar extends AvatarProps {
  dataTestId: string;
}
export const Avatar = ({ dataTestId, ...props }: IAvatar & any) => (
  <Instance
    style={{ border: '5px solid #ccc', width: 100, height: 100 }}
    data-testid={dataTestId}
    {...props}
  />
);
