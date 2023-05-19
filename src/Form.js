import React from 'react'

const Form = (props) => {
    const handleSubmit = (event) => {
        event.preventDefault()
        props.handleSubmit()
      };
    return (
        <div>
            <form onSubmit={handleSubmit}>
                <div className="mb-5">
                    <label
                        htmlFor="fotoBarang"
                        className="mb-3 block text-base font-medium text-[#07074D]"
                    >
                        Foto Barang
                    </label>
                    <input
                        type="file"
                        name="fotoBarang"
                        id="fotoBarang"
                        ref={props.fileInputRef}
                        onChange={props.handleFileData}
                        className="w-full rounded-md border border-[#e0e0e0] bg-white py-3 px-6 text-base font-medium text-[#6B7280] outline-none focus:border-[#6A64F1] focus:shadow-md"
                    />
                </div>
                <div className="mb-5">
                    <label
                        htmlFor="hargaBeli"
                        className="mb-3 block text-base font-medium text-[#07074D]"
                    >
                        Harga Beli
                    </label>
                    <input
                        type="number"
                        name="hargaBeli"
                        id="hargaBeli"
                        value={props.hargaBeli}
                        onChange={(event)=> props.setNewItems({...props.newItems, hargaBeli:event.target.value})}
                        className="w-full rounded-md border border-[#e0e0e0] bg-white py-3 px-6 text-base font-medium text-[#6B7280] outline-none focus:border-[#6A64F1] focus:shadow-md"
                    />
                </div>
                <div className="mb-5">
                    <label
                        htmlFor="hargaJual"
                        className="mb-3 block text-base font-medium text-[#07074D]"
                    >
                        Harga Jual
                    </label>
                    <input
                        type="number"
                        name="hargaJual"
                        id="hargaJual"
                        value={props.hargaJual}
                        onChange={(event)=> props.setNewItems({...props.newItems, hargaJual:event.target.value})}
                        className="w-full rounded-md border border-[#e0e0e0] bg-white py-3 px-6 text-base font-medium text-[#6B7280] outline-none focus:border-[#6A64F1] focus:shadow-md"
                    />
                </div>
                <div className="mb-5">
                    <label
                        htmlFor="stokBarang"
                        className="mb-3 block text-base font-medium text-[#07074D]"
                    >
                        Stok
                    </label>
                    <input
                        type="number"
                        name="stokBarang"
                        id="stokBarang"
                        value={props.stokBarang}
                        onChange={(event)=> props.setNewItems({...props.newItems, stokBarang:event.target.value})}
                        className="w-full rounded-md border border-[#e0e0e0] bg-white py-3 px-6 text-base font-medium text-[#6B7280] outline-none focus:border-[#6A64F1] focus:shadow-md"
                    />
                </div>
                <button type="submit" className="hover:shadow-form rounded-md bg-[#6A64F1] py-3 px-8 text-base font-semibold text-white outline-none">
                    Submit
                </button>
            </form>
        </div>
    )
}

export default Form