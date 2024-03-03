/* eslint-disable @typescript-eslint/no-explicit-any */
import { IconDefinition } from "@fortawesome/free-solid-svg-icons";

export interface ViewProps {
  error?: Error | null;
  onViewChange?: any;
  userID: string | null;
}
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

export interface FormData {
  startTimestamp?: string;
  endTimestamp?: string;
  selectionType: SelectionType;
}
export type SelectionType = "artist" | "album" | "track" | "year";
export interface Option {
  key: string;
  dataType: SelectionType;
  value: string;
}
export interface OptionListProps {
  dataType: SelectionType;
  options: Option[];
}
export interface GenerateDataFormProps {
  formData: FormData;
  setFormData: (formData: FormData) => void; // Ensure this is always provided
  userID?: string;
  selectionType: SelectionType;
}
