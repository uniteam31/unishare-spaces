import classNames from 'classnames';
import SpaceIcon from 'shared/assets/icons/space.svg';
import { Widget } from 'shared/ui';
import s from './SpacesWidget.module.scss';

type Props = {
	className?: string;
};

export const SpacesWidget = (props: Props) => {
	const { className } = props;

	return (
		<div className={classNames(s.SpacesWidget, className)}>
			<Widget
				title={'Пространства'}
				to={'/spaces'}
				Icon={<SpaceIcon className={s.icon} />}
			></Widget>
		</div>
	);
};
