import { Preloader } from 'framework7-react';

type Props = {};

export const PreloadFullPage = (props: Props) => {
    return (
        <div className="flex h-full w-full items-center justify-center">
            <Preloader />
        </div>
    );
};

export default PreloadFullPage;
