import { client } from "@/lib/hono";
import {
  HydrationBoundary,
  QueryClient,
  dehydrate,
} from "@tanstack/react-query";
import Accounts from "./accounts-page";

export default async function AccountPage() {
  const queryClient = new QueryClient();
  await queryClient.prefetchQuery({
    queryKey: ["accounts"],
    queryFn: async () => {
      const response = await client.api.accounts.$get();
      if (!response.ok) {
        throw new Error("Failed to fetch accounts");
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
