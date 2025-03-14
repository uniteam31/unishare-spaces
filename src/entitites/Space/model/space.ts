import type { ISpace } from '@uniteam31/uni-shared-types';

type TSpaceFormFields = Pick<ISpace, 'name' | 'membersIDs'>;

export type { ISpace, TSpaceFormFields };
