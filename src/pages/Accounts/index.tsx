
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
    localAccounts,
    selectedAidList,
    editing,
    startEditing,
    saveEditing,
    cancelEditing,
    setGridApi,
    addModalHidden,
    openAddModal,
    closeAddModal,
    deleteModalHidden,
    openDeleteModal,
    closeDeleteModal,
    unselectAll,
    updateSelection,
    exportList
  } = useAccounts();

  return (
      <Main>
        <AddModal close={closeAddModal} isHidden={addModalHidden} />
        <DeleteModal close={closeDeleteModal} isHidden={deleteModalHidden} aidList={selectedAidList} />
        <MasterPassword />
        <List 
          localAccounts={localAccounts}
          editing={editing}
          setGridApi={setGridApi}
          updateSelection={updateSelection}
        />
        <ListButtons 
          selectedAidList={selectedAidList}
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