import { useMutation } from '@tanstack/react-query';
import { Icon, List, ListItem, Navbar, Page } from 'framework7-react';
import Cookies from 'universal-cookie';

import { meApi } from '@/apis/me.api';
import { NKConstant, NKRouter } from '@/constants';
import { useCurrentUser } from '@/hooks/user';
import { store } from '@/store';
import { userActions } from '@/store/user';
import { toastHelper } from '@/utils/toast.helper';

const Settings = ({ f7router }: any) => {
    const currentUserQuery = useCurrentUser();

    const logoutMutation = useMutation({
        mutationFn: () => {
            return meApi.v1PostLogout();
        },
        onSuccess: () => {
            const cookies = new Cookies();
            cookies.remove(NKConstant.TOKEN_COOKIE_KEY);
            store.dispatch(userActions.resetState());
            toastHelper.success({
                text: 'Đăng xuất thành công!',
            });
            window.location.reload();
        },
    });

    return (
        <Page name="settings">
            <Navbar
                title="Tài Khoản"
                backLink="Back"
                onBackClick={() => {
                    f7router.back();
                }}
            ></Navbar>
            <div className="flex flex-1 flex-col justify-between">
                <List dividersIos outlineIos strongIos menuList>
                    <ListItem link={NKRouter.setting.profile()} title="Hồ Sơ" footer={currentUserQuery.data?.email}>
                        <Icon className="text-primary-500" md="material:person" ios="f7:person_fill" slot="media" />
                    </ListItem>
                    <ListItem link={NKRouter.setting.password()} title="Đổi Mật Khẩu">
                        <Icon className="text-primary-500" md="material:lock" ios="f7:gear_alt_fill" slot="media" />
                    </ListItem>
                    <ListItem title="Ví Của Tôi" link={NKRouter.setting.wallet.index()}>
                        <Icon className="text-primary-500" md="material:account_balance_wallet" ios="f7:envelope_fill" slot="media" />
                    </ListItem>
                </List>
                <List dividersIos outlineIos strongIos menuList className="my-0">
                    <ListItem
                        title="Đăng Xuất"
                        link={true}
                        onClick={() => {
                            logoutMutation.mutate();
                        }}
                    >
                        <Icon className="text-red-600" md="material:logout" ios="f7:square_arrow_left" slot="media" />
                    </ListItem>
                </List>
            </div>
        </Page>
    );
};

export default Settings;
