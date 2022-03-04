import { ReactNode } from 'react';

import classes from './index.module.css';

type Props = {
	children: ReactNode;
	variant: 'danger';
};

const MessagesListComponent = ({ children, variant }: Props) => {
	return <ul className={`${classes.list} ${classes[variant]}`}>{children}</ul>;
};

export default MessagesListComponent;
