import React from 'react';
import './FaceRecognition.css';

const FaceRecognition = ({ imageUrl, box }) => {
  //box = box[1]
  return (
    <div className='center ma'>
      <div className='absolute mt2'>
        <img id='inputimage' alt='' src={imageUrl} width='auto' heigh='auto'/>
        {drawFaces(box)}
      </div>
    </div>
  );
}

const drawFaces = (box) => {
  let faces = [];
  for(let i = 0; i<box.length; i++){
    faces.push(<div key={i} className='bounding-box br3 grow '  
      style={{top: box[i].topRow, right: box[i].rightCol, bottom: box[i].bottomRow, left: box[i].leftCol}}></div>)
  }
  return <div>{faces}</div>
}

export default FaceRecognition;