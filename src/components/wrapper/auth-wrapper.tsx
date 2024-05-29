import * as React from 'react';

import { useSelector } from 'react-redux';

import { NKRouter } from '@/constants';
import { RootState } from '@/store';
import { UserState } from '@/store/user';

interface AuthWrapperProps {
    children: React.ReactNode;
    f7router?: any;
}

const AuthWrapper: React.FC<AuthWrapperProps> = ({ children, f7router }) => {
    const { isAuth, isLogin } = useSelector<RootState, UserState>((state) => state.user);

    React.useEffect(() => {
        if (!isAuth && !isLogin) {
            f7router.navigate(NKRouter.auth.login());
        }
    }, [isAuth, isLogin]);

    return <div>{children}</div>;
};

export default AuthWrapper;
