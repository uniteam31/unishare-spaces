import type { ReactNode } from 'react';
import { CurrentSpace } from 'widgets/CurrentSpace';
import { MySpaces } from 'widgets/MySpaces';

export type TSpacesTabsName = 'mySpaces' | 'currentSpace';

type TSpacesTab = {
	title: string;
	Component: ReactNode;
};

export const spacesTabs: Record<TSpacesTabsName, TSpacesTab> = {
	currentSpace: {
		title: 'Текущее пространство',
		Component: <CurrentSpace />,
	},
	mySpaces: {
		title: 'Мои пространства',
		Component: <MySpaces />,
	},
};
