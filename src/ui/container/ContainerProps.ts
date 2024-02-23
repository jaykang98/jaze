export interface ContainerProps {
    onViewChange: (view: string) => void;
    userID: string | null;
    error: Error | null;
}
