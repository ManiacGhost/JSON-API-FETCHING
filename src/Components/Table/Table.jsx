import React, {useContext, useEffect, useState} from 'react';
import { SelectedHeadingsContext } from '../Context/selectedHeadingsContext';
import './styles.css'

const Table = () => {
  const [selectedHeadings, setSelectedHeadings] = useContext(SelectedHeadingsContext);
  const [productsArray, setProductsArray] = useState([]);

  useEffect(() => {
    const fileContents = localStorage.getItem('resp');
    if (fileContents) {
      const data = JSON.parse(atob(fileContents.split(',')[1]));
      if (data.products && typeof data.products === 'object') {
        const products = Object.values(data.products);

        const sortedProducts = products.sort((a, b) => b.popularity - a.popularity);
        setProductsArray(sortedProducts);
      }
    }

  }, []);

  return (
    <div className="app">
      <h1>Product Data in Descending order OF popularity</h1>
      {selectedHeadings.length === 0 && <p>Please Select At least one Field from the previous page</p>}
      <table className="product-table">
        <thead>
          <tr>
            {selectedHeadings.map((heading, index) => (
              <th key={index}>{heading}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {productsArray.map((product, index) => (
            <tr key={index}>
              {selectedHeadings.map((heading, index) => (
                <td key={index}>{product[heading]}</td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Table;
