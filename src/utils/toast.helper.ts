import { f7 } from 'framework7-react';
import { Toast } from 'framework7/types';

export const toastHelper = {
    success: (data: Toast.Parameters) => {
        const toast = f7.toast.create({
            cssClass: 'bg-green-600 text-white',
            position: 'top',
            ...data,
        });
        toast.open();
        setTimeout(() => {
            toast.close();
            toast.destroy();
        }, 2000);
    },
    error: (data: Toast.Parameters) => {
        const toast = f7.toast.create({
            cssClass: 'bg-red-600 text-white',
            position: 'top',
            ...data,
        });
        toast.open();
        setTimeout(() => {
            toast.close();
            toast.destroy();
        }, 2000);
    },
    info: (data: Toast.Parameters) => {
        const toast = f7.toast.create({
            cssClass: 'bg-blue-600 text-white',
            position: 'top',
            ...data,
        });
        toast.open();
        setTimeout(() => {
            toast.close();
            toast.destroy();
        }, 2000);
    },
    warning: (data: Toast.Parameters) => {
        const toast = f7.toast.create({
            cssClass: 'bg-yellow-600 text-white',
            position: 'top',
            ...data,
        });
        toast.open();
        setTimeout(() => {
            toast.close();
            toast.destroy();
        }, 2000);
    },
};
