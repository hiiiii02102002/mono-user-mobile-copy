import { useQueryClient } from '@tanstack/react-query';
import { Button, ListItem, Navbar, Page } from 'framework7-react';
import Joi from 'joi';

import { meWalletApi } from '@/apis/me-wallet.api';
import { FormField, FormWrapper } from '@/components/form';
import { NKConstant } from '@/constants';

const WithdrawWallet = ({ f7router }: any) => {
    const queryClient = useQueryClient();
    return (
        <Page name="withdraw-wallet">
            <Navbar
                title="Withdraw Wallet"
                backLink="Back"
                onBackClick={() => {
                    f7router.back();
                }}
            />
            <FormWrapper
                schema={Joi.object({
                    amount: Joi.number().required().min(10000).label('Amount').messages(NKConstant.MESSAGE_FORMAT),
                })}
                apiAction={meWalletApi.v1Withdraw}
                defaultValues={{
                    amount: 10000,
                }}
                onExtraSuccess={() => {
                    f7router.back();
                    queryClient.invalidateQueries({
                        queryKey: ['me-wallet'],
                    });
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
                                Withdraw
                            </Button>
                        </ListItem>
                    </>
                )}
            </FormWrapper>
        </Page>
    );
};

export default WithdrawWallet;
