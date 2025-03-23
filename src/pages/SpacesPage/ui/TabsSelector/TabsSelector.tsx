import classNames from 'classnames';
import React, { memo, useCallback, useState } from 'react';
import { CreateSpace } from 'features/CreateSpace';
import { Button } from 'shared/ui';
import { spacesTabs } from '../../model/spacesTabs';
import type { TSpacesTabsName } from '../../model/spacesTabs';
import s from './TabsSelector.module.scss';

interface ITabsSelectorProps {
	onClickTab: (tabName: TSpacesTabsName) => void;
	currentTab: TSpacesTabsName;
}

// TODO: используется в нескольким
export const TabsSelector = memo((props: ITabsSelectorProps) => {
	const { onClickTab, currentTab } = props;

	const [isCreateSpaceModalOpen, setIsCreateSpaceModalOpen] = useState(false);

	const handleCreateSpaceModal = () => {
		setIsCreateSpaceModalOpen((prev) => !prev);
	};

	const handleSelectTab = useCallback(
		(tabName: TSpacesTabsName) => {
			onClickTab(tabName);
		},
		[onClickTab],
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
					className={classNames(s.tabsSelectorItem, tabName === currentTab && s.active)}
					onClick={() => handleSelectTab(tabName as TSpacesTabsName)}
					key={tab.title}
				>
					{tab.title}
				</div>
			))}
		</div>
	);
});
