import React from 'react';
import './ImageLinkForm.css';

const ImageLinkForm = ({ onInputChange, onButtonSubmit }) => {
  return (
    <div>
      <p className='f3'>
        {'Encuentra rostros en fotografias!, introduce la url de la imagen'}
      </p>
      <div className='center'>
        <div className='form center pa4 br3 shadow-5'>
          <input className='bn f5 pa2 w-70 center br3' type='tex' onChange={onInputChange}/>
          <button
            className='bn ml2 br3 w-30 f4 link ph3 pv2 dib black bg-light-white grow'
            onClick={onButtonSubmit}
          >Detect</button>
        </div>
      </div>
    </div>
  );
}

export default ImageLinkForm;