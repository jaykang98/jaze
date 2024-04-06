import { SelectionType } from "./dataTypes";

export interface ViewConstructorProps {
  error?: Error | null;
  onViewChange?: any;
  activityName?: string;
}

export interface ActivityConstructorProps {
  error?: Error | null;
  onViewChange?: any;
  activityName?: string;
}

export interface FormData {
  selectionType: SelectionType;
  startTimestamp?: string;
  endTimestamp?: string;
  [key: string]: any;
}

export interface MainFormProps {
  formData: MainFormState;
  setFormData: (
    formData: MainFormState | ((prevState: MainFormState) => MainFormState),
  ) => void;
  selectionType: SelectionType;
}
export interface MainFormState {
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
