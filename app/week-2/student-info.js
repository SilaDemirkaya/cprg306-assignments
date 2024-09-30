import React from 'react';
import Link from 'next/link';  

export default function StudentInfo() {
  return (
    <>
      <Name />
      <GithubLink />
    </>
  );
}

// returns a <h1> tag with the Sila's full name
function Name() {
  return <h1>Sila Demirkaya</h1>;
}

// returns a <nav> tag with a link to the Sila's GitHub page
function GithubLink() {
  return (
    <nav>
      <Link href="https://github.com/SilaDemirkaya">https://github.com</Link>
    </nav>
  );
}