// File: DisplayTable.tsx
import React from "react";

type TableCell = string | JSX.Element;

interface TableProps {
  data: TableCell[][];
}

const DisplayTable: React.FC<TableProps> = ({ data }) => {
  if (data.length === 0 || (data.length > 0 && data[0].length === 0)) {
    return <div>No data available</div>;
  }

  return (
    <table>
      <tbody>
        {data.map((row, rowIndex) => (
          <tr key={`row-${rowIndex}`}>
            {row.map((cell, cellIndex) => (
              <td key={`cell-${rowIndex}-${cellIndex}`}>
                {cell}
              </td>
            ))}
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default DisplayTable;
