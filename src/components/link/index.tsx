import { FC } from 'react';
import './index.less';

export const Link: FC<{ text: string }> = ({ text }) => {
  return <span className="link">{text}</span>;
};
