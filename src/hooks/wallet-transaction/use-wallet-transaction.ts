import { useQuery } from '@tanstack/react-query';

import { userWalletTransactionApi } from '@/apis/user-wallet-transaction.api';
import { IPagingDto } from '@/models/common';

export const useWalletTransaction = (query: IPagingDto, enable?: boolean) => {
    return useQuery({
        queryKey: ['wallet-transaction', query],
        queryFn: async () => {
            const res = await userWalletTransactionApi.v1Get(query);
            return res;
        },
        enabled: enable,
    });
};
