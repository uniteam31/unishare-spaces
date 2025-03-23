import type { ISpace, IUser } from '@uniteam31/uni-shared-types';

type TSpaceFormFields = Pick<ISpace, 'name'> & {
	membersIDs: IUser['id'][];
};

type TSpaceMember = ISpace['members'][number];

export type { ISpace, TSpaceFormFields, TSpaceMember };
