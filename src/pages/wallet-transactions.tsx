import { useInfiniteQuery } from '@tanstack/react-query';
import { Block, List, Navbar, Page, Preloader } from 'framework7-react';

import { userWalletTransactionApi } from '@/apis/user-wallet-transaction.api';
import TransactionItem from '@/components/transaction-item';
import { useMeWallet } from '@/hooks/user';
import { FilterComparator, SortOrder } from '@/models/common';

const LIMIT = 10;

const WalletTransactions = ({ f7router }: any) => {
    const userMeWalletQuery = useMeWallet();

    const transactionsQuery = useInfiniteQuery({
        queryKey: ['wallet-transactions', userMeWalletQuery.data?.id],
        queryFn: async ({ pageParam }) => {
            const res = await userWalletTransactionApi.v1Get({
                page: pageParam,
                pageSize: LIMIT,
                filters: [`userWallet.id||${FilterComparator.EQUAL}||${userMeWalletQuery.data?.id}`],
                orderBy: [`createdAt||${SortOrder.DESC}`],
            });

            return {
                ...res,
                prevPage: pageParam,
            };
        },
        initialPageParam: 0,
        getNextPageParam: (lastPage) => {
            if (lastPage.prevPage + 1 >= lastPage.totalPage) {
                return undefined;
            }

            return lastPage.prevPage + 1;
        },
        refetchOnWindowFocus: false,
        enabled: Boolean(userMeWalletQuery.data?.id),
    });

    const data = transactionsQuery.data?.pages.flatMap((page) => page.data) || [];

    return (
        <Page
            name="wallet-transactions"
            infinite
            infinitePreloader={transactionsQuery.isFetchingNextPage}
            onInfinite={() => {
                if (!transactionsQuery.isFetchingNextPage) {
                    transactionsQuery.fetchNextPage();
                }
            }}
            infiniteDistance={0}
        >
            <Navbar
                title="Wallet Transactions History"
                backLink="Back"
                onBackClick={() => {
                    f7router.back();
                }}
            />
            {transactionsQuery.isLoading ? (
                <Block className="flex items-center justify-center">
                    <Preloader size={24} />
                </Block>
            ) : data.length > 0 ? (
                <List dividersMd mediaList>
                    {data.map((transaction) => (
                        <TransactionItem transaction={transaction} key={transaction.id} />
                    ))}
                </List>
            ) : (
                <Block>
                    <p className="text-center font-semibold">Not have any transaction yet.</p>
                </Block>
            )}
        </Page>
    );
};

export default WalletTransactions;
