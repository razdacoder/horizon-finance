import { client } from "@/lib/hono";
import {
  HydrationBoundary,
  QueryClient,
  dehydrate,
} from "@tanstack/react-query";
import Accounts from "./categories-page";

export default async function CategoryPage() {
  const queryClient = new QueryClient();
  await queryClient.prefetchQuery({
    queryKey: ["categories"],
    queryFn: async () => {
      const response = await client.api.categories.$get();
      if (!response.ok) {
        throw new Error("Failed to fetch categories");
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
