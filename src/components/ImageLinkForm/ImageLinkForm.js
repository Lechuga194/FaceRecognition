import React from 'react';
import './ImageLinkForm.css';

const ImageLinkForm = ({ onInputChange, onButtonSubmit, onButtonSubmitDemo}) => {
  return (
    <div>
      <p className='f4 welcome-message'>
        {'Find faces in any photo, try it out'}
      </p>
      <div className='center'>
        <div className='form center pa4 br3 shadow-5'>
          <input className='bn f5 pa2 w-70 center br3'
            placeholder="Image URL..."
            type='tex' onChange={onInputChange}/>
          <button
            className='bn ml2 br3 w-30 f4 link ph3 pv2 dib black b btnsubmitcolor grow'
            onClick={onButtonSubmit}
          >Detect</button>
          <button id="btnDemo" className="bn ml2 br3 w-30 f4 link ph3 pv2 dib black b" onClick={onButtonSubmitDemo}>Demo</button>
        </div>
      </div>
    </div>
  );
}

export default ImageLinkForm;