import { useState } from 'react';
import { Avatar, Button, DropdownMenu } from 'shared/ui';
import type { TDropdownItem } from 'shared/ui';
import type { TSpaceMember } from '../../model/space';
import s from './MemberCard.module.scss';

type Props = TSpaceMember & {
	dropdownMenuItems?: TDropdownItem[];
	//
	className?: string;
};

export const MemberCard = (props: Props) => {
	const { id, username, firstName, lastName, dropdownMenuItems } = props;

	const [isDropdownMenuOpen, setIsDropdownMenuOpen] = useState(false);

	const handleToggleDropdownMenu = () => {
		setIsDropdownMenuOpen((prev) => !prev);
	};

	return (
		<div className={s.MemberCard}>
			<div className={s.userInfo}>
				<Avatar
					// TODO расхардкодить
					src={
						'https://avatars.mds.yandex.net/i?id=29f7366ac823f46165612d9480e60f0e_l-13215132-images-thumbs&n=13'
					}
					className={s.avatar}
				/>

				<div>
					<div className={s.username}>{username}</div>

					<div>{firstName}</div>

					<div>{lastName}</div>
				</div>
			</div>

			{dropdownMenuItems && dropdownMenuItems.length > 0 && (
				<DropdownMenu
					target={
						<Button className={s.menuButton} onClick={handleToggleDropdownMenu}>
							...
						</Button>
					}
					position={'bottom-left'}
					items={dropdownMenuItems}
					isOpen={isDropdownMenuOpen}
					onClose={handleToggleDropdownMenu}
				/>
			)}
		</div>
	);
};
