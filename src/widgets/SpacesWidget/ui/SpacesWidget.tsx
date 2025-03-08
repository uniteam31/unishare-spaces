import classNames from 'classnames';
import { Widget } from 'shared/ui';
import s from './SpacesWidget.module.scss';

type Props = {
	className?: string;
};

export const SpacesWidget = (props: Props) => {
	const { className } = props;

	return (
		<div className={classNames(s.SpacesWidget, className)}>
			<Widget title={'Пространства'} to={'/spaces'}></Widget>
		</div>
	);
};
