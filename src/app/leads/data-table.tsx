// app/(dashboard)/leads/data-table.tsx
"use client";

import {
  ColumnDef,
  flexRender,
  getCoreRowModel,
  getPaginationRowModel,
  useReactTable,
} from "@tanstack/react-table";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { DataTablePagination } from "@/components/TablePagination";
import { useEffect, useState,useCallback } from "react";

interface DataTableProps<TData, TValue> {
  columns: ColumnDef<TData, TValue>[];
  token: string;
}

export function DataTable<TData, TValue>({
  columns,
  token,
}: DataTableProps<TData, TValue>) {
  const [data, setData] = useState<TData[]>([]);
  const [pageIndex, setPageIndex] = useState(0); // zero-based for tanstack
  const [pageCount, setPageCount] = useState(0);

  const fetchData = useCallback(
    async (page: number) => {
      const res = await fetch(
        `https://147.93.96.111:3000/api/lead?limit=5&page=${page + 1}&sort=-createdAt`,
        {
          headers: {
            version: "1",
            Authorization: `${token}`,
          },
          cache: "no-store",
        }
      );
  
      if (res.ok) {
        const result = await res.json();
        setData(result.data.items);
        setPageCount(result.data.meta.totalPages);
      }
    },
    [token, setData, setPageCount] // ✅ Add all dependencies here
  );

  useEffect(() => {
    fetchData(pageIndex);
  }, [pageIndex,fetchData]);

  const table = useReactTable({
    data,
    columns,
    pageCount,
    manualPagination: true,
    state: {
      pagination: {
        pageIndex,
        pageSize: 5,
      },
    },
    onPaginationChange: (updater) => {
      const nextPageIndex =
        typeof updater === "function"
          ? updater({
            pageIndex,
            pageSize: 0
          })?.pageIndex
          : updater?.pageIndex;
      if (typeof nextPageIndex === "number") setPageIndex(nextPageIndex);
    },
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
  });

  return (
    <div className="rounded-md border">
      <Table>
        <TableHeader>
          {table.getHeaderGroups().map((headerGroup) => (
            <TableRow key={headerGroup.id}>
              {headerGroup.headers.map((header) => (
                <TableHead key={header.id}>
                  {header.isPlaceholder
                    ? null
                    : flexRender(header.column.columnDef.header, header.getContext())}
                </TableHead>
              ))}
            </TableRow>
          ))}
        </TableHeader>
        <TableBody>
          {table.getRowModel().rows.length ? (
            table.getRowModel().rows.map((row) => (
              <TableRow key={row.id}>
                {row.getVisibleCells().map((cell) => (
                  <TableCell key={cell.id}>
                    {flexRender(cell.column.columnDef.cell, cell.getContext())}
                  </TableCell>
                ))}
              </TableRow>
            ))
          ) : (
            <TableRow>
              <TableCell colSpan={columns.length} className="text-center py-8">
                Loading......
              </TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>
      <DataTablePagination table={table} />
    </div>
  );
}
