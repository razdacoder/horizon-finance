import { format } from "date-fns";
import {
  Area,
  AreaChart,
  CartesianGrid,
  ResponsiveContainer,
  Tooltip,
  XAxis,
} from "recharts";
import CustomToolTip from "./custom-tootip";

type Props = {
  data: {
    date: string;
    income: number;
    expense: number;
  }[];
};

export default function AreaVariant({ data }: Props) {
  return (
    <ResponsiveContainer width="100%" height={350}>
      <AreaChart data={data}>
        <CartesianGrid strokeDasharray="3 3" />
        <defs>
          <linearGradient id="income" x1="0" y1="0" x2="0" y2="1">
            <stop offset="2%" stopColor="#f97316" stopOpacity={0.8} />
            <stop offset="98%" stopColor="#f97316" stopOpacity={0} />
          </linearGradient>
          <linearGradient id="expense" x1="0" y1="0" x2="0" y2="1">
            <stop offset="2%" stopColor="#f43f5e" stopOpacity={0.8} />
            <stop offset="98%" stopColor="#f43f5e" stopOpacity={0} />
          </linearGradient>
        </defs>
        <XAxis
          axisLine={false}
          tickLine={false}
          dataKey="date"
          tickFormatter={(value) => format(value, "dd MMM")}
          style={{ fontSize: "12px" }}
          tickMargin={16}
        />
        <Tooltip content={<CustomToolTip />} />
        <Area
          type="monotone"
          dataKey="income"
          stackId="income"
          strokeWidth={2}
          stroke="#f97316"
          fill="url(#income)"
        />

        <Area
          type="monotone"
          dataKey="expense"
          stackId="expense"
          strokeWidth={2}
          stroke="#f43f5e"
          fill="url(#expense)"
        />
      </AreaChart>
    </ResponsiveContainer>
  );
}
