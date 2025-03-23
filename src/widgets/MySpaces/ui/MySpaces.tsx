import { Space, useGetUserSpaces } from 'entitites/Space';
import { Text } from 'shared/ui';
import s from './MySpaces.module.scss';

export const MySpaces = () => {
	// TODO: лоадеры
	const { spaces } = useGetUserSpaces();

	return (
		<div className={s.MySpaces}>
			<Text
				title={'Мои пространства'}
				text={'Список всех пространств, в которых ты являешься участником'}
			/>

			<div className={s.list}>
				{spaces.map((space) => (
					<Space.Card key={space.id} {...space} />
				))}
			</div>
		</div>
	);
};
