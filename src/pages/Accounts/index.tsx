import { Row, Col } from 'react-bootstrap';

import { useAccounts } from './useAccounts';
import { AddModal } from './components/AddModal';
import { DeleteModal } from './components/DeleteModal';
import { MasterPassword } from './components/MasterPassword';
import { List } from './components/List';
import { ListButtons } from './components/ListButtons';
import { Logout } from './components/Logout'
import { Main } from '../../layouts/Main';

export const Accounts = () => {

  const {
    accounts,
    setAccounts,
    editing,
    startEditing,
    saveEditing,
    cancelEditing,
    gridApi,
    setGridApi,
    masterPassword,
    setMasterPassword,
    selectedAidList,
    selectedCount,
    addModalHidden,
    openAddModal,
    closeAddModal,
    deleteModalHidden,
    openDeleteModal,
    closeDeleteModal,
    addLocalAccount,
    deleteLocalAccounts,
    unselectAll,
    exportList
  } = useAccounts();

  return (
      <Main>
        <AddModal close={closeAddModal} isHidden={addModalHidden} addLocalAccount={addLocalAccount} />
        <DeleteModal close={closeDeleteModal} isHidden={deleteModalHidden} selectedCount={0} aidList={selectedAidList} deleteLocalAccounts={deleteLocalAccounts} />
        <MasterPassword password={masterPassword} setPassword={setMasterPassword} />
        <List 
          accounts={accounts}
          editing={editing}
          gridApi={gridApi}
          setGridApi={setGridApi}
          setAccounts={setAccounts}
        />
        <ListButtons 
          selectedCount={selectedCount}
          amEditing={editing}
          openAddModal={openAddModal}
          openDeleteModal={openDeleteModal}
          startEditing={startEditing}
          saveEditing={saveEditing}
          cancelEditing={cancelEditing}
          exportList={exportList}
          unselectAll={unselectAll}
        />
        <Logout />
          
        {/* <Row>
          <Col xs={12} md className="d-flex justify-content-center justify-content-md-start mb-4">
          </Col>
        </Row> */}
      </Main>
  )
}