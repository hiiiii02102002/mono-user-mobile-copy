import { IPagingDto, ResponseList } from '@/models/common';
import { UserRole } from '@/models/user-role';

import http from './http-client';

export interface UserRoleIV1Get extends IPagingDto {}

export const userRoleApi = {
    v1All: async () => {
        const url = '/user-role/all';
        const res = await http.get<UserRole[]>(url);
        return res.data;
    },
    v1Get: async (dto: UserRoleIV1Get) => {
        const url = '/user-role';
        const res = await http.get<ResponseList<UserRole>>(url, { params: { ...dto } });
        return res.data;
    },
    v1GetById: async (id: string) => {
        const url = `/user-role/${id}`;
        const res = await http.get<UserRole>(url);
        return res.data;
    },
    v1GetSelect: async (search: string, isShowDelete = false) => {
        const url = `/user-role/select-options`;
        const res = await http.get<UserRole[]>(url, {
            params: {
                search,
                isShowDelete,
            },
        });

        return res.data;
    },
};
