import type { TSpaceFormFields } from 'entitites/Space';
import { useForm } from 'react-hook-form';
import { FormWrapper } from 'shared/lib';
import { ModalUI } from 'shared/ui';
import { CreateForm } from '../CreateForm/CreateForm';

type Props = {
	isOpen: boolean;
	onClose: () => void;
};

export const CreateModal = (props: Props) => {
	const { isOpen, onClose } = props;

	const methods = useForm<TSpaceFormFields>();

	return (
		<ModalUI isOpen={isOpen} onClose={onClose}>
			<FormWrapper methods={methods}>
				<CreateForm onFormClose={onClose} />
			</FormWrapper>
		</ModalUI>
	);
};
