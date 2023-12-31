import { TestAsyncThunk } from '@/shared/lib/tests/TestAsyncThunk';
import { Profile } from '@/entities/Profile';
import { ValidateProfileError } from '../../const/const';
import { updateProfileData } from './updateProfileData';

const data: Profile = {
    id: '1',
    firstname: 'Evgenii',
    lastname: 'TSovich',
    age: 23,
    currency: 'EUR',
    country: 'Russia',
    city: 'Moscow',
    username: 'admin',
};

describe('Async thunk updateProfileData', () => {
    test('success', async () => {
        const thunk = new TestAsyncThunk(updateProfileData, {
            profile: {
                form: data,
            },
        });
        thunk.api.put.mockReturnValue(Promise.resolve({ data }));

        const res = await thunk.callThunk();

        expect(thunk.api.put).toHaveBeenCalled();
        expect(res.meta.requestStatus).toBe('fulfilled');
        expect(res.payload).toEqual(data);
    });

    test('error', async () => {
        const thunk = new TestAsyncThunk(updateProfileData, {
            profile: {
                form: data,
            },
        });
        thunk.api.put.mockReturnValue(Promise.resolve({ status: 403 }));

        const res = await thunk.callThunk();

        expect(res.meta.requestStatus).toBe('rejected');
        expect(res.payload).toEqual([ValidateProfileError.SERVER_ERROR]);
    });

    test('validate error', async () => {
        const thunk = new TestAsyncThunk(updateProfileData, {
            profile: {
                form: { ...data, lastname: '' },
            },
        });

        const res = await thunk.callThunk();

        expect(res.meta.requestStatus).toBe('rejected');
        expect(res.payload).toEqual([ValidateProfileError.INCORRECT_USER_DATA]);
    });
});
