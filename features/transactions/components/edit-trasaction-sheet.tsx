import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet";
import { Skeleton } from "@/components/ui/skeleton";
import { insertTransactionSchema } from "@/db/schema";
import { useCreateAccount } from "@/features/accounts/api/use-create-account";
import { useGetAccounts } from "@/features/accounts/api/use-get-accounts";
import { useCreateCategory } from "@/features/categories/api/use-create-categories";
import { useGetCategories } from "@/features/categories/api/use-get-categories";
import { useConfirm } from "@/hooks/use-confirm";
import { convertMilliUnitToAmount } from "@/lib/utils";
import { z } from "zod";
import { useDeleteTransaction } from "../api/use-delete-transaction";
import { useEditTransaction } from "../api/use-edit-transaction";
import { useGetTransaction } from "../api/use-get-transaction";
import { useOpenTrasaction } from "../hooks/use-open-transaction";
import TransactionForm from "./transaction-form";

const formSchema = insertTransactionSchema.omit({ id: true });
type FormValues = z.input<typeof formSchema>;

export default function EditTrasnactionSheet() {
  const { isOpen, onClose, id } = useOpenTrasaction();
  const trasactionQuery = useGetTransaction(id);
  const [ConfrimDialog, confirm] = useConfirm(
    "Are you sure?",
    "You are about to delete this transaction."
  );

  const editMutation = useEditTransaction(id);
  const deleteMutation = useDeleteTransaction(id);

  const categoryQuery = useGetCategories();
  const categoryMutation = useCreateCategory();
  const onCreateCategory = (name: string) => categoryMutation.mutate({ name });
  const categoryOptions = (categoryQuery.data ?? []).map((category) => ({
    label: category.name,
    value: category.id,
  }));

  const accountsQuery = useGetAccounts();
  const accountMutation = useCreateAccount();
  const onCreateAccount = (name: string) => accountMutation.mutate({ name });
  const accountOptions = (accountsQuery.data ?? []).map((account) => ({
    label: account.name,
    value: account.id,
  }));

  const isLoading =
    trasactionQuery.isLoading ||
    categoryQuery.isLoading ||
    accountsQuery.isLoading;

  const isPending =
    editMutation.isPending ||
    deleteMutation.isPending ||
    trasactionQuery.isLoading ||
    categoryMutation.isPending ||
    accountMutation.isPending;

  const onSubmit = (values: FormValues) => {
    editMutation.mutate(values, {
      onSuccess: () => {
        onClose();
      },
    });
  };

  const defaultValues = trasactionQuery.data
    ? {
        accountId: trasactionQuery.data.accountId,
        categoryId: trasactionQuery.data.categoryId,
        date: trasactionQuery.data.date
          ? new Date(trasactionQuery.data.date)
          : new Date(),
        payee: trasactionQuery.data.payee,
        amount: convertMilliUnitToAmount(
          trasactionQuery.data.amount
        ).toString(),
        notes: trasactionQuery.data.notes,
      }
    : {
        accountId: "",
        categoryId: "",
        date: new Date(),
        amount: "",
        payee: "",
        notes: "",
      };

  const handleDelete = async () => {
    const ok = await confirm();
    if (ok) {
      deleteMutation.mutate(undefined, {
        onSuccess: () => {
          onClose();
        },
      });
    }
  };
  return (
    <>
      <ConfrimDialog />
      <Sheet open={isOpen} onOpenChange={onClose}>
        <SheetContent className="">
          <SheetHeader>
            <SheetTitle>Edit Transaction</SheetTitle>
            <SheetDescription>Edit an existing transaction.</SheetDescription>
          </SheetHeader>
          {isLoading ? (
            <div className="space-y-4">
              <Skeleton className="w-full h-12" />
              <Skeleton className="w-full h-12" />
              <Skeleton className="w-full h-12" />
            </div>
          ) : (
            <TransactionForm
              id={id}
              defaultValues={defaultValues}
              onSubmit={onSubmit}
              disabled={isPending}
              onDelete={handleDelete}
              categoryOptions={categoryOptions}
              onCreateCategory={onCreateCategory}
              accountOptions={accountOptions}
              onCreateAccount={onCreateAccount}
            />
          )}
        </SheetContent>
      </Sheet>
    </>
  );
}
