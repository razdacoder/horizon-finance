import { client } from "@/lib/hono";
import {
  HydrationBoundary,
  QueryClient,
  dehydrate,
} from "@tanstack/react-query";
import Dashboard from "./dashboard-page";
import DataChart from "./data-chart";

type Props = {
  searchParams: {
    from?: string;
    to?: string;
    accountId?: string;
  };
};

export default async function DashBoardPage({ searchParams }: Props) {
  const queryClient = new QueryClient();
  await queryClient.prefetchQuery({
    queryKey: [
      "summary",
      {
        from: searchParams.from,
        to: searchParams.to,
        accountId: searchParams.accountId,
      },
    ],
    queryFn: async () => {
      const response = await client.api.summary.$get({
        query: {
          from: searchParams.from,
          to: searchParams.to,
          accountId: searchParams.accountId,
        },
      });
      if (!response.ok) {
        throw new Error("Failed to fetch summary");
      }

      const { data } = await response.json();
      return data;
    },
  });
  return (
    <div className="max-w-screen-2xl mx-auto w-full pb-10 -mt-24">
      <HydrationBoundary state={dehydrate(queryClient)}>
        <Dashboard />
        <DataChart />
      </HydrationBoundary>
    </div>
  );
}
