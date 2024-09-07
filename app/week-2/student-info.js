import React from 'react';
import Link from 'next/link';  

const StudentInfo = () => {
  return (
    <div>
      <h1>Sila Demirkaya</h1>  
      <p>
        <Link href="https://github.com/SilaDemirkaya" legacyBehavior> 
        <a target="_blank">https://github.com</a>  
        </Link>
      </p>
    </div>
  );
};

export default StudentInfo;  