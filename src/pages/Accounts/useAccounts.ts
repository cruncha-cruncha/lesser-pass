import { useState, useEffect } from "react";
import { AID, LocalAccount, PendingEnum } from "../../types";
import { accountsState, uidState } from "../../state";
import { useRecoilValue } from "recoil";
import { updateAccount } from "../../database";
import { GridApi } from "ag-grid-community";

export const useAccounts = () => {
  // data
  const uid = useRecoilValue(uidState);
  const accounts = useRecoilValue(accountsState);
  const [localAccounts, setLocalAccounts] = useState<LocalAccount[]>([])

  // UI
  const [hideAddModal, setHideAddModal] = useState(true);
  const [hideDeleteModal, setHideDeleteModal] = useState(true);
  const [editing, setEditing] = useState(false);
  const [gridApi, setGridApi] = useState<GridApi | null>(null);

  // selectors
  const selectedAccounts = localAccounts.filter(acc => acc.selected);
  const selectedAidList = selectedAccounts.map(acc => acc.id);
  const selectedCount = selectedAidList.length;

  useEffect(() => {
    if (!editing) {
      setLocalAccounts((old) => {
        const oldLookup = old.reduce<{ [s: string]: LocalAccount }>((out, acc) => {
          if (!acc.id || acc.id in out) {
            // bad, what do?
          }
          return { ...out, [acc.id]: acc };
        }, {});

        return accounts.map(acc => {
          const oldAcc = (acc.id in oldLookup) ? oldLookup[acc.id] : null;
          return {
            ...acc,
            selected: oldAcc ? oldAcc.selected : false,
            pending: PendingEnum.No,
          }
        });
      })
    }
  }, [accounts, editing]);

  const startEditing = () => {
    setEditing(true);
  }

  const cancelEditing = () => {
    setEditing(false);
  }

  const saveEditing = () => {
    if (gridApi) {
      const toUpdate: LocalAccount[] = [];
      gridApi.stopEditing();
      gridApi.forEachNode(node => {
        if (node.isSelected()) {
          toUpdate.push({ ...node.data });
        }
      });

      Promise.all(toUpdate.map(acc => {
        return updateAccount({ uid, data: acc })
      }))
    }

    setEditing(false);
  }

  const updateSelection = () => {
    if (gridApi) {
      const data: LocalAccount[] = [];
      gridApi.forEachNode(node => {
        data.push({ ...node.data, selected: node.isSelected() });
      });
      setLocalAccounts(data);
    }
  }

  const unselectAll = () => {
    if (gridApi) {
      gridApi.deselectAll();
    }

    setLocalAccounts((old) => {
      return old.map(acc => ({ ...acc, selected: false }));
    })
  }

  const exportList = () => {
    if (gridApi) {
      gridApi.exportDataAsCsv({
        columnKeys: ["title", "username", "length", "index", "alphabet", "notes"]
      });
    }
  }

  return {
    localAccounts,
    selectedAidList,
    editing,
    startEditing,
    saveEditing,
    cancelEditing,
    gridApi,
    setGridApi: (api: GridApi) => setGridApi(api),
    addModalHidden: hideAddModal,
    openAddModal: () => setHideAddModal(false),
    closeAddModal: () => setHideAddModal(true),
    deleteModalHidden: hideDeleteModal,
    openDeleteModal: () => setHideDeleteModal(false),
    closeDeleteModal: () => setHideDeleteModal(true),
    unselectAll,
    updateSelection,
    exportList
  };
}