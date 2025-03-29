import { useGetCurrentSpaceInfo } from 'entitites/Space';
import { SpaceIDController } from 'shared/lib';
import { Divider, LoadScreen, Text, Warning } from 'shared/ui';
import { SpaceInfo } from '../SpaceInfo/SpaceInfo';
import s from './CurrentSpace.module.scss';

export const CurrentSpace = () => {
	const { isLoading, error } = useGetCurrentSpaceInfo();

	const renderContent = () => {
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

		if (isLoading) {
			return <LoadScreen label={'Текущее пространство'} />;
		}

		if (error) {
			return <Warning title={'Ошибка'} text={error} theme={'red'} />;
		}

		return <SpaceInfo />;
	};

	return (
		<div className={s.CurrentSpace}>
			<Text
				title={'Текущее пространство'}
				text={'Информация о пространстве, которое выбрано в данный момент'}
			/>

			<Divider direction={'horizontal'} />

			{renderContent()}
		</div>
	);
};
