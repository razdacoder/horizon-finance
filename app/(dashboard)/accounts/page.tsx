import {
  HydrationBoundary,
  QueryClient,
  dehydrate,
} from "@tanstack/react-query";
import Accounts from "./accounts-page";

export default async function AccountPage() {
  const queryClient = new QueryClient();
  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <Accounts />
    </HydrationBoundary>
  );
}
