import type { TSpaceMember } from 'entitites/Space';
import { useCallback, useState } from 'react';
import { axiosInstance } from 'shared/api';
import { getApiResponseErrorMessage } from 'shared/lib';

type Props = {
	userID: TSpaceMember['id'];
};

export const useDeleteSpaceMember = () => {
	const [isLoading, setIsLoading] = useState<boolean>(false);
	const [error, setError] = useState<string | null>(null);

	const deleteSpaceMember = useCallback(async (props: Props) => {
		const { userID } = props;

		setIsLoading(true);
		setError(null);

		try {
			await axiosInstance.delete(`/spaces/members/${userID}`);
		} catch (error) {
			const errorMessage =
				getApiResponseErrorMessage(error) ||
				'Произошла неизвестная ошибка при удалении пользователя из пространства';

			setError(errorMessage);

			throw new Error(errorMessage);
		} finally {
			setIsLoading(false);
		}
	}, []);

	return {
		isLoading,
		error,
		deleteSpaceMember,
	};
};
