import { Divider } from 'shared/ui';
import { SpaceTabs } from '../SpaceTabs/SpaceTabs';
import { TabsSelector } from '../TabsSelector/TabsSelector';
import s from './SpacesPage.module.scss';

export const SpacesPage = () => {
	return (
		<div className={s.SpacesPage}>
			<Divider />

			<TabsSelector />

			<Divider />

			<div className={s.tabs}>
				<SpaceTabs />
			</div>

			<Divider />
		</div>
	);
};
