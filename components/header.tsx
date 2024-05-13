import HeaderLogo from "@/components/header-logo";
import Navigation from "@/components/navigation";
import WelcomeMessage from "@/components/welcome-msg";
import { ClerkLoaded, ClerkLoading, UserButton } from "@clerk/nextjs";
import { Loader2 } from "lucide-react";
import Filters from "./filters";

export default function Header() {
  return (
    <header className=" bg-gradient-to-b from-primary to-primary/80 px-4 py-8 lg:px-14 pb-36">
      <div className="max-w-screen-2xl mx-auto">
        <div className="w-full flex items-center justify-between mb-14">
          <div className="flex items-center lg:gap-x-16">
            <HeaderLogo />
            <Navigation />
          </div>
          <div className="flex items-center gap-x-2">
            {/* <ThemeToggle /> */}

            <ClerkLoaded>
              <UserButton afterSignOutUrl="/" />
            </ClerkLoaded>
            <ClerkLoading>
              <Loader2 className="size-6 animate-spin text-slate-300" />
            </ClerkLoading>
          </div>
        </div>
        <WelcomeMessage />
        <Filters />
      </div>
    </header>
  );
}
