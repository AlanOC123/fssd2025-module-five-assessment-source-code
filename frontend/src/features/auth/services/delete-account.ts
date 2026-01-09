import type { DeleteAccountData } from '../types';

import { client } from '@/api';
import { ACTIVE_USER } from './endpoints';

export async function deleteAccount(payload: DeleteAccountData) {
    const response = await client.delete(ACTIVE_USER, { data: payload });
    return response.data;
}