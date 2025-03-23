import { TSpaceMember, useGetCurrentSpaceInfo } from 'entitites/Space';
import { useDeleteSpaceMember } from '../api/useDeleteSpaceMember';
import s from './DeleteSpaceMember.module.scss';

type Props = {
	userID: TSpaceMember['id'];
};

export const DeleteSpaceMember = (props: Props) => {
	const { userID } = props;

	const { mutateSpace } = useGetCurrentSpaceInfo();
	// TODO: лоадеры
	const { deleteSpaceMember } = useDeleteSpaceMember();

	const updateCachedMembers = () => {
		mutateSpace((space) => {
			if (space) {
				return {
					...space,
					members: space.members.filter((member) => member.id !== userID),
				};
			}
		}).finally();
	};

	const handleClick = () => {
		deleteSpaceMember({ userID }).then(() => updateCachedMembers());
	};

	return (
		<div role={'button'} className={s.DeleteSpaceMember} onClick={handleClick}>
			Удалить участника
		</div>
	);
};
