import classNames from 'classnames';
import React, { memo, useCallback, useState } from 'react';
import { CreateSpace } from 'features/CreateSpace';
import { Button } from 'shared/ui';
import { useSpacesPageStore } from '../../model/slice/useSpacesPageStore';
import type { TSpacesTabsName } from '../../model/types/spacesTabs';
import s from './TabsSelector.module.scss';

type TSpacesTab = {
	title: string;
};

export const spacesTabs: Record<TSpacesTabsName, TSpacesTab> = {
	currentSpace: {
		title: 'Текущее пространство',
	},
	mySpaces: {
		title: 'Мои пространства',
	},
};

export const TabsSelector = memo(() => {
	const { selectedTab, setSelectedTab } = useSpacesPageStore();

	const [isCreateSpaceModalOpen, setIsCreateSpaceModalOpen] = useState(false);

	const handleCreateSpaceModal = () => {
		setIsCreateSpaceModalOpen((prev) => !prev);
	};

	const handleSelectTab = useCallback(
		(tabName: TSpacesTabsName) => {
			setSelectedTab(tabName);
		},
		[setSelectedTab],
	);

	const arrayTabs = Object.entries(spacesTabs);

	return (
		<div className={s.TabsSelector}>
			<Button onClick={handleCreateSpaceModal}>Создать пространство</Button>

			{isCreateSpaceModalOpen && (
				<CreateSpace.CreateModal
					isOpen={isCreateSpaceModalOpen}
					onClose={handleCreateSpaceModal}
				/>
			)}

			{arrayTabs.map(([tabName, tab]) => (
				<div
					className={classNames(s.tabsSelectorItem, tabName === selectedTab && s.active)}
					onClick={() => handleSelectTab(tabName as TSpacesTabsName)}
					key={tab.title}
				>
					{tab.title}
				</div>
			))}
		</div>
	);
});
