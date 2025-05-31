import type { ISpace } from 'entitites/Space';
import { CurrentSpace } from 'widgets/CurrentSpace';
import { MySpaces } from 'widgets/MySpaces';
import { SpaceIDController } from 'shared/lib';
import { useSpacesPageStore } from '../../model/slice/useSpacesPageStore';

export const SpaceTabs = () => {
	const { selectedTab, setSelectedTab } = useSpacesPageStore();

	const handleClickSpace = (spaceID: ISpace['id']) => {
		setSelectedTab('currentSpace');
		SpaceIDController.setCurrentSpaceIDAndSendEvent(spaceID);
	};

	switch (selectedTab) {
		case 'mySpaces':
			return <MySpaces onSpaceClick={handleClickSpace} />;
		default:
			return <CurrentSpace />;
	}
};
