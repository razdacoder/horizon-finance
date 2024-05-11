import Header from "@/components/header";
import { ReactNode } from "react";

type Props = {
  children: ReactNode;
};
export default function DashBoardLayout({ children }: Props) {
  return (
    <>
      <Header />
      <main className="px-3 lg:px-14">{children}</main>
    </>
  );
}
