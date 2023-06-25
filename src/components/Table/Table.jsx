import React from 'react';

function Table({ columns, data }) {
  return (
    <div className="overflow-x-auto">
      {
        data.length === 0 ? (
          <p className="text-center text-gray-500 font-Poppins">No data available</p>
        ) : (
          <table className="table-auto w-full">
          <thead>
            <tr className="bg-gray-100">
              {columns.map((column) => (
                <th key={column.field} className="px-4 py-2">
                  {column.headerName}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {data.map((row, index) => (
              <tr key={index}>
                {columns.map((column) => (
                  <td key={column.field} className="border px-4 py-2">
                    {column.renderCell ? (
                      column.renderCell(row)
                    ) : (
                      row[column.field]
                    )}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
        )
      }
     
    </div>
  );
}

export default Table;
