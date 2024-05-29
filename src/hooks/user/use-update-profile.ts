import { useMutation, useQueryClient } from '@tanstack/react-query';

import { IV1UpdateProfileDto, meApi } from '@/apis/me.api';
import { toastHelper } from '@/utils/toast.helper';

export const useUpdateProfile = () => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: async (data: IV1UpdateProfileDto) => {
            const res = await meApi.v1Put(data);

            return res;
        },
        onSuccess(data) {
            toastHelper.success({
                text: 'Updated your profile successfully!',
            });
            queryClient.invalidateQueries({
                queryKey: ['me'],
            });
        },
    });
};
