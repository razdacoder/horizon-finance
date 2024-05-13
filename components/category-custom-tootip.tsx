import { convertMilliUnitToAmount, formatCurrency } from "@/lib/utils";
import { Separator } from "./ui/separator";

export default function CategoryCustomToolTip({ active, payload }: any) {
  if (!active) return null;
  const name = payload[0].payload.name;
  const value = payload[0].value;
  return (
    <div className="rounded-sm bg-white shadow-sm border overflow-hidden">
      <div className="text-sm p-2 px-3 bg-muted text-muted-foreground">
        {name}
      </div>
      <Separator />
      <div className="p-2 px-3 space-y-1">
        <div className="flex items-center justify-between gap-x-4">
          <div className="flex items-center gap-x-3">
            <div className="size-1.5 bg-rose-500 rounded-full"></div>
            <p className="text-xs text-muted-forground">Expenses</p>
          </div>
          <p className="text-sm text-right font-medium">
            {formatCurrency(convertMilliUnitToAmount(value * -1))}
          </p>
        </div>
      </div>
    </div>
  );
}
