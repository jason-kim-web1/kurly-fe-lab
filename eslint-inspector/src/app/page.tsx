'use client';

import { useState } from 'react';
import Form from './Form';
import Result from './Result';

export default function Page() {
  const [confInfo, setConfInfo] = useState(null);

  return (
    <div>
      <Form setConfInfo={setConfInfo} />
      {confInfo && <Result confInfo={confInfo} />}
    </div>
  );
}