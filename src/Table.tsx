import {useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { RootState } from './state/store'
import { ProductState, updateProduct } from './state/product/productSlice'


const Table = () => {

    const product = useSelector((state: RootState) => state.product)

    const [isEditable, setIsEditable] = useState(false)
    const dispatch = useDispatch()

    const handleSetIsEditable = (val: boolean) => {
        setIsEditable(val);
    };

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>, productDta: ProductState) => {
        const { name, value } = e.target;
    
        if (name === 'price' || name === 'length' || name === 'breadth' || name === 'unit') {
            updateTotal(value, productDta, name);
    
            if (name === 'length' || name === 'breadth') {
                const newLength = name === 'length' ? parseFloat(value) : productDta.length;
                const newBreadth = name === 'breadth' ? parseFloat(value) : productDta.breadth;
                
                let area;

                if (productDta.unit == 'meter') {
                    area = newLength * newBreadth;
                } else {
                    area = newLength * newBreadth * 0.0001;
                }
    
                const updatedProductData = { ...productDta, length: newLength, breadth: newBreadth, area };
    
                updateTotal(area, updatedProductData, 'area');
            }
        }
    };
    

    const handlePriceChange = (e: React.ChangeEvent<HTMLInputElement>, id: string) => {
        const newPrice = parseFloat(e.target.value);
        if (!isNaN(newPrice)) {
            dispatch(updateProduct({ id, field: 'price', value: newPrice }));
        }
    };

    const handleUnitChange = (e: React.ChangeEvent<HTMLSelectElement>, prdouctDta: ProductState) => {

        let unit = e.target.value
        let area = prdouctDta.length * prdouctDta.breadth;
        if (prdouctDta.unit != 'meter') {
            area = prdouctDta.length * prdouctDta.breadth;
        }
        if (prdouctDta.unit == 'meter') {
            area = prdouctDta.length * prdouctDta.breadth * 0.0001;;
        }

        updateTotal(unit, { ...prdouctDta, unit }, 'unit');
        updateTotal(area, { ...prdouctDta, area }, 'area');
    };
    const updateTotal = (value: string | number, productDta: ProductState, field: string | number) => {
        // console.log(11111)
        dispatch(updateProduct({ id: productDta.id, field, value }));
    };

    return (
        <div style={{ width: '90%', margin: 'auto', marginTop: '1rem' }}>
            <button onClick={() => handleSetIsEditable(!isEditable)} style={{ float: 'right', borderRadius: '5px', padding: '0px 14px', border: '1px solid' }}>{!isEditable ? 'Edit' : 'Save'}</button>
            <table className="table" >
                <thead>
                    <tr>
                        <th scope="col">Name</th>
                        <th scope="col">Length</th>
                        <th scope="col">Breadth</th>
                        <th scope="col">Area (meter <sup>2</sup>)</th>
                        <th scope="col">Price / meter</th>
                        <th scope="col">Total Price</th>
                    </tr>
                </thead>
                <tbody>
                    {product.map((productData) => (
                        <tr key={productData.id}>
                            <td>{productData.name}</td>
                            <td >  {isEditable ? <input type="number" name="length" value={productData.length} onChange={(e) => handleChange(e, productData)} style={{ width: '4rem' }} /> : productData.length} {isEditable ?
                                <select name="unit" value={productData.unit} onChange={(e) => handleUnitChange(e, productData)} style={{ width: '5rem' }} className="ml-2">
                                    <option value="meter">meter</option>
                                    <option value="centimeter">centimeter</option>
                                </select>
                                : productData.unit} </td>

                            <td> {isEditable ? <input type="number" name="breadth" value={productData.breadth} onChange={(e) => handleChange(e, productData)} style={{ width: '4rem' }} /> : productData.breadth} {isEditable ?
                                <select name="unit" value={productData.unit} onChange={(e) => handleUnitChange(e, productData)} style={{ width: '5rem' }} className="ml-2">
                                    <option value="meter">meter</option>
                                    <option value="centimeter">centimeter</option>
                                </select>
                                : productData.unit}
                            </td>

                            <td>{productData.area.toFixed(2)}  </td>
                            <td>
                                <input
                                    type="number"
                                    onChange={(e) => handlePriceChange(e, productData.id)}
                                    value={productData.price}
                                    name="price"
                                    disabled={!isEditable} // Disable input if isEditable is false
                                />
                            </td>
                            <td>{(productData.price * productData.area).toFixed(2)}  </td>
                        </tr>
                    ))}

                </tbody>
            </table>
        </div>
    )
}

export default Table
