import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import type { TSpacesTabsName } from '../types/spacesTabs';

interface ISpacesPageStore {
	/** Поля */
	selectedTab: TSpacesTabsName;

	/** Методы */
	setSelectedTab: (selectedTab: TSpacesTabsName) => void;
}

export const useSpacesPageStore = create<ISpacesPageStore>()(
	persist(
		(set, get) => ({
			selectedTab: 'currentSpace',

			setSelectedTab: (selectedTab: TSpacesTabsName) => {
				set({ selectedTab });
			},
		}),
		{ name: 'spaces-page-storage' },
	),
);
