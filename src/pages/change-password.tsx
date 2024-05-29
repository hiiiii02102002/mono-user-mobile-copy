import { Button, ListItem, Navbar, Page } from 'framework7-react';
import joi from 'joi';

import { IV1ChangePasswordDto, meApi } from '@/apis/me.api';
import { FormField, FormWrapper } from '@/components/form';
import { toastHelper } from '@/utils/toast.helper';

interface ChangePasswordSchemaType extends IV1ChangePasswordDto {
    confirmPassword: string;
}

const ChangePassword = ({ f7router }: any) => {
    return (
        <Page name="change-password-page">
            <Navbar
                title="Change Password"
                backLink="Back"
                onBackClick={() => {
                    f7router.back();
                }}
            />
            <FormWrapper<ChangePasswordSchemaType>
                schema={{
                    password: joi.string().required(),
                    confirmPassword: joi.string().required().valid(joi.ref('newPassword')),
                    newPassword: joi.string().required(),
                }}
                apiAction={(data) => {
                    return meApi.v1PutChangePassword({
                        newPassword: data.newPassword,
                        password: data.password,
                    });
                }}
                onExtraSuccess={() => {
                    toastHelper.success({
                        text: 'Change password successfully!',
                    });
                }}
            >
                {(loading) => (
                    <>
                        <FormField
                            name="password"
                            inputProps={{
                                placeholder: 'Your password',
                                type: 'password',
                            }}
                        />
                        <FormField
                            name="newPassword"
                            inputProps={{
                                placeholder: 'Your new password',
                                type: 'password',
                            }}
                        />
                        <FormField
                            name="confirmPassword"
                            inputProps={{
                                placeholder: 'Your confirm password',
                                type: 'password',
                            }}
                        />
                        <ListItem>
                            <Button fill type="submit" loading={loading} preloader preloaderSize={24} disabled={loading}>
                                Change Password
                            </Button>
                        </ListItem>
                    </>
                )}
            </FormWrapper>
        </Page>
    );
};

export default ChangePassword;
