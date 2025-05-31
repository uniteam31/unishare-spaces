import classNames from 'classnames';
import { Space, useGetUserSpaces } from 'entitites/Space';
import type { ISpace } from 'entitites/Space';
import { useState } from 'react';
import { useNavigate } from 'react-router';
import { CreateSpace } from 'features/CreateSpace';
import SpaceIcon from 'shared/assets/icons/space.svg';
import { SpaceIDController } from 'shared/lib';
import { Widget, Button, Skeleton, Warning } from 'shared/ui';
import s from './SpacesWidget.module.scss';

type Props = {
	className?: string;
};

export const SpacesWidget = (props: Props) => {
	const { className } = props;

	const navigate = useNavigate();

	const [isCreateSpaceModalOpen, setIsCreateSpaceModalOpen] = useState(false);
	const { spaces, isLoading, error } = useGetUserSpaces();

	const handleCreateSpaceModal = () => {
		setIsCreateSpaceModalOpen((prev) => !prev);
	};

	const handleClickSpace = (id: ISpace['id']) => {
		SpaceIDController.setCurrentSpaceIDAndSendEvent(id);
		navigate('/spaces');
	};

	const currentSpaceID = SpaceIDController.getCurrentSpaceID();

	const renderContent = () => {
		if (isLoading) {
			return (
				<div className={s.list}>
					{Array.from({ length: 4 }).map((_, i) => (
						<Skeleton key={i} className={s.skeleton} />
					))}
				</div>
			);
		}

		if (error) {
			return <Warning title={'Ошибка'} text={error} />;
		}

		return (
			<div className={s.list}>
				{spaces.slice(0, 3).map((space) => (
					<Space.Card
						onClick={handleClickSpace}
						className={classNames(currentSpaceID === space.id && s.activeSpace)}
						size={'small'}
						key={space.id}
						{...space}
					/>
				))}

				<Button className={s.createSpaceBtn} onClick={handleCreateSpaceModal}>
					+
				</Button>

				{spaces.length > 3 && <div className={s.spacesCounter}>+{spaces.length - 3}</div>}
			</div>
		);
	};

	return (
		<div className={classNames(s.SpacesWidget, className)}>
			<Widget title={'Пространства'} to={'/spaces'} Icon={<SpaceIcon className={s.icon} />}>
				{renderContent()}

				{isCreateSpaceModalOpen && (
					<CreateSpace.CreateModal
						isOpen={isCreateSpaceModalOpen}
						onClose={handleCreateSpaceModal}
					/>
				)}
			</Widget>
		</div>
	);
};
