"use client";

import { DataTable } from "@/components/data-table";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { transactions as trasactionSchema } from "@/db/schema";
import { useSelectAccount } from "@/features/accounts/hooks/use-select-account";
import { useBulkCreateTrasactions } from "@/features/transactions/api/use-bulk-create-transactions";
import { useBulkDeleteTransactions } from "@/features/transactions/api/use-bulk-delete-transactions";
import { useGetTransactions } from "@/features/transactions/api/use-get-transactions";
import { useNewTransaction } from "@/features/transactions/hooks/use-new-transaction";
import { Plus } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";
import { columns } from "./colunms";
import { ImportCard } from "./import-card";
import { UploadButton } from "./upload-button";

enum VARIANTS {
  LIST = "LIST",
  IMPORT = "IMPORT",
}

const INITIAL_IMPORT_RESULTS = {
  data: [],
  error: [],
  meta: {},
};

export default function Transactions() {
  const [AccountSelectDialog, confirm] = useSelectAccount();
  const [variat, setVariant] = useState<VARIANTS>(VARIANTS.LIST);
  const [importResults, setImportResults] = useState(INITIAL_IMPORT_RESULTS);

  const { onOpen } = useNewTransaction();
  const bulkCreateTransactions = useBulkCreateTrasactions();
  const transactionQuery = useGetTransactions();
  const deleteTransactions = useBulkDeleteTransactions();
  const transactions = transactionQuery.data || [];

  const onUpload = (results: typeof INITIAL_IMPORT_RESULTS) => {
    setImportResults(results);
    setVariant(VARIANTS.IMPORT);
  };

  const onCancelImport = () => {
    setImportResults(INITIAL_IMPORT_RESULTS);
    setVariant(VARIANTS.LIST);
  };

  const isDisabled = transactionQuery.isLoading || deleteTransactions.isPending;
  if (transactionQuery.isLoading) {
    return (
      <div className=" max-w-screen-2xl mx-auto w-full pb-10 -mt-24">
        <Card className="border-none drop-shadow-sm ">
          <CardHeader className="gap-y-2 lg:flex-row lg:items-center lg:justify-between">
            <Skeleton className="h-8 w-48" />
          </CardHeader>
          <CardContent>
            <div className="w-full space-y-4">
              <div className="grid grid-cols-3 space-x-6">
                <Skeleton className="h-12" />
                <Skeleton className="h-12" />
                <Skeleton className="h-12" />
              </div>{" "}
              <div className="grid grid-cols-3 space-x-6">
                <Skeleton className="h-12" />
                <Skeleton className="h-12" />
                <Skeleton className="h-12" />
              </div>{" "}
              <div className="grid grid-cols-3 space-x-6">
                <Skeleton className="h-12" />
                <Skeleton className="h-12" />
                <Skeleton className="h-12" />
              </div>{" "}
              <div className="grid grid-cols-3 space-x-6">
                <Skeleton className="h-12" />
                <Skeleton className="h-12" />
                <Skeleton className="h-12" />
              </div>{" "}
              <div className="grid grid-cols-3 space-x-6">
                <Skeleton className="h-12" />
                <Skeleton className="h-12" />
                <Skeleton className="h-12" />
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    );
  }

  const onSumitImport = async (
    values: (typeof trasactionSchema.$inferInsert)[]
  ) => {
    const accountId = await confirm();
    if (!accountId) {
      toast.error("Please select an account to continue");
    }
    const data = values.map((value) => ({
      ...value,
      accountId: accountId as string,
    }));
    bulkCreateTransactions.mutate(data, {
      onSuccess: () => {
        onCancelImport();
      },
    });
  };

  if (variat === VARIANTS.IMPORT) {
    return (
      <>
        <AccountSelectDialog />
        <ImportCard
          data={importResults.data}
          onCancel={onCancelImport}
          onSubmit={onSumitImport}
        />
      </>
    );
  }
  return (
    <div className=" max-w-screen-2xl mx-auto w-full pb-10 -mt-24">
      <Card className="border-none drop-shadow-sm ">
        <CardHeader className="gap-y-2 lg:flex-row lg:items-center lg:justify-between">
          <CardTitle className="text-xl line-clamp-1">
            Transaction History
          </CardTitle>
          <div className="flex items-center gap-x-2">
            <Button className="w-1/2 lg:w-auto" size="sm" onClick={onOpen}>
              <Plus className="size-4 mr-2" />
              Add new
            </Button>
            <UploadButton onUpload={onUpload} />
          </div>
        </CardHeader>
        <CardContent>
          <DataTable
            filterKey="payee"
            columns={columns}
            data={transactions}
            onDelete={(rows) => {
              const ids = rows.map((row) => row.original.id);
              deleteTransactions.mutate({ ids });
            }}
            disabled={isDisabled}
          />
        </CardContent>
      </Card>
    </div>
  );
}
