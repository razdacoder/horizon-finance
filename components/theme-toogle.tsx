"use client";
import { Button } from "@/components/ui/button";
import { Moon, Sun } from "lucide-react";
import { useTheme } from "next-themes";
import { useEffect, useState } from "react";

export default function ThemeToggle() {
  const { setTheme, theme } = useTheme();
  const [client, setClient] = useState(true);

  useEffect(() => {
    setClient(false);
  }, []);

  if (client) {
    return null;
  }
  return (
    <>
      {theme === "light" ? (
        <Button
          variant="ghost"
          size="icon"
          onClick={() => setTheme("dark")}
          className="text-white focus:bg-transparent hover:bg-transparent hover:text-white transition"
        >
          <Sun className="h-[1.2rem] w-[1.2rem] rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
          <span className="sr-only">Toggle theme</span>
        </Button>
      ) : (
        <Button
          variant="ghost"
          size="icon"
          onClick={() => setTheme("light")}
          className="text-white focus:bg-transparent hover:bg-transparent hover:text-white transition"
        >
          <Moon className="absolute h-[1.2rem] w-[1.2rem] rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
          <span className="sr-only">Toggle theme</span>
        </Button>
      )}
    </>
  );
}
