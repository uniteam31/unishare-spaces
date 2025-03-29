import { useGetCurrentSpaceInfo } from 'entitites/Space';
import { SpaceIDController } from 'shared/lib';
import { Divider, LoadScreen, Text, Warning } from 'shared/ui';
import { SpaceInfo } from '../SpaceInfo/SpaceInfo';
import s from './CurrentSpace.module.scss';

export const CurrentSpace = () => {
	const { isLoading, error } = useGetCurrentSpaceInfo();

	const currentSpaceID = SpaceIDController.getCurrentSpaceID();

	if (!currentSpaceID) {
		return (
			<Warning
				title={'Пространство не выбрано'}
				text={'Выберите пространство из списка'}
				theme={'blue'}
			/>
		);
	}

	return (
		<div className={s.CurrentSpace}>
			<Text
				title={'Текущее пространство'}
				text={'Информация о пространстве, которое выбрано в данный момент'}
			/>

			<Divider direction={'horizontal'} />

			{isLoading && !error && <LoadScreen label={'Текущее пространство'} />}

			{!isLoading && error && !isLoading && (
				<Warning title={'Ошибка'} text={error} theme={'red'} />
			)}

			{!isLoading && !error && <SpaceInfo />}
		</div>
	);
};
