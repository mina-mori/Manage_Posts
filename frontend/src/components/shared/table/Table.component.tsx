import React, { BaseSyntheticEvent, useState } from 'react';
import './Table.component.css';

export interface Column {
  key: string;
  title: string;
  sortable?: boolean;
}

interface Props {
  columns: Column[];
  data: any[];
  className?: string;
  totalCount: number;
  pageSize?: number;
  onRowClick?: (rowData: any) => void;
  onPageChange?: (page: number) => void
}

const Table: React.FC<Props> = ({
  columns,
  data,
  className,
  totalCount,
  pageSize = 10,
  onRowClick,
  onPageChange
}) => {
  const [currentPage, setCurrentPage] = useState(1);
  const [gotoPage, setGotoPage] = useState<number | ''>('');
  const [sortColumn, setSortColumn] = useState<Column | null>(null);
  const [sortDirection, setSortDirection] = useState<'asc' | 'desc'>('asc');
 
  const sortedData = sortColumn
    ? [...data].sort((a, b) => {
        const aValue = a[sortColumn.key];
        const bValue = b[sortColumn.key];

        if (aValue < bValue) return sortDirection === 'asc' ? -1 : 1;
        if (aValue > bValue) return sortDirection === 'asc' ? 1 : -1;
        return 0;
      })
    : data;

  const totalPages = Math.ceil(totalCount / pageSize);
  // const paginatedData = sortedData.slice(
  //   (currentPage - 1) * pageSize,
  //   currentPage * pageSize
  // );
  const handleSort = (column: Column) => {
    if (!column.sortable) return;

    if (sortColumn && sortColumn.key === column.key) {
      setSortDirection(sortDirection === 'asc' ? 'desc' : 'asc');
    } else {
      setSortColumn(column);
      setSortDirection('asc');
    }
  };

  const handlePageChange = (page: number) => {
    if (page < 1 || page > totalPages) return;
    setCurrentPage(page);
    onPageChange && onPageChange(page);
    for (let i = 1; i <= totalPages; i++) {
      const id = `nav-button-${i}`;
      const buttonElement = document.getElementById(id);
      if (i == page) {
        buttonElement?.classList.add('current');
      } else {
        buttonElement?.classList.remove('current');
      }
    }
  };
  const generatePagination = () => {
    const startPage = Math.max(1, currentPage - 1);
    const endPage = Math.min(totalPages, currentPage + 1);

    const pagination = [];

    if (startPage > 1) {
      pagination.push(
        <button key={1} onClick={() => handlePageChange(1)}>
          1
        </button>
      );

      if (startPage > 2) {
        pagination.push(<span key='ellipsis'>...</span>);
      }
    }

    for (let page = startPage; page <= endPage; page++) {
      pagination.push(
        <button
          id={`nav-button-${page}`}
          key={page}
          onClick={() => handlePageChange(page)}
          className={page === currentPage ? 'current' : ''}
        >
          {page}
        </button>
      );
    }

    if (endPage < totalPages) {
      if (endPage < totalPages - 1) {
        pagination.push(<span key='ellipsis'>...</span>);
      }

      pagination.push(
        <button key={totalPages} onClick={() => handlePageChange(totalPages)}>
          {totalPages}
        </button>
      );
    }

    return pagination;
  };

  return (
    <div className={`shared-table ${className || ''}`}>
      <table>
        <thead>
          <tr>
            {columns.map((column) => (
              <th
                key={column.key}
                onClick={() => handleSort(column)}
                className={column.sortable ? 'sortable' : ''}
              >
                {column.title}
                {sortColumn && sortColumn.key === column.key && (
                  <span>{sortDirection === 'asc' ? ' ▲' : ' ▼'}</span>
                )}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {sortedData.map((row, index) => (
            <tr key={index} onClick={() => onRowClick && onRowClick(row)}>
              {columns.map((column) => (
                <td key={column.key}>{row[column.key]}</td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
      {totalPages > 1 && (
        <div className='footer'>
          <div className='pagination'>
            <button
              onClick={() => handlePageChange(currentPage - 1)}
              disabled={currentPage === 1}
            >
              Previous
            </button>
            {generatePagination()}
            <button
              onClick={() => handlePageChange(currentPage + 1)}
              disabled={currentPage === totalPages}
            >
              Next
            </button>
          </div>
          <div className='goto-page'>
            <span>
              Page {currentPage} of {totalPages}
            </span>
            <input
              className='page-no-input'
              type='number'
              min={1}
              value={gotoPage}
              onChange={(event: BaseSyntheticEvent) => {
                setGotoPage(event.target.value);
              }}
              onKeyDown={(event) => {
                event.key === 'Enter' && gotoPage && handlePageChange(gotoPage);
              }}
            ></input>
            <input
              className='goto-btn'
              type='button'
              value='Go'
              onClick={() => gotoPage && handlePageChange(gotoPage)}
            ></input>
          </div>
        </div>
      )}
    </div>
  );
};

export default Table;
