import React, { useEffect, useState } from 'react';
import { AgGridColumn, AgGridReact } from 'ag-grid-react';
import { cloneLocalAccount, LocalAccount } from '../../../../types';

import 'ag-grid-community/dist/styles/ag-grid.css';
import 'ag-grid-community/dist/styles/ag-theme-alpine.css';
import { GridApi } from 'ag-grid-community';

export type Props = {
    accounts: LocalAccount[];
    editing: boolean;
    gridApi: GridApi | null;
    setGridApi: (gridApi:GridApi) => void;
    setAccounts: (accounts:LocalAccount[]) => void;
}

export const List = ({ accounts, editing, gridApi, setGridApi, setAccounts }: Props) => {

    const allowSelect = !editing;

    //   const handleRowDataChanged = () => {
    //     if (gridApi) {
    //       if (gridApi.getSelectedRows().length === 0 && staticSelected.length > 0) {
    //         gridApi.forEachNode(n => {
    //             n.setSelected(staticSelected.includes(n.id));
    //         });
    //       }
    //     }
    //   }

    //   const handleExport = () => {
    //     if (gridApi) {
    //       gridApi.exportDataAsCsv({
    //         columnKeys: ["account", "username", "length", "index", "notes"]
    //       });
    //     }
    //   }

    //   const handleRowClick = async ({ data }) => {
    //     if (!btnState.amEditing) {
    //       navigator.clipboard.writeText(await genPassword(data));
    //     }
    //   }

    //   useEffect(() => {
    //     if (gridApi) {
    //       if (btnState.amEditing) {
    //         gridApi.setEnableCellTextSelection(false);
    //       } else {
    //         gridApi.setEnableCellTextSelection(true);
    //       }
    //     }
    //   }, [btnState.amEditing, gridApi]);  

    return (
        <div>
            {/* {!btnState.amEditing && accs.length > 0 && (
          <p>Clicking on a row will copy the password to your clipboard</p>
        )} */}

            {/* {btnState.amEditing && (
          <p>Click on a blue cell to edit it</p>
        )} */}

            <div className="ag-theme-alpine mb-3" style={{ height: 400 }}>
                <AgGridReact
                    onGridReady={event => setGridApi(event.api)}
                    rowData={accounts.map(account => cloneLocalAccount(account))}
                    defaultColDef={{
                        editable: ({ node }) => node.data.selected && node.data.canEdit,
                        resizable: true,
                        filter: true,
                        sortable: true,
                    }}
                    // onRowDataChanged={(event) => {
                    //     const data: LocalAccount[] = [];
                    //     event.api.forEachNode(node => {
                    //         data.push({ ...node.data });
                    //     });
                    //     updateAccounts({ accounts: data });
                    // }}
                    singleClickEdit={true}
                    enableCellTextSelection={!editing}
                    rowSelection="multiple"
                    //onRowSelected={}
                    onSelectionChanged={(event) => {
                        const data: LocalAccount[] = [];
                        event.api.forEachNode(node => {
                            data.push({ ...node.data, selected: node.isSelected() });
                        });
                        setAccounts(data);
                    }}
                    onNewColumnsLoaded={event => { event.api.refreshCells(); }}
                    suppressRowClickSelection={true}
                    getRowId={r => r.data.id}
                    //onRowClicked={}
                >
                    <AgGridColumn field="id" hide />
                    <AgGridColumn field="title" flex={1} headerCheckboxSelection={allowSelect} checkboxSelection={allowSelect} minWidth={150} />
                    <AgGridColumn field="username" flex={1} minWidth={150} />
                    <AgGridColumn field="notes" flex={1} minWidth={150} />
                    <AgGridColumn field="length" width={100} />
                    <AgGridColumn field="index" width={100} />
                    <AgGridColumn field="alphabet" width={100} />
                </AgGridReact>
            </div>
        </div>
    )
}