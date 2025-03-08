import { FormWrapper } from '@uniteam31/uni-shared-toolkit';
import type { TSpaceFormFields } from 'entitites/Space';
import { useForm } from 'react-hook-form';
import { ModalUI } from 'shared/ui';
import { Form } from '../Form/Form';

type Props = {
	isOpen: boolean;
	onClose: () => void;
};

export const Modal = (props: Props) => {
	const { isOpen, onClose } = props;

	const methods = useForm<TSpaceFormFields>();

	return (
		<ModalUI isOpen={isOpen} onClose={onClose}>
			<FormWrapper methods={methods}>
				<Form onFormClose={onClose} />
			</FormWrapper>
		</ModalUI>
	);
};
