import { useState, useEffect } from "react";
import { AID } from "../../types";
import { accountsState } from "../../state";
import { useRecoilValue } from "recoil";
import { updateAccount } from "../../database";
import { LocalAccount } from "../../types/LocalAccount";
import { GridApi } from "ag-grid-community";

export const useAccounts = () => {
  // data
  const accounts = useRecoilValue(accountsState);
  const [localAccounts, setLocalAccounts] = useState<LocalAccount[]>([])
  const [masterPassword, setMasterPassword] = useState('');

  // UI
  const [hideAddModal, setHideAddModal] = useState(true);
  const [hideDeleteModal, setHideDeleteModal] = useState(true);
  const [editing, setEditing] = useState(false);
  const [gridApi, setGridApi] = useState<GridApi|null>(null);

  // selectors
  const selectedAccounts = localAccounts.filter(account => account.selected);
  const selectedAidList = selectedAccounts.map(acc => acc.id);
  const selectedCount = selectedAidList.length

  useEffect(() => {
    // this needs to be more elegant
    // (keep existing state)
    setLocalAccounts(accounts.map(account => ({
      ...account,
      selected: false,
      pending: false,
      canEdit: false
    })))
  }, [accounts]);

  const startEditing = () => {
    setEditing(true);
    setLocalAccounts(old => old.map(acc => ({ ...acc, canEdit: true })))
  }

  const cancelEditing = () => {
    setEditing(false);
    setLocalAccounts(old => old.map(acc => ({ ...acc, canEdit: false })))
  }

  const saveEditing = () => {
    // do something with gridApi ??
    // updateAccount( ... )
    setEditing(false);
    setLocalAccounts(old => old.map(acc => ({ ...acc, canEdit: false })))
  }

  const addLocalAccount = (account:LocalAccount) => addLocalAccounts([account]);
  const addLocalAccounts = (accounts:LocalAccount[]) => {
    setLocalAccounts((old) => ([ ...old, ...accounts]))
  }

  const deleteLocalAccount = (aid:AID) => deleteLocalAccounts([aid]);
  const deleteLocalAccounts = (aidList:AID[]) => {
    setLocalAccounts((old) => {
      return old.map(acc => {
        return { ...acc, selected: false, pending: aidList.includes(acc.id) }
      });
    })
  }

  const unselectAll = () => {
    if (gridApi) {
      gridApi.deselectAll();
    }

    setLocalAccounts((old) => {
      return old.map(acc => ({ ...acc, selected: false}));
    })
  }

  const exportList = () => {
    // do something with gridApi ??
  }

  return {
    accounts: localAccounts,
    setAccounts: (accounts:LocalAccount[]) => setLocalAccounts(accounts),
    editing,
    startEditing,
    saveEditing,
    cancelEditing,
    gridApi,
    setGridApi: (api:GridApi) => setGridApi(api),
    masterPassword,
    setMasterPassword: (s:string) => setMasterPassword(s),
    selectedAidList,
    selectedCount,
    addModalHidden: hideAddModal,
    openAddModal: () => setHideAddModal(false),
    closeAddModal: () => setHideAddModal(true),
    deleteModalHidden: hideDeleteModal,
    openDeleteModal: () => setHideDeleteModal(false),
    closeDeleteModal: () => setHideDeleteModal(true),
    addLocalAccount,
    addLocalAccounts,
    deleteLocalAccount,
    deleteLocalAccounts,
    unselectAll,
    exportList
  };
}