import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { v4 as uuidv4 } from 'uuid'; // Import UUID generator

export interface ProductState {
  id: string;
  name: string;
  length: number;
  breadth: number;
  area: number;
  price: number;
  total: number;
  unit: string;
}


const initialState: ProductState[] = [
  { id: uuidv4(), name: 'Product 1', length: 10, breadth: 5, area: 50, price: 100, total: 500, unit: 'meter', },
  { id: uuidv4(), name: 'Product 2', length: 8, breadth: 6, area: 48, price: 80, total: 384, unit: 'centimeter', },
  { id: uuidv4(), name: 'Product 3', length: 15, breadth: 3, area: 45, price: 120, total: 540, unit: 'meter', },
  { id: uuidv4(), name: 'Product 4', length: 12, breadth: 4, area: 48, price: 90, total: 432, unit: 'centimeter', },
  { id: uuidv4(), name: 'Product 5', length: 20, breadth: 2, area: 40, price: 150, total: 600, unit: 'meter', },
];


const productSlice = createSlice({
  name: 'product',
  initialState,
  reducers: {

    addProduct: (state, action: PayloadAction<Omit<ProductState, 'id'>>) => {
      const newProduct: ProductState = {
        id: uuidv4(),
        ...action.payload,
      };
      state.push(newProduct);
    },

    updateProduct: (state, action: PayloadAction<{ id: string; field: string|number; value: any }>) => {
      const { id, field, value } = action.payload;
      return state.map(product =>
        product.id === id ? { ...product, [field]: value } : product
      );
    },

  },
});

export const { addProduct, updateProduct } = productSlice.actions;
export default productSlice.reducer;
