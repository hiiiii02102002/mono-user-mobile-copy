import { createStore } from 'framework7/lite';

import { User } from '@/models/user';

type TState = {
    user: User | null;
    token: string | null;
};

const store = createStore({
    state: {
        user: null,
        token: null,
    } as TState,
    getters: {
        user({ state }: { state: TState }) {
            return state.user;
        },
        token({ state }: { state: TState }) {
            return state.token;
        },
    },
    actions: {
        setUser({ state }: { state: TState }, user: User | null) {
            state.user = user;
        },
        setToken({ state }: { state: TState }, token: string) {
            state.token = token;
        },
    },
});
export default store;
