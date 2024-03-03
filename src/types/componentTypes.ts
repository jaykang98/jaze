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
    selectionType: SelectionType;
    startTimestamp?: string; // Add other form fields as necessary
    endTimestamp?: string;
    [key: string]: any;
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
    formData: GenerateDataFormState;
    setFormData: (formData: GenerateDataFormState | ((prevState: GenerateDataFormState) => GenerateDataFormState)) => void;
    userID?: string;
    selectionType: SelectionType;
}
export interface GenerateDataFormState {
    selectionType: SelectionType; // Assuming SelectionType is already defined elsewhere
    startTimestamp?: string; // Assuming timestamp is stored as a string, adjust if necessary
    endTimestamp?: string;
    [key: string]: string | undefined; // To dynamically handle album, artist, track, etc.
}