import { useGetFriendsList } from 'entitites/Friends';
import { useGetUserSpaces } from 'entitites/Space';
import type { TSpaceFormFields } from 'entitites/Space';
import { useCallback } from 'react';
import { useController, useFormContext } from 'react-hook-form';
import { SpaceIDController } from 'shared/lib';
import { FormModalWrapper, Input, Select, Avatar } from 'shared/ui';
import type { TSelectItem } from 'shared/ui';
import { useCreateSpace } from '../../api/useCreateSpace';
import s from './CreateForm.module.scss';

type Props = {
	onFormClose: () => void;
};

export const CreateForm = (props: Props) => {
	const { onFormClose } = props;

	// TODO состояния
	const { friendsList } = useGetFriendsList();
	const { mutateSpaces } = useGetUserSpaces();

	const {
		control,
		handleSubmit: handleSubmitContext,
		reset,
		getValues,
		formState: { isDirty },
	} = useFormContext<TSpaceFormFields>();

	const { createSpace, isLoading, error } = useCreateSpace();

	const {
		field: { onChange: onChangeSpaceName, value: spaceName },
	} = useController({ control, name: 'name', defaultValue: '' });

	const {
		field: { onChange: onChangeMembersIDs, value: membersIDs },
	} = useController({ control, name: 'membersIDs', defaultValue: [] });

	const friendsItems: TSelectItem[] = friendsList.map((friend) => ({
		label: friend.firstName,
		value: friend.id,
		contentLeft: <Avatar src={friend.avatar} className={s.selectAvatar} />,
	}));

	const selectedFriendsItems: TSelectItem[] = membersIDs.map((memberID) => {
		const friend = friendsList.find((friend) => friend.id === memberID);

		return {
			label: friend!.firstName,
			value: friend!.id,
			contentLeft: <Avatar src={friend!.avatar} className={s.selectedAvatar} />,
		};
	});

	const handleSelectMembers = useCallback(
		(selectedMembers: TSelectItem[]) => {
			const selectedMembersIDs = selectedMembers.map((member) => member.value);
			onChangeMembersIDs(selectedMembersIDs);
		},
		[onChangeMembersIDs],
	);

	const handleSubmit = () => {
		const formValues = getValues();

		// TODO
		createSpace({ formValues })
			.then((createdSpace) => {
				SpaceIDController.setCurrentSpaceIDAndSendEvent(createdSpace.id);
				onFormClose();
				mutateSpaces().finally();
			})
			.catch((err) => console.log(err));
	};

	const handleReset = useCallback(() => {
		reset();
	}, [reset]);

	return (
		<FormModalWrapper
			className={s.CreateForm}
			title={'Создать пространство'}
			text={'Вы можете создать пространство и пригласить в него своих друзей'}
			onSubmit={handleSubmitContext(handleSubmit)}
			isDirty={isDirty}
			isLoading={isLoading}
			errors={error}
			onReset={handleReset}
		>
			<div className={s.info}>
				<Avatar
					className={s.avatar}
					src={
						// TODO расхардкодить
						'https://avatars.mds.yandex.net/i?id=29f7366ac823f46165612d9480e60f0e_l-13215132-images-thumbs&n=13'
					}
				/>

				<Input
					label={'Название'}
					onChange={onChangeSpaceName}
					value={spaceName}
					className={s.input}
				/>
			</div>

			{!!friendsItems.length && (
				<Select
					className={s.select}
					placeholder={'Добавьте участников'}
					items={friendsItems}
					selectedItems={selectedFriendsItems}
					onSelect={handleSelectMembers}
					multiselect={true}
					closeOnClickOutside={true}
				/>
			)}
		</FormModalWrapper>
	);
};
