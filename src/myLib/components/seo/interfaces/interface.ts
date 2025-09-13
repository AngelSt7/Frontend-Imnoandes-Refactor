import { LucideIcon } from "lucide-react";

export interface OptionSEO {
  key: string;  
  icon: LucideIcon;  
  label: string;     
  slug: string;  
}

export interface SelectSEOProps {
  regex: RegExp;
  mode: "single" | "multiple";
  joiner?: string;
  options: OptionSEO[];
}

export interface UseSEOSelectProps {
  regex: RegExp;
  mode: "single" | "multiple";
  joiner?: string;
  options: OptionSEO[];
}