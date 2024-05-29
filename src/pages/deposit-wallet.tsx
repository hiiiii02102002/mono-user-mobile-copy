import { useMutation } from '@tanstack/react-query';
import { Button, ListItem, Navbar, Page } from 'framework7-react';
import Joi from 'joi';

import { meWalletApi } from '@/apis/me-wallet.api';
import { UserWalletTransactionIV1Checkout, userWalletTransactionApi } from '@/apis/user-wallet-transaction.api';
import { FormField, FormWrapper } from '@/components/form';
import { NKConstant } from '@/constants';

const DepositWallet = ({ f7router }: any) => {
    const checkoutMutation = useMutation({
        mutationFn: userWalletTransactionApi.v1Checkout,
        onSuccess: (data) => {
            window.location.href = data.checkoutUrl;
        },
    });

    return (
        <Page name="deposit-wallet">
            <Navbar
                title="Deposit Wallet"
                backLink="Back"
                onBackClick={() => {
                    f7router.back();
                }}
            />
            <FormWrapper
                schema={Joi.object({
                    amount: Joi.number().required().min(10000).label('Amount').messages(NKConstant.MESSAGE_FORMAT),
                })}
                apiAction={meWalletApi.v1Deposit}
                defaultValues={{
                    amount: 10000,
                }}
                onExtraSuccess={(data) => {
                    const dto: UserWalletTransactionIV1Checkout = {
                        redirectUrl: `${window.location.origin}`,
                        notifyUrl: 'https://renthub.monoinfinity.net/api/user-wallet-transaction/verify-vnpay',
                        userTransactionId: data.id,
                    };

                    checkoutMutation.mutate(dto);
                }}
            >
                {(loading) => (
                    <>
                        <FormField
                            name="amount"
                            inputProps={{
                                placeholder: 'Your amount',
                                type: 'number',
                                min: 10000,
                            }}
                        />
                        <ListItem>
                            <Button fill type="submit" loading={loading} preloader preloaderSize={24} disabled={loading}>
                                Deposit
                            </Button>
                        </ListItem>
                    </>
                )}
            </FormWrapper>
        </Page>
    );
};

export default DepositWallet;
