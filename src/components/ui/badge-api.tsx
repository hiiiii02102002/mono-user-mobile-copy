import * as React from 'react';

import { useQuery } from '@tanstack/react-query';
import { kebabCase } from 'lodash';
import _get from 'lodash/get';

interface Props {
    value: any;
    apiAction?: (...value: any) => any;
}

const BadgeApi = ({ value, apiAction }: Props) => {
    const [label, setLabel] = React.useState<string>('Đang tải...');
    const [color, setColor] = React.useState<string>('gray');

    const options = useQuery({
        queryKey: ['options', kebabCase(apiAction?.toString()), value, color],
        queryFn: async () => {
            return apiAction ? apiAction('', true) : Promise.resolve([]);
        },
    });

    React.useEffect(() => {
        if (options.data) {
            const option = options.data.find((item: any) => item.value === value);

            if (option) {
                setLabel(_get(option, 'label.en', option?.name));
                setColor(option.color);
            }
        }
    }, [options.data, value]);

    return (
        <div
            className="border-tango-50 inline-block rounded-lg border border-solid px-1 py-0.5 text-xs"
            style={{
                color: color,
                backgroundColor: 'white',
            }}
        >
            {label}
        </div>
    );
};

export default BadgeApi;
