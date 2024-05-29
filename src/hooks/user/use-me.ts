import { useQuery } from '@tanstack/react-query';

import { meApi } from '@/apis/me.api';

export const useCurrentUser = () => {
    return useQuery({
        queryKey: ['me'],
        queryFn: async () => {
            try {
                const res = await meApi.v1Get();
                return res;
            } catch (error) {
                return null;
            }
        },
        refetchOnWindowFocus: false,
        refetchOnMount: false,
        staleTime: 1000 * 60 * 60 * 24,
    });
};
