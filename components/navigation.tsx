"use client";

import { Search, Menu, Moon, Sun } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useTheme } from "next-themes";
import { useState } from "react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
  DropdownMenuLabel,
  DropdownMenuSeparator,
} from "@/components/ui/dropdown-menu";
import { useRouter } from "next/navigation";

const languages = [
  { code: "pa", name: "ਪੰਜਾਬੀ", display: "ਪੰਜਾਬੀ" },
  { code: "hi", name: "हिंदी", display: "हिंदी" },
  { code: "en", name: "English", display: "EN" },
  { code: "ur", name: "اردو", display: "اردو" },
  { code: "bn", name: "বাংলা", display: "বাংলা" },
  { code: "gu", name: "ગુજરાતી", display: "ગુજરાતી" },
  { code: "mr", name: "मराठी", display: "मराठी" },
  { code: "ta", name: "தமிழ்", display: "தமிழ்" },
  { code: "te", name: "తెలుగు", display: "తెలుగు" },
  { code: "kn", name: "ಕನ್ನಡ", display: "ಕನ್ನಡ" },
  { code: "ml", name: "മലയാളം", display: "മലയാളം" },
  { code: "ne", name: "नेपाली", display: "नेपाली" },
  { code: "si", name: "සිංහල", display: "සිංහල" },
  { code: "th", name: "ไทย", display: "ไทย" },
  { code: "my", name: "မြန်မာ", display: "မြန်မာ" },
  { code: "zh", name: "中文", display: "中文" },
  { code: "ja", name: "日本語", display: "日本語" },
  { code: "ko", name: "한국어", display: "한국어" },
  { code: "fr", name: "Français", display: "FR" },
  { code: "de", name: "Deutsch", display: "DE" },
  { code: "es", name: "Español", display: "ES" },
  { code: "pt", name: "Português", display: "PT" },
  { code: "ru", name: "Русский", display: "RU" },
  { code: "ar", name: "العربية", display: "العربية" },
];

export function Navigation() {
  const { setTheme } = useTheme();
  const [currentLang, setCurrentLang] = useState(languages[2]); // Default to English
  const router = useRouter();

  return (
    <nav className="border-b">
      <div className="max-w-screen-xl mx-auto px-4 py-3 flex items-center justify-between">
        <div className="flex items-center gap-6">
          <Button variant="ghost" size="icon" className="md:hidden">
            <Menu className="h-5 w-5" />
          </Button>
          <Button 
            variant="ghost" 
            className="text-xl font-bold hover:bg-transparent"
            onClick={() => {
              router.push('/');
              router.refresh();
            }}
          >
            ਗੁਰਬਾਣੀ
          </Button>
        </div>

        <div className="hidden md:flex items-center gap-6">
          <Button variant="ghost">Shabad</Button>
          <Button variant="ghost">Ang</Button>
          <Button variant="ghost">Sundar Gutka</Button>
          <Button variant="ghost">Hukamnama</Button>
        </div>

        <div className="flex items-center gap-2">
          <Button variant="ghost" size="icon">
            <Search className="h-5 w-5" />
          </Button>

          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" className="min-w-[2.5rem]">
                {currentLang.display}
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-[240px] max-h-[400px] overflow-y-auto">
              <DropdownMenuLabel>Select Language</DropdownMenuLabel>
              <DropdownMenuSeparator />
              {languages.map((lang) => (
                <DropdownMenuItem
                  key={lang.code}
                  onClick={() => setCurrentLang(lang)}
                  className="flex items-center gap-2"
                >
                  {lang.name}
                </DropdownMenuItem>
              ))}
            </DropdownMenuContent>
          </DropdownMenu>
          
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" size="icon">
                <Sun className="h-5 w-5 rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
                <Moon className="absolute h-5 w-5 rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
                <span className="sr-only">Toggle theme</span>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuItem onClick={() => setTheme("light")}>
                Light
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => setTheme("dark")}>
                Dark
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => setTheme("system")}>
                System
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>
    </nav>
  );
}