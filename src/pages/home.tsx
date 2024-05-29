import { Page } from 'framework7-react';

import AuthWrapper from '@/components/wrapper/auth-wrapper';

const HomePage = ({ f7router }: any) => (
    <AuthWrapper f7router={f7router}>
        <Page name="homepage"></Page>
    </AuthWrapper>
);
export default HomePage;
