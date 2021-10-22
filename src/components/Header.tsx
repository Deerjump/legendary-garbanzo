import { FC } from 'react';

export interface HeaderProps {
  title: string
}  

const Header: FC<HeaderProps> = ({ title }) => {
  return <div className="header">{title}</div>;
};

export default Header;