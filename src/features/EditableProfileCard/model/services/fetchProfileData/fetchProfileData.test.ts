import { TestAsyncThunk } from '@/shared/lib/tests/TestAsyncThunk';
import { Profile } from '@/entities/Profile';
import { fetchProfileData } from './fetchProfileData';

const data: Profile = {
    firstname: 'Evgenii',
    lastname: 'TSovich',
    age: 23,
    currency: 'EUR',
    country: 'Russia',
    city: 'Moscow',
    username: 'admin',
};

describe('Async thunk fetchProfileData', () => {
    test('success', async () => {
        const thunk = new TestAsyncThunk(fetchProfileData);
        thunk.api.get.mockReturnValue(Promise.resolve({ data }));

        const res = await thunk.callThunk('1');

        expect(thunk.api.get).toHaveBeenCalled();
        expect(res.meta.requestStatus).toBe('fulfilled');
        expect(res.payload).toEqual(data);
    });

    test('error', async () => {
        const thunk = new TestAsyncThunk(fetchProfileData);
        thunk.api.get.mockReturnValue(Promise.resolve({ status: 403 }));

        const res = await thunk.callThunk('1');

        expect(thunk.api.get).toHaveBeenCalled();
        expect(res.meta.requestStatus).toBe('rejected');
    });
});
