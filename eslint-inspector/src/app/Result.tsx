import { CSSProperties } from "react";

function InfoTable({ info, width }) {
  const keys = Object.keys(info);
  const tableStyle: CSSProperties = {
    border: '1px solid rgba(188, 196, 204, 1)',
    borderCollapse: 'collapse',
    width: `${width}px`,
  };
  const tdStyle: CSSProperties = {
    border: '1px solid rgba(188, 196, 204, 1)',
    wordBreak: 'break-all',
  };

  return (
    <table style={tableStyle}>
      <tbody>
        {keys.map((key) => (
          <tr key={key}>
            <th style={{ ...tdStyle, width: '150px' }}>{key}</th>
            <td style={tdStyle}>
              <pre>
                <code>
                  {JSON.stringify(info[key], null, '  ')}
                </code>
              </pre>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}

function JSONResult({ info }) {
  return (
    <article
      style={{
        padding: '5px 10px',
        overflowX: 'auto',
        backgroundColor: '#eee'
      }}
    >
      <pre>
        <code>
          {info}
        </code>
      </pre>
    </article>
  );
}

export default function Result({ confInfo }) {
  const keys = Object.keys(confInfo).filter((key) => !['globals'].includes(key));

  return keys.map((key) => {
    let info = confInfo[key];
    if (key !== 'parser') info = JSON.stringify(info, null, '  ');

    return (
      <section key={key}>
        <h4>{key}</h4>
        <JSONResult info={info} />
      </section>
    );
  });
}