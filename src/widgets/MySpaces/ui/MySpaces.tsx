import { Space, useGetUserSpaces } from 'entitites/Space';
import type { ISpace } from 'entitites/Space';
import { Skeleton, Text, Warning } from 'shared/ui';
import s from './MySpaces.module.scss';

type Props = {
	onSpaceClick?: (spaceID: ISpace['id']) => void;
};

export const MySpaces = (props: Props) => {
	const { onSpaceClick } = props;

	const { spaces, isLoading, error } = useGetUserSpaces();

	const handleSpaceClick = (spaceID: ISpace['id']) => {
		onSpaceClick?.(spaceID);
	};

	return (
		<div className={s.MySpaces}>
			<Text
				title={'Мои пространства'}
				text={'Список всех пространств, в которых ты являешься участником'}
			/>

			{!isLoading && error && <Warning title={'Ошибка'} text={error} theme={'red'} />}

			{isLoading && !error && (
				<div className={s.list}>
					{Array.from({ length: 5 }).map((_, index) => (
						<Skeleton className={s.skeleton} key={index} />
					))}
				</div>
			)}

			{!isLoading && !error && (
				<div className={s.list}>
					{spaces.map((space) => (
						<Space.Card onClick={handleSpaceClick} key={space.id} {...space} />
					))}
				</div>
			)}
		</div>
	);
};
