import type { IUser } from 'entitites/User';
import { useCallback, useState } from 'react';
import { axiosInstance } from 'shared/api';
import { getApiResponseErrorMessage } from 'shared/lib';
import { ApiResponse } from 'shared/types';

type Response = ApiResponse<IUser>;
type Props = {
	userID: IUser['id'];
};

export const useAddSpaceMember = () => {
	const [isLoading, setIsLoading] = useState<boolean>(false);
	const [error, setError] = useState<null | string>(null);

	const addSpaceMember = useCallback(async (props: Props) => {
		const { userID } = props;

		setIsLoading(true);
		setError(null);

		try {
			const response = await axiosInstance.put<Response>(`/spaces/members/${userID}`);

			const addedUser = response.data.data;

			return addedUser;
		} catch (error) {
			const errorMessage =
				getApiResponseErrorMessage(error) ||
				'Не удалось добавить пользователя в пространство';
			setError(errorMessage);

			throw new Error(errorMessage);
		} finally {
			setIsLoading(false);
		}
	}, []);

	return {
		addSpaceMember,
		isLoading,
		error,
	};
};
