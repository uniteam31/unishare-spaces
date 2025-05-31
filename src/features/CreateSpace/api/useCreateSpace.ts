import type { ISpace, TSpaceFormFields } from 'entitites/Space';
import { useCallback, useState } from 'react';
import { axiosInstance } from 'shared/api';
import { getApiResponseErrorMessage } from 'shared/lib';
import type { ApiResponse } from 'shared/types';

type Response = ApiResponse<ISpace>;
type Props = {
	formValues: TSpaceFormFields;
};

export const useCreateSpace = () => {
	const [isLoading, setIsLoading] = useState<boolean>(false);
	const [error, setError] = useState<null | string>(null);

	const createSpace = useCallback(async (props: Props) => {
		const { formValues } = props;

		setIsLoading(true);
		setError(null);

		try {
			const response = await axiosInstance.post<Response>('/spaces', formValues);
			const createdSpace = response.data.data;

			return createdSpace;
		} catch (error) {
			const errorMessage =
				getApiResponseErrorMessage(error) || 'Не удалось создать пространство';
			setError(errorMessage);

			throw new Error(errorMessage);
		} finally {
			setIsLoading(false);
		}
	}, []);

	return {
		createSpace,
		isLoading,
		error,
	};
};
