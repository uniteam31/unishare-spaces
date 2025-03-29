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

	const renderContent = () => {
		if (isLoading) {
			return (
				<div className={s.list}>
					{Array.from({ length: 5 }).map((_, index) => (
						<Skeleton className={s.skeleton} key={`skeleton-${index}`} />
					))}
				</div>
			);
		}

		if (error) {
			return <Warning title="Ошибка" text={error} theme="red" />;
		}

		if (!spaces.length) {
			return (
				<Warning
					title="Список пуст"
					text="Создайте новое пространство!"
					theme="blue"
					className={s.emptyMessage}
				/>
			);
		}

		return (
			<div className={s.list}>
				{spaces.map((space) => (
					<Space.Card onClick={handleSpaceClick} key={`space-${space.id}`} {...space} />
				))}
			</div>
		);
	};

	return (
		<div className={s.MySpaces}>
			<Text
				title={'Мои пространства'}
				text={'Список всех пространств, в которых ты являешься участником'}
			/>

			{renderContent()}
		</div>
	);
};
