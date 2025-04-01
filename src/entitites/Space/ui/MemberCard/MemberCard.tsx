import { useState } from 'react';
import type { ReactNode } from 'react';
import { Avatar, Button, DropdownMenu } from 'shared/ui';
import type { TDropdownItem } from 'shared/ui';
import type { TSpaceMember } from '../../model/space';
import s from './MemberCard.module.scss';

type Props = TSpaceMember & {
	// TODO: мб в будущем вынести туда, где используется и прокидывать через contentRight
	dropdownMenuItems?: TDropdownItem[];
	contentRight?: ReactNode;
	//
	className?: string;
};

export const MemberCard = (props: Props) => {
	const { id, avatar, username, firstName, lastName, dropdownMenuItems, contentRight } = props;

	const [isDropdownMenuOpen, setIsDropdownMenuOpen] = useState(false);

	const handleToggleDropdownMenu = () => {
		setIsDropdownMenuOpen((prev) => !prev);
	};

	return (
		<div className={s.MemberCard}>
			<div className={s.userInfo}>
				<Avatar src={avatar} className={s.avatar} />

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

			{contentRight}
		</div>
	);
};
