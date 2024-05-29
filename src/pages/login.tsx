import { useEffect } from 'react';

import { useQueryClient } from '@tanstack/react-query';
import { BlockFooter, Button, Link, ListItem, LoginScreenTitle, Page } from 'framework7-react';
import joi from 'joi';
import { useSelector } from 'react-redux';
import Cookies from 'universal-cookie';

import { IV1AuthLoginEmail, authApi } from '@/apis/auth.api';
import { FormField, FormWrapper } from '@/components/form';
import { NKConstant, NKRouter } from '@/constants';
import { RootState, store } from '@/store';
import { UserState, userActions } from '@/store/user';
import { toastHelper } from '@/utils/toast.helper';

type Props = {
    f7router?: any;
    openLogin?: boolean;
};
const LoginPage = ({ f7router }: Props) => {
    const queryClient = useQueryClient();

    const { isAuth, isLogin } = useSelector<RootState, UserState>((state) => state.user);

    useEffect(() => {
        if (isAuth && isLogin) {
            f7router.navigate(NKRouter.home());
        }
    }, [isAuth, isLogin]);

    return (
        <Page name="login-page" loginScreen noToolbar>
            <LoginScreenTitle>Login</LoginScreenTitle>
            <FormWrapper<IV1AuthLoginEmail>
                schema={{
                    email: joi
                        .string()
                        .email({
                            tlds: { allow: false },
                        })
                        .required(),
                    password: joi.string().required(),
                }}
                apiAction={authApi.v1LoginEmail}
                onExtraSuccess={(data) => {
                    const cookies = new Cookies();

                    cookies.set(NKConstant.TOKEN_COOKIE_KEY, data.token, {
                        path: '/',
                    });

                    queryClient.invalidateQueries({
                        queryKey: ['me'],
                    });

                    store.dispatch(userActions.setToken(data.token));

                    f7router?.navigate(NKRouter.home());
                }}
                onExtraError={(error) => {
                    toastHelper.error({
                        text: error?.data?.translation?.en || 'Something went wrong!',
                    });
                }}
            >
                {(loading) => (
                    <>
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
                        <ListItem>
                            <Button fill type="submit" loading={loading} preloader preloaderSize={24} disabled={loading}>
                                Sign In
                            </Button>
                        </ListItem>
                    </>
                )}
            </FormWrapper>
            <BlockFooter>
                <p>
                    Don't have an account? <Link onClick={() => f7router.navigate(NKRouter.auth.register())}>Sign Up</Link>
                </p>
            </BlockFooter>
        </Page>
    );
};
export default LoginPage;
