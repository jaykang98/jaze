import { IconDefinition } from "@fortawesome/free-solid-svg-icons";
import { SelectionType } from "./dataTypes";

export interface InputProps {
  id?: string;
  label?: string;
  type: string;
  name?: string;
  value?: string;
  onChange?: (event: React.ChangeEvent<HTMLInputElement>) => void;
  placeholder?: string;
  icon?: IconDefinition;
  dataType?: string;
  style?: React.CSSProperties;
}
export interface Option {
  label: string;
  key: string;
  dataType: SelectionType;
  value: string;
  onClick?: () => void;
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
  dataType?: SelectionType;
}
