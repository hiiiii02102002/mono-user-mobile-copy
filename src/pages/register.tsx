import { BlockFooter, Button, Link, ListItem, LoginScreenTitle, Page } from 'framework7-react';
import joi from 'joi';

import { authApi } from '@/apis/auth.api';
import { FormField, FormWrapper } from '@/components/form';
import { NKRouter } from '@/constants';
import { toastHelper } from '@/utils/toast.helper';

interface RegisterSchemaType {
    email: string;
    password: string;
    firstName: string;
    lastName: string;
    confirmPassword: string;
}

const RegisterPage = ({ f7router }: any) => {
    return (
        <Page name="register-page" loginScreen noToolbar>
            <LoginScreenTitle>Register</LoginScreenTitle>
            <FormWrapper<RegisterSchemaType>
                schema={{
                    email: joi
                        .string()
                        .email({
                            tlds: { allow: false },
                        })
                        .required(),
                    password: joi.string().required(),
                    firstName: joi.string().required(),
                    lastName: joi.string().required(),
                    confirmPassword: joi.string().required().valid(joi.ref('password')),
                }}
                apiAction={(data) => {
                    return authApi.v1Register({
                        email: data.email,
                        password: data.password,
                        name: `${data.firstName} ${data.lastName}`,
                        username: data.email,
                    });
                }}
                onExtraSuccess={() => {
                    toastHelper.success({
                        text: 'Create an account successfully!',
                    });
                    f7router.navigate(NKRouter.auth.login());
                }}
            >
                {(loading) => (
                    <>
                        <FormField
                            name="firstName"
                            inputProps={{
                                placeholder: 'Your first name',
                            }}
                        />
                        <FormField
                            name="lastName"
                            inputProps={{
                                placeholder: 'Your last name',
                            }}
                        />
                        <FormField
                            name="email"
                            inputProps={{
                                placeholder: 'Your email',
                            }}
                        />
                        <FormField
                            name="password"
                            inputProps={{
                                placeholder: 'Your password',
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
                                Sign Up
                            </Button>
                        </ListItem>
                    </>
                )}
            </FormWrapper>
            <BlockFooter>
                <p>
                    Already have an account? <Link onClick={() => f7router.navigate(NKRouter.auth.login())}>Sign In</Link>
                </p>
            </BlockFooter>
        </Page>
    );
};
export default RegisterPage;
