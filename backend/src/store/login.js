import { userLogin } from '@/api/user';
import { getSession, setSession } from '@/utils';
import { SAVE_TOKEN } from '@/store/types';

const getToken = () => getSession('token');

export default {
    namespace: 'login',
    state: {
        token: getToken() || ""
    },
    effects: {
        *login({ payload }, { call, put }) {
            const result = yield call(userLogin, payload);
            setSession('token', result.data.token)
            yield put({
                type: SAVE_TOKEN,
                payload: {
                    token: result.data.token
                }
            });
        },
    },
    reducers: {
        [SAVE_TOKEN](state, { payload }) {
            return {
                ...state,
                ...payload
            };
        },
    }
}