import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { convertAmountToMilliUnit } from "@/lib/utils";
import { format, parse } from "date-fns";
import { useState } from "react";
import { ImportTable } from "./import-table";

const dateFormat = "yyyy-MM-dd HH:mm:ss";
const outputFormat = "yyyy-MM-dd";

const requiredFields = ["amount", "date", "payee"];

interface SelectedColumnsState {
  [key: string]: string | null;
}

type Props = {
  data: string[][];
  onCancel: () => void;
  onSubmit: (data: any) => void;
};

export const ImportCard = ({ data, onCancel, onSubmit }: Props) => {
  const [selectedColums, setSelectedColumns] = useState<SelectedColumnsState>(
    {}
  );
  const headers = data[0];
  const body = data.slice(1);

  const onTableHeadSelectChange = (
    columnIndex: number,
    value: string | null
  ) => {
    setSelectedColumns((prev) => {
      const newSelectedColumns = { ...prev };

      for (const key in newSelectedColumns) {
        if (newSelectedColumns[key] === value) {
          newSelectedColumns[key] = null;
        }
      }

      if (value === "skip") {
        value = null;
      }
      newSelectedColumns[`column_${columnIndex}`] = value;
      return newSelectedColumns;
    });
  };

  const progress = Object.values(selectedColums).filter(Boolean).length;

  const handleContinue = () => {
    const getColumnIndex = (column: string) => {
      return column.split("_")[1];
    };

    const mappedData = {
      headers: headers.map((_header, index) => {
        const columnIndex = getColumnIndex(`column_${index}`);
        return selectedColums[`column_${columnIndex}`] || null;
      }),
      body: body.map((row) => {
        const transformedRow = row.map((cell, index) => {
          const columnIndex = getColumnIndex(`colunm_${index}`);
          return selectedColums[`column_${columnIndex}`] ? cell : null;
        });

        return transformedRow.every((item) => item === null)
          ? []
          : transformedRow;
      }),
    };

    const arrayOfData = mappedData.body.map((row) => {
      return row.reduce((acc: any, cell, index) => {
        const header = mappedData.headers[index];
        if (header !== null) {
          acc[header] = cell;
        }

        return acc;
      }, {});
    });

    const formattedData = arrayOfData.map((item) => ({
      ...item,
      amount: convertAmountToMilliUnit(item.amount),
      date: format(parse(item.date, dateFormat, new Date()), outputFormat),
    }));

    onSubmit(formattedData);
  };
  return (
    <div className=" max-w-screen-2xl mx-auto w-full pb-10 -mt-24">
      <Card className="border-none drop-shadow-sm ">
        <CardHeader className="gap-y-2 lg:flex-row lg:items-center lg:justify-between">
          <CardTitle className="text-xl line-clamp-1">
            Import Transaction
          </CardTitle>
          <div className="flex items-center gap-x-2">
            <Button
              className="w-1/2 lg:w-auto"
              variant="outline"
              size="sm"
              onClick={onCancel}
            >
              Cancel
            </Button>
            <Button
              size="sm"
              className="w-1/2 lg:w-auto"
              disabled={progress < requiredFields.length}
              onClick={handleContinue}
            >
              Continue ({progress} /{" "}
              {progress > requiredFields.length
                ? progress
                : requiredFields.length}
              )
            </Button>
          </div>
        </CardHeader>
        <CardContent>
          <ImportTable
            headers={headers}
            body={body}
            selectedColumns={selectedColums}
            onTableHeadSelectChange={onTableHeadSelectChange}
          />
        </CardContent>
      </Card>
    </div>
  );
};
