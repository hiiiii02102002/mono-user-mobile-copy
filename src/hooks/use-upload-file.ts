import { useMutation } from '@tanstack/react-query';

import { uploadFileApi } from '@/apis/upload.api';

export const useUploadFile = () => {
    return useMutation({
        mutationFn: async (file: File | Blob) => {
            const url = await uploadFileApi.v1UploadFile(file);
            return url;
        },
    });
};
