import classNames from 'classnames';
import { useState } from 'react';
import { CreateSpace } from 'features/CreateSpace';
import SpaceIcon from 'shared/assets/icons/space.svg';
import { Widget, Button } from 'shared/ui';
import s from './SpacesWidget.module.scss';

type Props = {
	className?: string;
};

export const SpacesWidget = (props: Props) => {
	const { className } = props;

	const [isCreateSpaceModalOpen, setIsCreateSpaceModalOpen] = useState(false);

	const handleCreateSpaceModal = () => {
		setIsCreateSpaceModalOpen((prev) => !prev);
	};

	return (
		<div className={classNames(s.SpacesWidget, className)}>
			<Widget title={'Пространства'} to={'/spaces'} Icon={<SpaceIcon className={s.icon} />}>
				<Button className={s.createSpaceBtn} onClick={handleCreateSpaceModal}>
					+
				</Button>

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
