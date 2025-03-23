import { Space, useGetUserSpaces } from 'entitites/Space';
import type { ISpace } from 'entitites/Space';
import { Text } from 'shared/ui';
import s from './MySpaces.module.scss';

type Props = {
	onSpaceClick?: (spaceID: ISpace['id']) => void;
};

export const MySpaces = (props: Props) => {
	const { onSpaceClick } = props;

	// TODO: лоадеры
	const { spaces } = useGetUserSpaces();

	const handleSpaceClick = (spaceID: ISpace['id']) => {
		onSpaceClick?.(spaceID);
	};

	return (
		<div className={s.MySpaces}>
			<Text
				title={'Мои пространства'}
				text={'Список всех пространств, в которых ты являешься участником'}
			/>

			<div className={s.list}>
				{spaces.map((space) => (
					<Space.Card onClick={handleSpaceClick} key={space.id} {...space} />
				))}
			</div>
		</div>
	);
};
