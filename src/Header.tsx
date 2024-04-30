
import { Link } from 'react-router-dom';

const Header = () => {
  return (
    <header style={{background:'#efe7e7',paddingTop:'20px',paddingBottom:'5px'}}>
      <nav>
        <ul style={{listStyle:'none',display:'flex',justifyContent:'center',gap:'2rem'}}>
          <li>
            <Link to="/" style={{textDecoration:'none'}}>Add Product</Link>
          </li>
          <li>
            <Link to="/table" style={{textDecoration:'none'}}>View/Update Product</Link>
          </li>
        </ul>
      </nav>
    </header>
  );
};

export default Header;
