import React, { useEffect, useState, useReducer } from 'react';
import { Row, Col, Button, Form } from 'react-bootstrap';
import { AgGridColumn, AgGridReact } from 'ag-grid-react';
import _ from 'lodash';

import 'ag-grid-community/dist/styles/ag-grid.css';
import 'ag-grid-community/dist/styles/ag-theme-alpine.css';

import { useList } from './useList';
import { AddModal } from './components/AddModal';
import { DeleteModal } from './components/DeleteModal';

const btnStateReducer = (state, action) => {
  const payload = action.payload;
  switch (action.type) {
    case 'select':
      if (payload.length === 0) {
        return { ...state, showEditBtn: false, showDeleteBtn: false, showClearBtn: false, showAddBtn: true };
      } else {
        return { ...state, showEditBtn: true, showDeleteBtn: true, showClearBtn: true, showAddBtn: false };
      }
    case 'add':
      return { ...state, wantToAdd: payload };
    case 'edit':
      if (payload === 'start') {
        return { ...state, showCheckboxes: false, amEditing: true, showEditBtn: true, showDeleteBtn: false, showClearBtn: false, showAddBtn: false };
      } else {
        return { ...state, showCheckboxes: true, amEditing: false, showEditBtn: true, showDeleteBtn: true, showClearBtn: true, showAddBtn: false };
      }
    case 'delete':
      if (payload === 'open') {
        return { ...state, wantToDelete: true };
      } else if (payload === 0) {
        return { ...state, wantToDelete: false };
      } else {
        return { ...state, wantToDelete: false, showEditBtn: false, showDeleteBtn: false, showClearBtn: false, showAddBtn: true };
      }
    case 'clear':
      return { ...state, showEditBtn: false, showDeleteBtn: false, showClearBtn: false, showAddBtn: true };
    default:
      return state;
  }
}

const initialBtnState = {
  showEditBtn: false,
  amEditing: false,
  showDeleteBtn: false,
  wantToDelete: false,
  showClearBtn: false,
  showAddBtn: true,
  wantToAdd: false,
  showCheckboxes: true
};

export const List = () => {
  const [gridApi, setGridApi] = useState(null);
  const [hideMasterPassword, setHideMasterPassword] = useState(true);
  const [staticSelected, setStaticSelected] = useState([]);
  const [btnState, dispatchBtn] = useReducer(btnStateReducer, initialBtnState)

  const {
    hide,
    masterPassword,
    setMasterPassword,
    accs,
    addNewAcc,
    updateAccs,
    deleteAccs,
    genPassword
  } = useList();

  const toggleMasterPasswordHidden = () => {
    setHideMasterPassword(!hideMasterPassword);
  }

  const handleClear = () => {
    setStaticSelected([]);
    dispatchBtn({ type: 'clear' });
    if (gridApi) {
      gridApi.deselectAll();
    }
  }

  const handleSelectionChange = () => {
    dispatchBtn({ type: 'select', payload: gridApi.getSelectedRows() });
  }

  const handleAddNew = () => {
    dispatchBtn({ type: 'add', payload: true });
  }

  const handleToggleEdit = () => {
    if (btnState.amEditing) {
      gridApi.setRowData(accs);
      dispatchBtn({ type: 'edit', payload: 'cancel' });
    } else {
      setStaticSelected(gridApi.getSelectedRows().map(r => r.id));
      dispatchBtn({ type: 'edit', payload: 'start' });
    }
  }

  const handleSaveEdit = () => {
    dispatchBtn({ type: 'edit', payload: 'save' });
    gridApi.stopEditing();
    updateAccs({ next: gridApi.getSelectedRows() });
    gridApi.setRowData( _.cloneDeep(accs) );
  }

  const handleDelete = () => {
    setStaticSelected(gridApi.getSelectedRows().map(r => r.id));
    dispatchBtn({ type: 'delete', payload: 'open' });
  }

  const handleGoDelete = () => {
    setStaticSelected([]);
    const accIds = gridApi.getSelectedRows().map(r => r.id);
    dispatchBtn({ type: 'delete', payload: accIds.length });
    deleteAccs(accIds);
  }

  const handleCancelDelete = () => {
    dispatchBtn({ type: 'delete', payload: 0 })
  }

  const handleRowDataChanged = () => {
    if (gridApi) {
      if (gridApi.getSelectedRows().length === 0 && staticSelected.length > 0) {
        gridApi.forEachNode(n => {
            n.setSelected(staticSelected.includes(n.id));
        });
      }
    }
  }

  const handleExport = () => {
    if (gridApi) {
      gridApi.exportDataAsCsv({
        columnKeys: ["account", "username", "length", "index", "notes"]
      });
    }
  }

  const handleRowClick = async ({ data }) => {
    if (!btnState.amEditing) {
      navigator.clipboard.writeText(await genPassword(data));
    }
  }

  useEffect(() => {
    if (gridApi) {
      if (btnState.amEditing) {
        gridApi.setEnableCellTextSelection(false);
      } else {
        gridApi.setEnableCellTextSelection(true);
      }
    }
  }, [btnState.amEditing, gridApi]);  

  return (
    <>
      {!hide && (
      <div>
        <AddModal
          isOpen={btnState.wantToAdd}
          save={(data) => { addNewAcc(data); dispatchBtn({ type: 'add', payload: false }); }}
          cancel={() => dispatchBtn({ type: 'add', payload: false })}
        />

        <DeleteModal
          isOpen={btnState.wantToDelete}
          num={gridApi ? gridApi.getSelectedRows().length : 0}
          goDelete={() => { handleGoDelete(); }}
          cancel={() => { handleCancelDelete(); }}
        />

        <Form>
          <Form.Group controlId="formBasicEmail" className="mb-5">
            <Row>
              <Col>
                <Form.Label>Master Password</Form.Label>
              </Col>
            </Row>
            <Row>
              <Col className="d-flex">
                <Form.Control type={hideMasterPassword ? 'password' : 'text'} placeholder="" value={masterPassword} onChange={e => setMasterPassword(e.target.value)}/>
                <Button onClick={toggleMasterPasswordHidden} className={`ml-2${hideMasterPassword ? '' : ' px-3'}`}>
                  {hideMasterPassword ? 'Show' : 'Hide'}
                </Button>
              </Col>
            </Row>
          </Form.Group>
        </Form>

        <div className="ag-theme-alpine mb-3" style={{ height: 400 }}>
          <AgGridReact
            rowData={ _.cloneDeep(accs) }
            onGridReady={({ api }) => setGridApi(api)}
            defaultColDef={{
              editable: ({ column, node }) => column.getColDef().suppressMovable && node.isSelected(),
              resizable: true,
              filter: true,
              sortable: true,
              suppressMovable: btnState.amEditing,
            }}
            onRowDataChanged={handleRowDataChanged}
            singleClickEdit={true}
            enableCellTextSelection={true}
            rowSelection="multiple"
            onNewColumnsLoaded={() => { if (gridApi) { gridApi.refreshCells(); }}}
            onSelectionChanged={handleSelectionChange}
            suppressRowClickSelection={true}
            getRowNodeId={r => r.id}
            onRowClicked={handleRowClick}
          >
            <AgGridColumn field="id" hide />
            <AgGridColumn field="account" flex={1} headerCheckboxSelection={btnState.showCheckboxes} checkboxSelection={btnState.showCheckboxes}  minWidth={150} />
            <AgGridColumn field="username" flex={1} minWidth={150} />
            <AgGridColumn field="length" width={100} />
            <AgGridColumn field="index" width={100} />
            <AgGridColumn field="notes" flex={1} minWidth={150} />
          </AgGridReact>
        </div>
          
        <Row className="mb-4">
          <Col className="d-flex justify-content-start">
            {btnState.showAddBtn && <Button className="mr-2" onClick={handleAddNew}>Add New</Button>}
            {btnState.showClearBtn && <Button className="mr-2" variant="secondary" onClick={handleClear}>Cancel</Button>}
            {btnState.showEditBtn &&
              (btnState.amEditing ?
                <Button className="mr-2" variant="secondary" onClick={handleToggleEdit}>Cancel</Button>
              : 
                <Button className="mr-2" onClick={handleToggleEdit}>Edit</Button>
              )
            }
            {btnState.amEditing && <Button className="mr-2" onClick={handleSaveEdit}>Save</Button>}
            {btnState.showDeleteBtn && <Button variant="danger" onClick={handleDelete}>Delete</Button>}
          </Col>
          <Col className="d-flex justify-content-end">
            <Button variant="secondary" onClick={handleExport}>Export to CSV</Button>
          </Col>
        </Row>
      </div>)}
    </>
  )
}