/* eslint-disable @typescript-eslint/no-explicit-any */
import { IconDefinition } from "@fortawesome/free-solid-svg-icons";
import { SelectionType } from "./dataTypes";

export interface ViewConstructorProps {
  error?: Error | null;
  onViewChange?: any;
  activityName?: string;
  userID: string | null;
}

export interface ActivityConstructorProps {
  error?: Error | null;
  onViewChange?: any;
  activityName?: string;
  userID: string | null;
}

export interface FormData {
  selectionType: SelectionType;
  startTimestamp?: string;
  endTimestamp?: string;
  [key: string]: any;
}

export interface GenerateDataFormProps {
  formData: GenerateDataFormState;
  setFormData: (
    formData:
      | GenerateDataFormState
      | ((prevState: GenerateDataFormState) => GenerateDataFormState),
  ) => void;
  userID?: string;
  selectionType: SelectionType;
}
export interface GenerateDataFormState {
  selectionType: SelectionType;
  startTimestamp?: string;
  endTimestamp?: string;
  [key: string]: string | undefined;
}

export { SelectionType };
export interface ViewSectionProps {
  children: React.ReactNode;
  style?: React.CSSProperties;
}
export interface ViewFrameProps {
  children: React.ReactNode;
  splitPercentage?: number;
}
