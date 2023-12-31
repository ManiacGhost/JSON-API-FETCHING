import React, { useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { SelectedHeadingsContext } from '../Context/selectedHeadingsContext';
import './styles.css'

const Home = () => {
  const [file, setFile] = useState(null);
  const [fileType, setFileType] = useState('');
  const [encoding, setEncoding] = useState('');
  const [delimiter, setDelimiter] = useState('');
  const [hasHeader, setHasHeader] = useState(false);
  const [headings, setHeadings] = useState([]);
  const [selectedHeadings, setSelectedHeadings] = useContext(SelectedHeadingsContext);
  const navigate = useNavigate();

  const handleFileChange = (event) => {
    setFile(event.target.files[0]);
    const resp = event.target.files[0];

    const textReader = new FileReader();
    textReader.onload = (event) => {
      const data = JSON.parse(event.target.result);
      if (data.products && typeof data.products === 'object') {
        const productsArray = Object.values(data.products);
        if (productsArray.length > 0) {
          setHeadings(Object.keys(productsArray[0]));
        }
      }
    };
    textReader.readAsText(resp);

    const dataUrlReader = new FileReader();
    dataUrlReader.onloadend = () => {
      localStorage.setItem('resp', dataUrlReader.result);
    };
    dataUrlReader.readAsDataURL(resp);
  };


  const handleAddHeading = () => {
    const select = document.getElementById('available-headings');
    const selectedOptions = Array.from(select.selectedOptions);
    const newSelectedHeadings = [...new Set([...selectedHeadings, ...selectedOptions.map(option => option.value)])];
    setSelectedHeadings(newSelectedHeadings);
  
    selectedOptions.forEach(option => option.selected = false);
  };
  
  const handleRemoveHeading = () => {
    const select = document.getElementById('available-headings');
    const selectedOptions = Array.from(select.selectedOptions);
    const newSelectedHeadings = selectedHeadings.filter(heading => !selectedOptions.map(option => option.value).includes(heading));
    setSelectedHeadings(newSelectedHeadings);
  
    selectedOptions.forEach(option => option.selected = false);
  };
  
  return (
    <div className="app">
      <p className="header"><b>Import Products</b></p>
      <div className="row">
        <div className="block">
          <h2>Upload File</h2>
          <input type="file" accept=".csv,.json" onChange={handleFileChange} />
          <h3>Supported File Type(s) : .CSV , .JSON</h3>
        </div>
        <div className="block">
          <h2>Specify File Format</h2>
          <label>
            File Type:
            <select value={fileType} onChange={(e) => setFileType(e.target.value)}>
              <option value="">Select file type</option>
              <option value="csv">CSV</option>
              <option value="json">JSON</option>
            </select>
          </label>
          <label>
            Character Encoding:
            <select value={encoding} onChange={(e) => setEncoding(e.target.value)}>
              <option value="">Select encoding</option>
              <option value="utf8">UTF-8</option>
              <option value="ascii">ASCII</option>
            </select>
          </label>
          <label>
            Delimiter:
            <select value={delimiter} onChange={(e) => setDelimiter(e.target.value)}>
              <option value="">Select delimiter</option>
              <option value=",">Comma (,)</option>
              <option value=";">Semicolon (;)</option>
            </select>
          </label>
          <label>
            Has Header:
            <input type="checkbox" checked={hasHeader} onChange={(e) => setHasHeader(e.target.checked)} />
          </label>
        </div>
      </div>
      {file ? (
        <div className='row'>
          <div className='container'>
          <div>
          <p>Display handling <br/> Select the fields to be displayed</p>
          </div>
          <p></p>
            <div className='heading'>
              <h2>Available Fields</h2>
              <select id="available-headings" multiple>
                {headings.map((heading, index) => (
                  <option key={index} value={heading}>{heading}</option>
                ))}
              </select>
            </div>
            <div className='heading'>
              <button onClick={handleAddHeading}>{">>"}</button>
              <br />
              <button onClick={handleRemoveHeading}>{"<<"}</button>
            </div>
            <div className='heading'>
              <h2>Fields to be displayed</h2>
              <select id="selected-headings" multiple>
                {selectedHeadings.map((heading, index) => (
                  <option key={index} value={heading}>{heading}</option>
                ))}
              </select>
              {console.log(selectedHeadings)}
              {selectedHeadings.length === 0 && <p>SELECTED HEADINGS WILL BE DISPLAYED</p>}
            </div>
          </div>
        </div>
      ) : (
        <p>Please select a file first.</p>
      )}
      {file && <button className="btn" onClick={() => navigate('/table')}> Next</button>}
    </div>
  );
};

export default Home;




