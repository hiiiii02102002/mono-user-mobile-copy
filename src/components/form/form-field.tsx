import { InputHTMLAttributes } from 'react';

import { ListInput } from 'framework7-react';
import { InputProps } from 'framework7-react/components/input.js';
import { Controller, ControllerProps, FieldValues, UseFormReturn, useFormContext } from 'react-hook-form';

type FieldInputProps = Omit<InputProps, 'type'> & {
    type?: InputHTMLAttributes<HTMLInputElement>['type'] | 'textarea' | 'select' | 'datepicker' | 'colorpicker' | 'texteditor ';
};

type Props = {
    name: string;
    render?: ControllerProps['render'];
    inputProps?: ((form: UseFormReturn<FieldValues, any, undefined>) => FieldInputProps) | FieldInputProps;
};

export const FormField = ({ name, render, inputProps }: Props) => {
    const formCtx = useFormContext();
    return (
        <Controller
            name={name}
            control={formCtx.control}
            render={
                render
                    ? render
                    : ({ field, fieldState }) => (
                          <ListInput
                              name={name}
                              value={field.value}
                              onChange={(e) => {
                                  field.onChange(e.target.value);
                              }}
                              errorMessage={fieldState.error?.message}
                              errorMessageForce={fieldState.invalid}
                              autocomplete="off"
                              {...(typeof inputProps === 'function' ? inputProps(formCtx) : inputProps)}
                          />
                      )
            }
        />
    );
};

export default FormField;
