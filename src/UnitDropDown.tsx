import React from 'react';
import { useDispatch } from 'react-redux';
import { updateProduct } from './state/product/productSlice';

interface UnitDropdownProps {
  id?: string;
  value: string;
  
}

const UnitDropdown: React.FC<UnitDropdownProps> = ({ value, id }) => {
  const dispatch = useDispatch();

  const handleUnitChange = (selectedUnit: string, id?: string) => {
    dispatch(updateProduct({ id: id || '', field: 'unit', value: selectedUnit })); // Dispatch the action
    
  };
  const handleDropdownChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    handleUnitChange(e.target.value, id);
  };

  return (
    <select name="unit" value={value} onChange={handleDropdownChange} style={{ width: '5rem' }} className="ml-2">
      <option value="meter">meter</option>
      <option value="centimeter">centimeter</option>
    </select>
  );
};

export default UnitDropdown;
