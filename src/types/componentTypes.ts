import { IconDefinition } from "@fortawesome/free-solid-svg-icons";

export interface ViewProps {
    userID: string | null;
    error?: Error | null;
    onViewChange?: any;
}
export interface ContainerProps {
    userID: string | null;
    error?: Error | null;
    onViewChange?: any;
}
export interface OptionType {
    name: string;
}
export interface InputProps {
    id?: string;
    label?: string;
    type: string;
    name: string;
    value: string;
    onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
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

export interface Options {
    artists: string[];
    albums: string[];
    tracks: string[];
}