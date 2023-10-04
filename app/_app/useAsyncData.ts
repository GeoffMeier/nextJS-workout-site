import {
	UseQueryOptions,
	UseQueryResult,
	useQuery,
} from "@tanstack/react-query";
import React, { useMemo } from "react";

type AsyncDataLoading = {
	data?: undefined;
	loading: true;
	error?: undefined;
};
type AsyncDataSuccessful<Data> = {
	data: Data;
	loading: false;
	error?: undefined;
};
type AsyncDataError = {
	data?: undefined;
	loading: false;
	error: Error;
};
type AsyncDataNotLoading<Data> = AsyncDataSuccessful<Data> | AsyncDataError;

export type AsyncData<Data> = AsyncDataLoading | AsyncDataNotLoading<Data>;

export function useAsyncData<NetworkType, ReturnType = NetworkType>(
	query: UseQueryOptions<NetworkType, Error, ReturnType>
): AsyncData<ReturnType> {
	return useToAsyncData(useQuery(query));
}

type AsyncDataHelper = {
	loading: AsyncDataLoading;
	error: (error: Error) => AsyncDataError;
	data: <Data>(data: Data) => AsyncDataSuccessful<Data>;
};
const asyncData: AsyncDataHelper = {
	loading: {
		loading: true,
	},
	error: (error: Error) => ({
		loading: false,
		error,
	}),
	data: <Data>(data: Data) => ({
		error: undefined,
		loading: false,
		data,
	}),
};

function useToAsyncData<Data>(
	queryResult: UseQueryResult<Data, Error>
): AsyncData<Data> {
	return React.useMemo(() => {
		if (queryResult.isLoading) {
			return asyncData.loading;
		}
		if (queryResult.isError) {
			return asyncData.error(queryResult.error);
		}
		return asyncData.data(queryResult.data);
	}, [
		queryResult.data,
		queryResult.error,
		queryResult.isError,
		queryResult.isLoading,
	]);
}
