import { useState } from 'react';
import { CreateSpace } from 'features/CreateSpace';
import { Button } from 'shared/ui';
import s from './SpacesPage.module.scss';

export const SpacesPage = () => {
	const [isCreateSpaceModalOpen, setIsCreateSpaceModalOpen] = useState(false);

	const handleCreateSpaceModal = () => {
		setIsCreateSpaceModalOpen((prev) => !prev);
	};

	return (
		<div className={s.SpacesPage}>
			<Button onClick={handleCreateSpaceModal}>Создать пространство</Button>

			<CreateSpace.Modal isOpen={isCreateSpaceModalOpen} onClose={handleCreateSpaceModal} />
		</div>
	);
};
