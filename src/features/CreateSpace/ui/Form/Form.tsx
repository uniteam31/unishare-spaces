import type { TSpaceFormFields } from 'entitites/Space';
import { useCallback } from 'react';
import { useController, useFormContext } from 'react-hook-form';
import { FormModalWrapper, Input } from 'shared/ui';
import { useCreateSpace } from '../../api/useCreateSpace';
import s from './Form.module.scss';

type Props = {
	onFormClose: () => void;
};

export const Form = (props: Props) => {
	const { onFormClose } = props;

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

	const handleSubmit = () => {
		const formValues = getValues();

		createSpace({ formValues })
			.then(() => onFormClose())
			.catch((err) => console.log(err));
	};

	const handleReset = useCallback(() => {
		reset();
	}, [reset]);

	return (
		<FormModalWrapper
			title={'Создать пространство'}
			onSubmit={handleSubmitContext(handleSubmit)}
			isDirty={isDirty}
			isLoading={isLoading}
			errors={error}
			onReset={handleReset}
		>
			<Input
				label={'Имя'}
				onChange={onChangeSpaceName}
				value={spaceName}
				className={s.input}
			/>
		</FormModalWrapper>
	);
};
