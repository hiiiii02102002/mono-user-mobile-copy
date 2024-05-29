import dayjs from 'dayjs';
import { ListItem } from 'framework7-react';

import { userWalletTransactionApi } from '@/apis/user-wallet-transaction.api';
import { UserWalletTransaction } from '@/models/user-wallet-transaction';
import { formatMoneyVND } from '@/utils/string.helper';

import BadgeApi from './ui/badge-api';

type Props = {
    transaction: UserWalletTransaction;
};

const TransactionItem = ({ transaction }: Props) => {
    return (
        <ListItem>
            <div className="flex items-center justify-between">
                <div className="flex flex-col">
                    <span className="item-title">{formatMoneyVND(transaction.amount)}</span>
                    <span className="item-subtitle">{dayjs(transaction.createdAt).format('DD/MM/YYYY HH:mm')}</span>
                </div>
                <div className="flex flex-col gap-1">
                    <BadgeApi value={transaction.status} apiAction={userWalletTransactionApi.v1GetEnumStatus} />
                    <BadgeApi value={transaction.type} apiAction={userWalletTransactionApi.v1GetEnumType} />
                </div>
            </div>
        </ListItem>
    );
};

export default TransactionItem;
