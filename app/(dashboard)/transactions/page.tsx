import { client } from "@/lib/hono";
import {
  HydrationBoundary,
  QueryClient,
  dehydrate,
} from "@tanstack/react-query";
import Accounts from "./trasnaction-page";

type Props = {
  searchParams: {
    from?: string;
    to?: string;
    accountId?: string;
  };
};

export default async function TransactionPage({ searchParams }: Props) {
  const queryClient = new QueryClient();
  await queryClient.prefetchQuery({
    queryKey: [
      "transactions",
      {
        from: searchParams.from,
        to: searchParams.to,
        accountId: searchParams.accountId,
      },
    ],
    queryFn: async () => {
      const response = await client.api.transactions.$get({
        query: {
          from: searchParams.from,
          to: searchParams.to,
          accountId: searchParams.accountId,
        },
      });
      if (!response.ok) {
        throw new Error("Failed to fetch transactions");
      }

      const { data } = await response.json();
      return data;
    },
  });
  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <Accounts />
    </HydrationBoundary>
  );
}
