import { Account, cloneAID } from ".";

export type LocalAccount = Account & {
    selected: boolean;
    pending: boolean;
    canEdit: boolean;
}

export const cloneLocalAccount = (account: LocalAccount): LocalAccount => ({
    ...account,
    id: cloneAID(account.id)
})