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
  artist: string;
  album: string;
  track: string;
  startTimestamp: string;
  endTimestamp: string;
}
export type SelectionType = "artist" | "album" | "track" | "year";
export interface Option {
    key: string;
    dataType: SelectionType;
    value: string;
}
export interface OptionProps {
    dataType: string;
    options: Option[];
}