import { useCallback, useState } from 'react';
import { Outlet } from 'react-router';
import { Divider } from 'shared/ui';
import type { TSpacesTabsName } from '../../model/spacesTabs';
import { spacesTabs } from '../../model/spacesTabs';
import { TabsSelector } from '../TabsSelector/TabsSelector';
import s from './SpacesPage.module.scss';

export const SpacesPage = () => {
	const [selectedTab, setSelectedTab] = useState<TSpacesTabsName>('currentSpace');

	const handleSelectTab = useCallback((tabName: TSpacesTabsName) => {
		setSelectedTab(tabName);
	}, []);

	return (
		<div className={s.SpacesPage}>
			<Divider />

			<TabsSelector onClickTab={handleSelectTab} currentTab={selectedTab} />

			<Divider />

			<div className={s.tabs}>{spacesTabs[selectedTab].Component}</div>

			<Outlet />

			<Divider />
		</div>
	);
};
