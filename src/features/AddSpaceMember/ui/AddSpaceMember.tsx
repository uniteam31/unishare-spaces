import { useGetCurrentSpaceInfo } from 'entitites/Space';
import type { IUser } from 'entitites/User';
import { Button } from 'shared/ui';
import { useAddSpaceMember } from '../api/useAddSpaceMember';

type Props = {
	userID: IUser['id'];
};

export const AddSpaceMember = (props: Props) => {
	const { userID } = props;

	// TODO: добавить уведомление на ошибку
	const { addSpaceMember, isLoading, error } = useAddSpaceMember();

	const { mutateSpace } = useGetCurrentSpaceInfo();

	const updateCachedSpaceMembers = (addedMember: IUser) => {
		mutateSpace((space) => {
			if (!space) {
				return;
			}

			return { ...space, members: [...space.members, addedMember] };
		}).finally();
	};

	const handleAddSpaceMember = () => {
		addSpaceMember({ userID }).then(updateCachedSpaceMembers);
	};

	return (
		<Button disabled={isLoading} onClick={handleAddSpaceMember}>
			Добавить
		</Button>
	);
};
