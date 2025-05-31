import type { PropsWithChildren } from 'react';
import { Button, ModalUI, Warning } from '../../';
import { formatApiErrorMessages } from '../../../lib';
import s from './ConfirmModal.module.scss';

type Props = {
	isOpen: boolean;
	onClose: () => void;
	//
	onSuccess: () => void;
	onCancel: () => void;
	//
	isLoading?: boolean;
	errors?: string | null;
};

// TODO: вынести в shared ui
export const ConfirmModal = (props: PropsWithChildren<Props>) => {
	const { isOpen, onClose, onSuccess, onCancel, children: content } = props;

	const { isLoading, errors } = props;

	return (
		<ModalUI isOpen={isOpen} onClose={onClose}>
			<div className={s.ConfirmModal}>
				{!isLoading && errors && (
					<Warning
						className={s.error}
						title={'Ошибка'}
						text={formatApiErrorMessages(errors)}
						theme={'red'}
					/>
				)}

				{content}

				<div className={s.buttons}>
					<Button onClick={onSuccess} disabled={isLoading}>
						Подтвердить
					</Button>

					<Button onClick={onCancel}>Отменить</Button>
				</div>
			</div>
		</ModalUI>
	);
};
