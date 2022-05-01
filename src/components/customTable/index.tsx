import React from "react";
import { useTable, useGlobalFilter, useFilters, useSortBy, useAsyncDebounce, usePagination, Row } from "react-table";
import { matchSorter } from "match-sorter";

export default function CustomTable(props: { columns: any; tableData: any; sortBy?: string }) {

  const defaultColumn = React.useMemo(
    () => ({
      Filter: DefaultColumnFilter,
    }),
    []
  );

  type GlobalFilterType = {
    preGlobalFilteredRows:Row<{}>[],
    globalFilter:any,
    setGlobalFilter:any
  }

  function GlobalFilter({
    preGlobalFilteredRows,
    globalFilter,
    setGlobalFilter,
  }: GlobalFilterType) {
    const count = preGlobalFilteredRows.length;
    const [value, setValue] = React.useState(globalFilter);
    const onChange = useAsyncDebounce(value => {
      setGlobalFilter(value || undefined);
    }, 1500);

    return (
      <span>
        Search:{" "}
        <input
          value={value || ""}
          onChange={e => {
            setValue(e.target.value);
            onChange(e.target.value);
          }}
          placeholder={`Search through records (Total: ${count})`}
          style={{
            fontSize: "1.1rem",
            border: "0",
            width: "80%"
          }}
        />
      </span>
    );
  }

  // Define a default UI for filtering
  function DefaultColumnFilter({filterValue,preFilteredRows,setFilter}: any) {
    const count = preFilteredRows.length;
    return (
      <input
        value={filterValue || ""}
        onChange={e => {
          setFilter(e.target.value || undefined); // Set undefined to remove the filter entirely
        }}
        placeholder={`Search ${count} records...`}
      />
    );
  }

  function fuzzyTextFilterFn(rows: Row[], id: any, filterValue: string) {
    return matchSorter(rows, filterValue, { keys: [row => row.values[id]] });
  }

  const filterTypes = React.useMemo(
    () => ({
      // Add a new fuzzyTextFilterFn filter type.
      fuzzyText: fuzzyTextFilterFn,
      // Or, override the default text filter to use
      // "startWith"
      text: (rows: Row[], id: any, filterValue: any) => {
        return rows.filter((row: Row) => {
          const rowValue = row.values[id];
          return rowValue !== undefined
            ? String(rowValue)
              .toLowerCase()
              .startsWith(String(filterValue).toLowerCase())
            : true;
        });
      },
    }),
    []
  );

  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    state,
    visibleColumns,
    prepareRow,
    page,
    preGlobalFilteredRows,
    setGlobalFilter,
    canPreviousPage,
    canNextPage,
    pageOptions,
    pageCount,
    gotoPage,
    setPageSize,
    state: { pageIndex, pageSize },

  } = useTable({
    columns: props.columns,
    data: props.tableData,
    defaultColumn,
    filterTypes,
    initialState: {
      sortBy: [
        {
          id: props.sortBy ?? "createdAt",
          // desc: true
        }
      ], 
      pageIndex: 0
    },
  }, useFilters,
  useGlobalFilter, useSortBy, usePagination);

  return (
    <div style={{ width: "100%", overflow: "auto" }} >

      <table {...getTableProps()} >
        <thead>
          {headerGroups.map(headerGroup => (
            <tr {...headerGroup.getHeaderGroupProps()}>
              {headerGroup.headers.map(column => (
                <th
                  {...column.getHeaderProps(column.getSortByToggleProps)}
                >
                  {column.render("Header")}
                  {column.isSorted
                    ? column.isSortedDesc
                      ? " (DESC)"
                      : " (ASC)"
                    : "(▼)"}

                </th>
              ))}
            </tr>

          ))}
          <tr>
            <th
              colSpan={visibleColumns.length}
              style={{
                textAlign: "left",
              }}
            >
              <GlobalFilter
                preGlobalFilteredRows={preGlobalFilteredRows}
                globalFilter={state.globalFilter}
                setGlobalFilter={setGlobalFilter}
              />
            </th>
          </tr>
        </thead>
        <tbody {...getTableBodyProps()}>
          {page.map((row, i) => {
            prepareRow(row);
            return (
              <tr {...row.getRowProps()}>
                {row.cells.map(cell => {
                  return (
                    <td
                      {...cell.getCellProps({
                        style: {
                          minWidth: cell.column.minWidth,
                          width: cell.column.width,
                        },
                      })}
                    >
                      {cell.render("Cell")}
                    </td>
                  );
                })}
              </tr>
            );
          })}
        </tbody>
      </table>
      {/* 
Pagination can be built however you'd like. 
*/}
        <ul className="pagination">
          <li className="page-item">
            <button className="page-link" onClick={() => gotoPage(0)} disabled={!canPreviousPage} aria-label="Previous">
              <span aria-hidden="true">&laquo;</span>
              <span className="sr-only"></span>
            </button>
          </li>

          {Array.apply(0, Array(pageOptions.length)).map((page, i) =>
            <li key={i} >
              <button className={pageIndex === i ? "active" : ""} onClick={() => gotoPage(i)}>{i + 1}</button>
            </li>
          )}

          <li className="page-item">
            <button className="page-link" onClick={() => gotoPage(pageCount - 1)} disabled={!canNextPage} aria-label="Next">
              <span aria-hidden="true">&raquo;</span>
              <span className="sr-only">  </span>
            </button>
          </li>

          <li>
          <select
          style={{
            boxSizing: "border-box", borderRadius: "inherit", height: "35px"
          }}
          value={pageSize}
          onChange={e => {
            setPageSize(Number(e.target.value));
          }}>
            
          {[10, 20, 30, 40, 50].map(pageSize => (
            <option key={pageSize} style={{  // A reset of styles, including removing the default dropdown arrow
              appearance: "none",
              // Additional resets for further consistency
              backgroundColor: "transparent",
              border: "none",
              padding: "0 1em 0 0",
              margin: 0,
              width: "100%",
              fontFamily: "inherit",
              fontSize: "inherit",
              cursor: "inherit",
              lineHeight: "inherit"
            }} value={pageSize}>
                            Show {pageSize}
            </option>
          ))}
        </select>
          </li>
        </ul>
      </div>
  );
}
