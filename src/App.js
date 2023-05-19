import React, { useState, useRef } from 'react'
import { DataTable } from 'primereact/datatable'
import { Column } from 'primereact/column'
import { SplitButton } from 'primereact/splitbutton';
import { Dialog } from 'primereact/dialog'
import { Button } from 'primereact/button'
import Form from './Form'

import "primereact/resources/themes/lara-light-indigo/theme.css";
import "primereact/resources/primereact.css";

const App = () => {
  const [visible, setVisible] = useState(false);
  const [globalFilter, setGlobalFilter] = useState('')
  const [isEdit, setIsEdit] = useState(false)
  const [Id, setId] = useState(0)
  const [items, setItems] = useState([])
  const fileInputRef = useRef(null)
  const [selectedFileName, setselectedFileName] = useState('')
  const [newItems, setNewItems] = useState({
    id: 0,
    fotoBarang: null,
    namaBarang: '',
    hargaBeli: 0,
    hargaJual: 0,
    stokBarang: 0
  })
  const handleAdd = () => {
    if (isEdit) {
      const updatedData = items.map((item) => {
        if (item.id === Id) {
          const newData = {
            ...newItems,
            fotoBarang: newItems.fotoBarang,
            namaBarang: selectedFileName + Date.now(),
            hargaBeli: newItems.hargaBeli,
            hargaJual: newItems.hargaJual,
            stokBarang: newItems.stokBarang
          }
          return newData
        }
        return item
      })
      setItems(updatedData)
      setIsEdit(false)
      setId(0)
    } else {
      const newData = {
        ...newItems,
        namaBarang: selectedFileName + Date.now(),
        id: items.length + 1
      }
      setItems([...items, newData])
      setNewItems({
        id: 0,
        fotoBarang: null,
        namaBarang: '',
        hargaBeli: 0,
        hargaJual: 0,
        stokBarang: 0
      })
    }
    setVisible(false)
  }

  const handleEdit = (item) => {
    setId(item.id);
    setNewItems({
      id: item.id,
      fotoBarang: item.fotoBarang,
      namaBarang: item.namaBarang,
      hargaBeli: item.hargaBeli,
      hargaJual: item.hargaJual,
      stokBarang: item.stokBarang,
    });
  };

  const handleFileData = (event) => {
    const fotoBarang = event.target.files[0]
    if (fotoBarang) {
      const FormatFoto = ['image/jpg', 'image/png']
      if (FormatFoto.includes(fotoBarang.type)) {
        const maksUkuran = 100 * 1024
        if (fotoBarang.size <= maksUkuran) {
          setNewItems({
            ...newItems,
            fotoBarang: fotoBarang
          })
          const fileName = fotoBarang.name
          setselectedFileName(fileName.split('.').slice(0, -1).join('.'))
        } else {
          alert('maaf ukuran file melebihi 100kb')
          setVisible(false)
        }
      } else {
        alert('maaf hanya bisa tipe file dengan htmlFormat jpg atau png')
        setVisible(false)
      }
    }
  }

  return (
    <div>
      <div className="p-4 flex justify-between items-center">
        <label htmlFor="table-search" className="sr-only">Search</label>
        <div className="relative mt-1">
          <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
            <svg className="w-5 h-5 text-gray-500 dark:text-gray-400" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
              <path fillRule="evenodd" d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z" clipRule="evenodd"></path>
            </svg>
          </div>
          <input type="text" id="table-search" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-80 pl-10 p-2.5  dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Cari Barang..." onInput={(event) => setGlobalFilter(event.target.value)} />
        </div>
      </div>
      <DataTable
        globalFilter={globalFilter}
        value={items}
        stripedRows
        tableStyle={{ minWidth: "50rem" }}
        className="bg-white text-black"
        paginator
        rows={2}
        first={0}
        emptyMessage='Data belum ada, tambah item terlebih dahulu.....'
        rowKey={(rowData) => rowData.id}
      >
        <Column field='id' header='Id'></Column>
        <Column field='namaBarang' header='Nama Barang'></Column>
        <Column body={(rowData) => <img src={URL.createObjectURL(rowData.fotoBarang)} alt={rowData.namaBarang} className="w-6rem shadow-2 border-round" style={{ width: '100px', height: '100px' }} />} header='Foto Barang'></Column>
        <Column field='hargaBeli' header='Harga Beli'></Column>
        <Column field='hargaJual' header='Harga Jual'></Column>
        <Column field='stokBarang' header='Stok'></Column>
        <Column body={(rowData) => (
          <div>
            <SplitButton label="Update" onClick={() => {
              setIsEdit(true)
              setVisible(true)
              handleEdit(rowData)
            }} model={[
              {
                label: 'Delete',
                command: () => {
                  const confirmDialog = window.confirm('Yakin menghapus data?')
                  if (confirmDialog) {
                    const deletedItems = items.filter((item) => item.id !== rowData.id)
                    setItems(deletedItems)
                    alert('data berhasil dihapus')
                  }
                }
              }
            ]} />
          </div>
        )} header={() => (
          <div>
            <Button label="Add" onClick={() => {
              setIsEdit(false)
              setVisible(true)
            }} />
          </div>
        )}></Column>
      </DataTable>
      <Dialog header={isEdit ? 'Edit' : 'Create'} visible={visible} style={{ width: '50vw' }} onHide={() => setVisible(false)}>
        <Form newItems={newItems} setNewItems={setNewItems} fileInputRef={fileInputRef} selectedFileName={selectedFileName} handleSubmit={handleAdd} fotoBarang={newItems.fotoBarang} handleFileData={handleFileData} hargaBeli={newItems.hargaBeli} hargaJual={newItems.hargaJual} stokBarang={newItems.stokBarang} />
      </Dialog>
    </div>
  )
}

export default App
