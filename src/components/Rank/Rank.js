import React from 'react';

const Rank = ({name, entries}) => {
  return (
    <div className='white f2 b'>
      {`${name}, your current entry count is #${entries}`}
    </div>
  );
}

export default Rank;