import { NKRouter } from '@/constants';
import ChangePassword from '@/pages/change-password';
import DepositWallet from '@/pages/deposit-wallet';
import HomePage from '@/pages/home';
import LoginPage from '@/pages/login';
import MyWallet from '@/pages/my-wallet';
import Profile from '@/pages/profile';
import RegisterPage from '@/pages/register';
import Settings from '@/pages/settings';
import WalletTransactions from '@/pages/wallet-transactions';
import WithdrawWallet from '@/pages/withdraw-wallet';

const loadComponentPage = (component: string, resolve: any) => {
    const reactComponent = () => import(`../pages/${component}.tsx`);

    reactComponent().then((rc) => {
        resolve({ component: rc.default });
    });
};

const routes = [
    {
        path: NKRouter.home(),
        component: HomePage,
    },
    {
        path: NKRouter.auth.login(),
        component: LoginPage,
    },
    {
        path: NKRouter.setting.index(),
        component: Settings,
    },
    {
        path: NKRouter.setting.profile(),
        component: Profile,
    },
    {
        path: NKRouter.auth.register(),
        component: RegisterPage,
    },
    {
        path: NKRouter.setting.password(),
        component: ChangePassword,
    },
    {
        path: NKRouter.setting.wallet.index(),
        component: MyWallet,
    },
    {
        path: NKRouter.setting.wallet.list(),
        component: WalletTransactions,
    },
    {
        path: NKRouter.setting.wallet.deposit(),
        component: DepositWallet,
    },
    {
        path: NKRouter.setting.wallet.withdraw(),
        component: WithdrawWallet,
    },
];

export default routes;
