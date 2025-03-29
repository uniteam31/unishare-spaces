import { useCallback, useState } from 'react';
import { axiosInstance } from 'shared/api';
import { getApiResponseErrorMessage } from 'shared/lib';

export const useLeaveCurrentSpace = () => {
	const [isLoading, setIsLoading] = useState<boolean>(false);
	const [error, setError] = useState<string | null>(null);

	const leaveCurrentSpace = useCallback(async () => {
		setIsLoading(true);
		setError(null);

		try {
			await axiosInstance.post('/spaces/leave');
		} catch (error) {
			const errorMessage =
				getApiResponseErrorMessage(error) ||
				'Произошла неизвестная ошибка при выходе из пространства';

			setError(errorMessage);

			throw new Error(errorMessage);
		} finally {
			setIsLoading(false);
		}
	}, []);

	return {
		isLoading,
		error,
		leaveCurrentSpace,
	};
};
