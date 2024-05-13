"use client";

import { useGetAccounts } from "@/features/accounts/api/use-get-accounts";
import { useGetSummary } from "@/features/summary/api/use-get-summary";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import qs from "query-string";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "./ui/select";

export default function AccountFilter() {
  const { data: accounts, isLoading: isLoadingAccounts } = useGetAccounts();
  const { isLoading: isLoadingSummary } = useGetSummary();
  const pathname = usePathname();
  const router = useRouter();
  const searchParams = useSearchParams();

  const accountId = searchParams.get("accountId") || "all";
  const from = searchParams.get("from") || "";
  const to = searchParams.get("to") || "";

  const onChange = (newValue: string) => {
    const query = {
      accountId: newValue,
      from,
      to,
    };

    if (newValue === "all") {
      query.accountId = "";
    }

    const url = qs.stringifyUrl(
      {
        url: pathname,
        query,
      },
      { skipNull: true, skipEmptyString: true }
    );

    router.push(url);
  };

  return (
    <Select
      value={accountId}
      onValueChange={onChange}
      disabled={isLoadingAccounts || isLoadingSummary}
    >
      <SelectTrigger className="lg:w-auto w-full  rounded-md px-3 font-normal bg-white/10 hover:bg-white/20 border-none hover:text-white focus:ring-offset-0 focus:ring-transparent outline-none text-white focus:bg-white/30 transition">
        <SelectValue placeholder="Select account" />
      </SelectTrigger>
      <SelectContent>
        <SelectItem value="all">All accounts</SelectItem>
        {accounts?.map((account) => (
          <SelectItem key={account.id} value={account.id}>
            {account.name}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  );
}
