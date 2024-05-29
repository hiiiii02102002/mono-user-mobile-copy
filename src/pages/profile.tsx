import { Button, ListItem, Navbar, Page } from 'framework7-react';
import joi from 'joi';

import { meApi } from '@/apis/me.api';
import { FormField, FormWrapper } from '@/components/form';
import { PreloadFullPage } from '@/components/ui';
import AvatarPicker from '@/components/ui/avatar-picker';
import { NKConstant } from '@/constants';
import { useCurrentUser } from '@/hooks/user';

const Profile = ({ f7router }: any) => {
    const currentUserQuery = useCurrentUser();

    return (
        <Page name="profile">
            <Navbar
                title="Profile"
                backLink="Back"
                onBackClick={() => {
                    f7router.back();
                }}
            />
            {currentUserQuery.isLoading ? (
                <PreloadFullPage />
            ) : (
                <FormWrapper
                    schema={{
                        address: joi.string().allow(null, '').optional(),
                        avatar: joi.string().allow(null, '').optional(),
                        bio: joi.string().allow(null, '').optional(),
                        name: joi.string().required(),
                        nickname: joi.string().allow(null, '').optional(),
                        phone: joi.string().allow(null, '').optional(),
                        dob: joi.date().allow(null, '').optional(),
                    }}
                    apiAction={meApi.v1Put}
                    defaultValues={{
                        bio: currentUserQuery.data?.bio || '',
                        name: currentUserQuery.data?.name || '',
                        nickname: currentUserQuery.data?.nickname || '',
                        address: currentUserQuery.data?.address || '',
                        phone: currentUserQuery.data?.phone || '',
                        dob: currentUserQuery.data?.dob || '',
                        avatar: currentUserQuery.data?.avatar || '',
                    }}
                >
                    {(loading) => (
                        <>
                            <FormField
                                name="avatar"
                                render={({ field }) => (
                                    <ListItem>
                                        <AvatarPicker value={field.value} onChange={(value) => field.onChange(value)} />
                                    </ListItem>
                                )}
                            />
                            <FormField
                                name="bio"
                                inputProps={{
                                    placeholder: 'Your bio',
                                    type: 'textarea',
                                }}
                            />
                            <FormField
                                name="name"
                                inputProps={{
                                    placeholder: 'Your name',
                                }}
                            />
                            <FormField
                                name="nickname"
                                inputProps={{
                                    placeholder: 'Display name',
                                }}
                            />
                            <FormField
                                name="address"
                                inputProps={{
                                    placeholder: 'Address',
                                }}
                            />
                            <FormField
                                name="phone"
                                inputProps={{
                                    placeholder: 'Number phone',
                                }}
                            />
                            <FormField
                                name="dob"
                                inputProps={(form) => ({
                                    placeholder: 'Birthday',
                                    type: 'datepicker',
                                    calendarParams: {
                                        locale: 'vi',
                                        openIn: 'customModal',
                                        disabled(candidate) {
                                            return candidate.getTime() > new Date().getTime();
                                        },
                                        value: form.getValues('dob') ? [new Date(form.getValues('dob'))] : [],
                                    },
                                })}
                            />
                            <ListItem>
                                <Button fill type="submit" loading={loading} preloader preloaderSize={24} disabled={loading}>
                                    Save
                                </Button>
                            </ListItem>
                        </>
                    )}
                </FormWrapper>
            )}
        </Page>
    );
};

export default Profile;
