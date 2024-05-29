import React from 'react';

import { joiResolver } from '@hookform/resolvers/joi';
import { useMutation } from '@tanstack/react-query';
import { List } from 'framework7-react';
import Joi from 'joi';
import { FormProvider, useForm } from 'react-hook-form';

import { NKConstant } from '@/constants';
import { clsx } from '@/utils/common';

type Props<T> = {
    schema: Record<keyof T, Joi.AnySchema>;
    defaultValues?: T;
    children: ((loading: boolean) => JSX.Element[] | JSX.Element) | React.ReactNode;
    apiAction?: (data: T) => Promise<any>;
    onExtraSuccess?: (data: any) => void;
    onExtraError?: (err: any) => void;
    className?: string;
};

export const FormWrapper = <T,>({ children, schema, apiAction, defaultValues, onExtraError, onExtraSuccess, className }: Props<T>) => {
    const form = useForm({
        defaultValues: {
            ...defaultValues,
        },
        resolver: joiResolver(Joi.object(schema), {
            messages: NKConstant.MESSAGE_FORMAT,
        }),

        mode: 'onChange',
    });

    const mutation = useMutation({
        mutationFn: apiAction,
        onError: (err) => {
            if (onExtraError) {
                onExtraError(err);
            }
        },
        onSuccess: (data) => {
            if (onExtraSuccess) {
                onExtraSuccess(data);
            }
        },
    });

    const handleSubmit = form.handleSubmit((data) => {
        mutation.mutate(data as any);
    });

    return (
        <FormProvider {...form}>
            <List form onSubmit={handleSubmit} className={clsx(className)}>
                {typeof children === 'function' ? children(mutation.isPending) : children}
            </List>
        </FormProvider>
    );
};

export default FormWrapper;
