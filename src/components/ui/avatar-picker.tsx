import { useEffect, useRef, useState } from 'react';

import { Icon } from 'framework7-react';

import { useUploadFile } from '@/hooks/use-upload-file';
import { clsx } from '@/utils/common';

type AvatarPickerProps = {
    className?: string;
    value?: string;
    defaultValue?: string;
    onChange?: (value: string) => void;
    isToServer?: boolean;
};

export const AvatarPicker = ({ className, defaultValue, onChange, value, isToServer = true }: AvatarPickerProps) => {
    const [avatar, setAvatar] = useState<string>(defaultValue || '');
    const inputRef = useRef<HTMLInputElement>(null);

    const uploadMutation = useUploadFile();

    const isController = value !== undefined && onChange !== undefined;
    const _value = isController ? value : avatar;

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];

        if (!file) return;

        if (isToServer) {
            uploadMutation.mutate(file);
        } else {
            const reader = new FileReader();
            reader.onload = (e) => {
                if (!isController) {
                    setAvatar(e.target?.result as string);
                }
                onChange?.(e.target?.result as string);
            };
            reader.readAsDataURL(file);
        }
    };

    useEffect(() => {
        if (uploadMutation.isSuccess) {
            if (!isController) {
                setAvatar(uploadMutation.data as string);
            }

            onChange?.(uploadMutation.data as string);
        }
    }, [uploadMutation.isSuccess, uploadMutation.data, isController, onChange]);

    return (
        <div
            className={clsx('relative flex h-20 w-20 cursor-pointer items-center justify-center overflow-hidden rounded-full bg-gray-200', className)}
            onClick={() => inputRef.current?.click()}
        >
            {_value ? (
                <img src={_value} alt="avatar" className="absolute inset-0 h-full w-full object-cover" />
            ) : (
                <Icon md="material:camera" ios="f7:camera" />
            )}

            <input type="file" ref={inputRef} accept="image/*" className="hidden" onChange={handleChange} />
        </div>
    );
};

export default AvatarPicker;
