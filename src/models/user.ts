import { UserRole } from './user-role';

export interface User {
    id: string;
    createdAt: string;
    updatedAt: string;
    isDeleted: false;
    isRequiredUpdate: false;
    docStatus: number;
    name: string;
    avatar: string;
    banner: string;
    username: string;
    password: string;
    email: string;
    phone: string;
    address: string;
    googleId: null;
    status: string;
    role: UserRole;
    lastActive: string;
    dob: string;
    bio: string;
    nickname: string;
    cardIdFront: string;
    cardIdBack: string;
    verificationStatus: string;
}
