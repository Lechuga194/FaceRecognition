import React from 'react';
import './ImageLinkForm.css';

const ImageLinkForm = ({ onInputChange, onButtonSubmit }) => {
  return (
    <div>
      <p className='f4 welcome-message'>
        {'Find faces in any photo, try it out'}
      </p>
      <div className='center'>
        <div className='form center pa4 br3 shadow-5'>
          <input className='bn f5 pa2 w-70 center br3' type='tex' onChange={onInputChange}/>
          <button
            className='bn ml2 br3 w-30 f4 link ph3 pv2 dib black b btnsubmitcolor grow'
            onClick={onButtonSubmit}
          >Detect</button>
        </div>
      </div>
    </div>
  );
}

export default ImageLinkForm;