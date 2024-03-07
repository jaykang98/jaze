import { IconDefinition } from "@fortawesome/free-solid-svg-icons";
import { SelectionType } from "./structureTypes";

export interface InputProps {
  id?: string;
  label?: string;
  type: string;
  name: string;
  value: string;
  onChange?: (event: React.ChangeEvent<HTMLInputElement>) => void;
  placeholder: string;
  icon?: IconDefinition;
}
export interface Option {
  key: string;
  dataType: SelectionType;
  value: string;
}
export interface OptionListProps {
  dataType: SelectionType;
  options: Option[];
  id?: string;
}
export interface ButtonProps {
  onClick?: (e: React.MouseEvent<HTMLButtonElement>) => void;
  children: React.ReactNode;
  type?: "button" | "submit" | "reset";
  className?: string;
  label?: string | null;
  disabled?: boolean;
}
