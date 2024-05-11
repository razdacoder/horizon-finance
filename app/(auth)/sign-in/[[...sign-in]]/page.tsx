import { ClerkLoaded, ClerkLoading, SignIn } from "@clerk/nextjs";
import { Loader2 } from "lucide-react";
import Image from "next/image";

export default function SignInPage() {
  return (
    <div className="min-h-screen grid grid-cols-1 lg:grid-cols-2">
      <div className="flex justify-center items-center h-full">
        <ClerkLoading>
          <Loader2 className="size-5 animate-spin" />
        </ClerkLoading>
        <ClerkLoaded>
          <SignIn path="/sign-in" />
        </ClerkLoaded>
      </div>
      <div className="hidden lg:flex justify-center items-center h-full bg-primary">
        <Image src="/logo.svg" alt="Logo" width={100} height={100} />
      </div>
    </div>
  );
}
