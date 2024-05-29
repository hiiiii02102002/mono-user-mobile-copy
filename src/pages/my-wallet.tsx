import { Block, BlockTitle, Button, Link, List, Navbar, Page, Preloader } from 'framework7-react';

import TransactionItem from '@/components/transaction-item';
import { PreloadFullPage } from '@/components/ui';
import { NKRouter } from '@/constants';
import { useMeWallet } from '@/hooks/user';
import { useWalletTransaction } from '@/hooks/wallet-transaction';
import { FilterComparator, SortOrder } from '@/models/common';
import { formatMoneyVND } from '@/utils/string.helper';

const MyWallet = ({ f7router }: any) => {
    const userMeWalletQuery = useMeWallet();
    const walletTransactionsQuery = useWalletTransaction(
        {
            page: 0,
            pageSize: 5,
            filters: [`userWallet.id||${FilterComparator.EQUAL}||${userMeWalletQuery.data?.id}`],
            orderBy: [`createdAt||${SortOrder.DESC}`],
        },
        Boolean(userMeWalletQuery.data?.id),
    );

    return (
        <Page name="my-wallet">
            <Navbar
                title="My Wallet"
                backLink="Back"
                onBackClick={() => {
                    f7router.back();
                }}
            />

            {userMeWalletQuery.isLoading ? (
                <PreloadFullPage />
            ) : (
                <>
                    <Block className="flex flex-col items-center">
                        <p className="text-sm font-semibold">Your balance</p>
                        <p className="text-primary-500 text-3xl font-bold">{formatMoneyVND(userMeWalletQuery.data?.availableBalance || 0)}</p>
                    </Block>
                    <Block className="flex items-center gap-3">
                        <Button fill href={NKRouter.setting.wallet.deposit()} className="w-full">
                            Deposit
                        </Button>
                        <Button outline href={NKRouter.setting.wallet.withdraw()} className="w-full">
                            Withdraw
                        </Button>
                    </Block>
                    <BlockTitle className="flex items-center justify-between">
                        Recent Transactions
                        <span>
                            <Link href={NKRouter.setting.wallet.list()}>View All</Link>
                        </span>
                    </BlockTitle>
                    {walletTransactionsQuery.isLoading ? (
                        <Block className="flex items-center justify-center">
                            <Preloader size={24} />
                        </Block>
                    ) : walletTransactionsQuery.data?.data && walletTransactionsQuery.data?.data.length > 0 ? (
                        <List dividersMd mediaList>
                            {walletTransactionsQuery.data?.data.map((transaction) => (
                                <TransactionItem transaction={transaction} key={transaction.id} />
                            ))}
                        </List>
                    ) : (
                        <Block>
                            <p className="text-center font-semibold">Not have any transaction yet.</p>
                        </Block>
                    )}
                </>
            )}
        </Page>
    );
};

export default MyWallet;
