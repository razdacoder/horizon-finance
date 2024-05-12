import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet";
import { Skeleton } from "@/components/ui/skeleton";
import { insertAccountSchema } from "@/db/schema";
import { useGetAccount } from "@/features/accounts/api/use-get-account";
import AccountForm from "@/features/accounts/components/account-form";
import { useOpenAccount } from "@/features/accounts/hooks/use-open-account";
import { z } from "zod";
import { useEditAccount } from "../api/use-edit-account";

const formSchema = insertAccountSchema.pick({ name: true });
type FormValues = z.input<typeof formSchema>;

export default function EditAccountSheet() {
  const { isOpen, onClose, id } = useOpenAccount();
  const accountQuery = useGetAccount(id);

  const mutation = useEditAccount(id);

  const isLoading = accountQuery.isLoading;

  const isPending = mutation.isPending;

  const onSubmit = (values: FormValues) => {
    mutation.mutate(values, {
      onSuccess: () => {
        onClose();
      },
    });
  };

  const defaultValues = accountQuery.data
    ? {
        name: accountQuery.data.name,
      }
    : {
        name: "",
      };
  return (
    <Sheet open={isOpen} onOpenChange={onClose}>
      <SheetContent className="">
        <SheetHeader>
          <SheetTitle>Edit Account</SheetTitle>
          <SheetDescription>Edit an existing account.</SheetDescription>
        </SheetHeader>
        {isLoading ? (
          <div className="space-y-4">
            <Skeleton className="w-full h-12" />
            <Skeleton className="w-full h-12" />
            <Skeleton className="w-full h-12" />
          </div>
        ) : (
          <AccountForm
            id={id}
            onSubmit={onSubmit}
            disabled={isPending}
            defaultValues={defaultValues}
          />
        )}
      </SheetContent>
    </Sheet>
  );
}
