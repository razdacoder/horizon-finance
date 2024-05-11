import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import Link from "next/link";

type Props = {
  href: string;
  label: string;
  isActive?: boolean;
};

export default function NavButton({ href, label, isActive }: Props) {
  return (
    <Button
      asChild
      variant="outline"
      size="sm"
      className={cn(
        "w-full lg:w-auto justify-between font-normal hover:bg-white/20 hover:text-white text-white border-none focus-visible:ring-offset-0 focus-visible:ring-transparent outline-none focus:bg-white/30 transition",
        isActive ? "bg-white/10" : "bg-transparent"
      )}
    >
      <Link href={href}>{label}</Link>
    </Button>
  );
}
