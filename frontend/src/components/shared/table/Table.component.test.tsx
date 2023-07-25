/* eslint-disable jest/no-conditional-expect */
/* eslint-disable testing-library/prefer-screen-queries */
import React from 'react';
import { render, fireEvent } from '@testing-library/react';
import Table from './Table.component';

describe('Table component', () => {
  const columns = [
    { key: 'name', title: 'Name', sortable: true },
    { key: 'age', title: 'Age', sortable: true },
    { key: 'email', title: 'Email', sortable: false },
  ];

  const data = [
    { name: 'John Doe', age: 25, email: 'john.doe@example.com' },
    { name: 'Jane Smith', age: 30, email: 'jane.smith@example.com' },
    // Add more test data as needed
  ];

  test('renders table with correct headers', () => {
    const { getByText } = render(<Table columns={columns} totalCount={data.length} data={data} />);

    columns.forEach((column) => {
      const header = getByText(column.title);
      expect(header).toBeInTheDocument();
    });
  });

  test('renders table with correct data', () => {
    const { getByText } = render(<Table columns={columns} totalCount={data.length} data={data} />);

    data.forEach((row) => {
      Object.values(row).forEach((value) => {
        const cell = getByText(value.toString());
        expect(cell).toBeInTheDocument();
      });
    });
  });

  test('handles sorting when header is clicked', () => {
    const { getByText, getAllByRole } = render(
      <Table columns={columns} totalCount={data.length} data={data} />
    );

    const sortableColumn = columns.find((column) => column.sortable);

    if (sortableColumn) {
      const header = getByText(sortableColumn.title);
      fireEvent.click(header);

      const sortedData = [...data].sort((a: any, b: any) => {
        const aValue = a[sortableColumn.key];
        const bValue = b[sortableColumn.key];

        if (aValue < bValue) return -1;
        if (aValue > bValue) return 1;
        return 0;
      });

      const cells = getAllByRole('cell');

      sortedData.forEach((row, index) => {
        Object.values(row).forEach((value, columnIndex) => {
          const cellIndex = index * columns.length + columnIndex;
          expect(cells[cellIndex]).toHaveTextContent(value.toString());
        });
      });
    }
  });

  test('handles page change when pagination buttons are clicked', () => {
    const { getByText, queryByText } = render(
      <Table columns={columns} totalCount={data.length} data={data} pageSize={1} />
    );

    const previousButton = getByText('Previous');
    const nextButton = getByText('Next');
    const totalPages = Math.ceil(data.length / 1);

    // Initial page
    let currentPage = queryByText('1');
    expect(currentPage).toBeInTheDocument();

    // Next page
    fireEvent.click(nextButton);
    currentPage = queryByText('2');
    expect(currentPage).toBeInTheDocument();

    // Previous page
    fireEvent.click(previousButton);
    currentPage = queryByText('1');
    expect(currentPage).toBeInTheDocument();

    // Go to last page
    fireEvent.click(getByText(totalPages.toString()));
    currentPage = queryByText(totalPages.toString());
    expect(currentPage).toBeInTheDocument();

    // Next button disabled on last page
    expect(nextButton).toBeDisabled();

    // Go back to the first page
    fireEvent.click(getByText('1'));
    currentPage = queryByText('1');
    expect(currentPage).toBeInTheDocument();

    // Previous button disabled on first page
    expect(previousButton).toBeDisabled();
  });
});
