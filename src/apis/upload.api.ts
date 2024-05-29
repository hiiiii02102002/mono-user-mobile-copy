import http from './http-client';

export const uploadFileApi = {
    v1UploadFile: async (file: File | Blob): Promise<string> => {
        const url = '/upload-file/upload';
        const formData = new FormData();
        formData.append('file', file);
        const res = await http.post<any>(url, formData);
        return res.data.fileLocation;
    },
};
