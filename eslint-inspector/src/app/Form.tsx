import { useState } from 'react';

export default function Form({ setConfInfo }) {
  const [version, setVersion] = useState('latest');
  const [path, setPath] = useState('');

  const style = {
    row: {
      padding: '5px',
    },
    label: {
      width: '100px',
      display: 'inline-block',
    },
    select: {
      width: '100px',
    },
    input: {
      width: '200px',
    },
  }

  return (
    <form onSubmit={async (e) => {
      e.preventDefault();
      const result = await fetch(`/api/inspect?version=${version}&path=${process.env.NEXT_PUBLIC_BASE_PATH}${path}`);
      const { success, output } = await result.json();
      if (success) setConfInfo(output);
    }}>
      <div style={style.row}>
        <label style={style.label}>ESLint 버전</label>
        <select style={style.select} onChange={(e) => setVersion(e.target.value)}>
          <option value="latest">latest</option>
          <option value="7.26.0">7.26.0</option>
        </select>
      </div>
      <div style={style.row}>
        <label style={style.label}>파일 경로</label>
        <input style={style.input} type="text" onChange={(e) => setPath(e.target.value)} />
      </div>
      <div style={style.row}>
        <button>Inspect</button>
      </div>
    </form>
  );
}