import React, { useEffect, useRef, useState } from 'react';

import { useDispatch } from 'react-redux';
import { addProduct } from './state/product/productSlice';

export interface Product {
    name: string;
    length: number;
    breadth: number;
    area: number;
    price: number;
    total: number;
    unit: string;
}

const Home: React.FC = () => {
    const [unitState, setUni] = useState<string>('meter')
    const [areaState, setAreaState] = useState<number | undefined>(undefined);
    const lengthState = useRef<HTMLInputElement>(null);
    const breadthState = useRef<HTMLInputElement>(null);
    const priceState = useRef<HTMLInputElement>(null);
    const dispatch = useDispatch()

    const [product, setProduct] = useState<Product>({
        name: '',
        length: 0,
        breadth: 0,
        area: 0,
        price: 0,
        total: 0,
        unit: '',
    });

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();     
        product.unit = unitState
        setUni('meter')
        console.log(product);
        dispatch(addProduct(product))
        alert('product added !!!')
        setProduct({
            name: '',
            length: 0,
            breadth: 0,
            area: 0,
            price: 0,
            total: 0,
            unit: '',
        })
    };
   
    const handleChange = (e: React.ChangeEvent<HTMLInputElement> | React.ChangeEvent<HTMLSelectElement>) => {
  
        const { name, value } = e.target;
        setProduct((prevProduct) => ({
            ...prevProduct,
            [name]: name === 'name' ? value : name === 'unit' ? value : parseFloat(value) || 0,
        }));
        
        if (name === 'price' || name === 'length' || name === 'breadth' || name === 'unit') {
            updateTotal();
        }
    };

    const handleUnitChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
        setUni(e.target.value);
    };
    
    const updateTotal = () => {
        
        let area = Number(lengthState.current?.value)*Number(breadthState.current?.value);
        
        if (unitState === 'centimeter') {
            area = Number(lengthState.current?.value)*Number(breadthState.current?.value)
            area *= 0.0001; // Convert from square centimeters to square meters
        }
        setAreaState(area)    
        const total = Number(priceState.current?.value) * area;       
       
        setProduct((prevProduct) => ({
            ...prevProduct,
            area,
            total,
        }));
    };
  
    useEffect(() => {
        updateTotal();
    }, [unitState]); 

    return (
        <div className="container mt-3 w-50 " >
            <h2 className='text-center'>Add Product</h2>
            <form onSubmit={handleSubmit}>
                <div className="form-group updown">
                    <label>Name:</label>
                    <input type="text" name="name" value={product.name} onChange={handleChange} required />
                </div>
                <div className="form-group updown pt-2">
                    <label>Length:</label>
                    <div style={{ display: 'flex', justifyContent: 'space-between', gap: '1rem' }}>
                        <input ref={lengthState} style={{ width: '75%', minWidth: '12rem' }} type="number" name="length" min={1} value={product?.length || 0} onChange={handleChange} required />
                        <select name="unit" value={unitState} defaultValue={unitState} onChange={handleUnitChange} style={{ width: '5rem' }} className="ml-2">
                            <option value="meter">meter</option>
                            <option value="centimeter">centimeter</option>
                        </select>
                    </div>
                </div>
                <div className="form-group updown pt-2">
                    <label>Breadth:</label>
                    <div style={{ display: 'flex', justifyContent: 'space-between', gap: '1rem' }}>
                        <input ref={breadthState} style={{ width: '75%', minWidth: '12rem' }} type="number" name="breadth" min={1} value={product?.breadth || 0} onChange={handleChange} required />
                        <select name="unit" value={unitState} defaultValue={unitState} onChange={handleUnitChange} style={{ width: '5rem' }} className="ml-2">
                            <option value="meter">meter</option>
                            <option value="centimeter">centimeter</option>
                        </select>
                    </div>
                </div>
                <div className="form-group updown pt-2">
                    <label>Area:</label>
                    <input type="number" name="area" disabled value={areaState?.toFixed(2)} />
                </div>
                <div className="form-group updown pt-2">
                    <label>Price:</label>
                    <input ref={priceState} type="number" name="price" min={10} value={+product.price}  onChange={handleChange} required />
                </div>
                <div className="form-group updown py-2">
                    <label>Total Price:</label>
                    <input type="number" name="total" disabled value={product.total?.toFixed(2)} />
                </div>
                <button type="submit">Save Changes</button>
            </form>
        </div>
    );
};

export default Home;
