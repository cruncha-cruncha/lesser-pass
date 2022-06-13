import { AID, cloneAID } from ".";

export type Account = {
    id: AID;
    title: string;
    username: string;
    length: number;
    index: number;
    alphabet: string;
    notes: string;
}

export const cloneAccount = (account: Account): Account => ({
    ...account,
    id: cloneAID(account.id)
})