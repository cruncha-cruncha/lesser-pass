import React, { useEffect, useState } from 'react';
import { AgGridColumn, AgGridReact } from 'ag-grid-react';
import { cloneLocalAccount, LocalAccount, PendingEnum } from '../../../../types';
import { useList } from './useList';

import 'ag-grid-community/dist/styles/ag-grid.css';
import 'ag-grid-community/dist/styles/ag-theme-alpine.css';
import { GridApi } from 'ag-grid-community';

export type Props = {
    localAccounts: LocalAccount[];
    editing: boolean;
    setGridApi: (gridApi: GridApi) => void;
    updateSelection: () => void;
}

export const List = ({ localAccounts, editing, setGridApi, updateSelection }: Props) => {

    const allowSelect = !editing;

    const { generatePassword } = useList();

    return (
        <div>
            {!editing && localAccounts.length > 0 && (
                <p>Clicking on a row will copy the password to your clipboard</p>
            )}

            {editing && (
                <p>Click on a blue cell to edit it</p>
            )}

            <div className="ag-theme-alpine mb-3" style={{ height: 400 }}>
                <AgGridReact
                    onGridReady={event => setGridApi(event.api)}
                    rowData={localAccounts}
                    defaultColDef={{
                        editable: ({ node }) => editing && node.data.selected,
                        resizable: true,
                        filter: true,
                        sortable: true,
                    }}
                    singleClickEdit={true}
                    enableCellTextSelection={!editing}
                    rowSelection="multiple"
                    onSelectionChanged={() => updateSelection()}
                    onNewColumnsLoaded={event => { event.api.refreshCells(); }}
                    suppressRowClickSelection={true}
                    getRowId={r => r.data.id}
                    onRowClicked={(event) => {
                        if (!editing || !event.node.data.selected) {
                            generatePassword(event.data);
                        }
                    }}
                >
                    <AgGridColumn field="id" hide />
                    <AgGridColumn field="title" flex={1} headerCheckboxSelection={allowSelect} checkboxSelection={allowSelect} minWidth={150} />
                    <AgGridColumn field="username" flex={1} minWidth={150} />
                    <AgGridColumn field="notes" flex={1} minWidth={150} />
                    <AgGridColumn field="length" width={100} />
                    <AgGridColumn field="index" width={100} />
                    <AgGridColumn field="alphabet" minWidth={150} />
                </AgGridReact>
            </div>
        </div>
    )
}