import { UserRole } from '@/models/user-role';

export interface ApiState {
    isFetching: boolean;
    errorDetails: Record<string, string>;
    isError: boolean;
    message: string;
    errorMessage: string;
    roles: UserRole[];
}
