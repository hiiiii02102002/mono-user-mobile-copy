import { useQuery } from '@tanstack/react-query';

import { meWalletApi } from '@/apis/me-wallet.api';

export const useMeWallet = () => {
    return useQuery({
        queryKey: ['me-wallet'],
        queryFn: meWalletApi.v1Get,
    });
};
