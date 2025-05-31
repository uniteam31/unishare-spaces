import useSWR from 'swr';
import { axiosInstance } from 'shared/api';
import { getApiResponseErrorMessage } from 'shared/lib';
import type { ApiResponse } from 'shared/types';
import type { ISpace } from '../model/space';

type Response = ApiResponse<ISpace[]>;

export const useGetUserSpaces = () => {
	const fetcher = () =>
		axiosInstance<Response>({ method: 'GET', url: '/users/spaces' }).then(
			(res) => res.data.data,
		);

	const { data, error, isValidating, mutate } = useSWR('api/users/spaces', fetcher);

	const spaces = data || [];

	return {
		mutateSpaces: mutate,
		spaces,
		error: getApiResponseErrorMessage(error),
		isLoading: isValidating,
	};
};
