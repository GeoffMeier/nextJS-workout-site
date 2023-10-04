"use client";
import React from "react";
import {
	useQuery,
	useMutation,
	useQueryClient,
	QueryClient,
	QueryClientProvider,
} from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";

type Props = {
	children: React.ReactNode;
};

const queryClient = new QueryClient();

export default function Providers(props: Props) {
	return (
		<QueryClientProvider client={queryClient}>
			<ReactQueryDevtools initialIsOpen={false} />
			{props.children}
		</QueryClientProvider>
	);
}
