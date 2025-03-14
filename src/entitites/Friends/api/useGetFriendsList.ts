// TODO по итогу откуда импортировать такие случаи?
import type { IUser } from '@uniteam31/uni-shared-types';
import useSWR from 'swr';
import { axiosInstance } from 'shared/api';
import { getApiResponseErrorMessage } from 'shared/lib';
import type { ApiResponse } from 'shared/types';

type TGetFriendsListResponse = ApiResponse<IUser[]>;

export const useGetFriendsList = () => {
	const fetcher = () =>
		axiosInstance
			.get<TGetFriendsListResponse>('/friends/list')
			.then((response) => response.data.data);

	// TODO вынести все ключи
	const { data, error, mutate, isValidating } = useSWR('api/friends/list', fetcher);

	const friendsList = data || [];

	return {
		friendsList,
		isLoading: isValidating,
		error: getApiResponseErrorMessage(error),
		mutateFriendsList: mutate,
	};
};
