import { Account, cloneAID } from ".";

export type LocalAccount = Account & {
    selected: boolean;
    pending: PendingEnum;
}

export enum PendingEnum {
    'No',
    'Add',
    'Delete',
    'Update',
}

export const cloneLocalAccount = (account: LocalAccount): LocalAccount => ({
    ...account,
    id: cloneAID(account.id)
})