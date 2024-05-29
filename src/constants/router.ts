export const NKRouter = {
    home: () => '/',
    setting: {
        index: () => '/setting',
        password: () => '/setting/password',
        wallet: {
            index: () => '/setting/wallet',
            deposit: () => '/setting/wallet/deposit',
            withdraw: () => '/setting/wallet/withdraw',
            list: () => '/setting/wallet/list',
        },
        profile: () => '/setting/profile',
    },
    auth: {
        login: () => '/login/',
        register: () => '/register/',
        forgotPassword: () => '/forgot-password',
    },
    landlord: {
        index: () => '/landlord',
        detail: (id: string) => `/landlord/${id}`,
    },
    me: {
        index: () => '/me',
        updateProfile: () => '/me/update-profile',
        changePassword: () => '/me/change-password',
        wallet: () => '/me/wallet',
        customerFeedback: () => '/me/customer-feedback',
    },
};
