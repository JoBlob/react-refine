import React from "react";
import { useMany, useSelect } from "@refinedev/core";
import { useDataGrid, EditButton, ShowButton } from "@refinedev/mui";

import { DataGrid, GridColDef } from "@mui/x-data-grid";

export const ListProducts = () => {
  const { dataGridProps } = useDataGrid<IProduct>({
    sorters: { initial: [{ field: "id", order: "asc" }] },
    syncWithLocation: true,
  });

  const {
    options: categories,
    queryResult: { isLoading },
  } = useSelect<ICategory>({
    resource: "categories",
  });

  // const { data: categories, isLoading } = useMany<ICategory>({
  //   resource: "categories",
  //   ids: dataGridProps?.rows?.map((product) => product.category?.id) ?? [],
  // });

  const columns = React.useMemo<GridColDef<IProduct>[]>(
    () => [
      {
        field: "id",
        headerName: "ID",
        type: "number",
        width: 50,
      },
      {
        field: "name",
        headerName: "Name",
        minWidth: 300,
        flex: 1,
      },
      {
        field: "category.id",
        headerName: "Category",
        minWidth: 250,
        flex: 0.5,
        // We're defining the column type as `singleSelect` and providing the options to the `valueOptions` prop.
        type: "singleSelect",
        valueOptions: categories,
        // Since now the options are in an object format, we need to provide the `valueFormatter` prop to pick the value of the option.
        valueFormatter: (params: { value: unknown }) => {
          if (params) params.value;
        },
        renderCell: function render({ row }) {
          if (isLoading) {
            return "Loading...";
          }

          return categories?.find(
            (category) => category.value == row.category.id
          )?.label;
        },
      },
      {
        field: "material",
        headerName: "Material",
        minWidth: 120,
        flex: 0.3,
      },
      {
        field: "price",
        headerName: "Price",
        minWidth: 120,
        flex: 0.3,
      },
      {
        field: "actions",
        headerName: "Actions",
        renderCell: function render({ row }) {
          return (
            <div>
              <EditButton hideText recordItemId={row.id} />
              <ShowButton hideText recordItemId={row.id} />
            </div>
          );
        },
      },
    ],
    [categories, isLoading]
  );

  //  Known type issue with dataGrid https://github.com/refinedev/refine/issues/5997
  return (
    <div style={{ width: "100%" }}>
      <h1>Products</h1>
      <DataGrid {...dataGridProps} columns={columns} autoHeight />
    </div>
  );
};

interface IProduct {
  id: number;
  name: string;
  material: string;
  price: string;
  category: ICategory;
}

interface ICategory {
  id: number;
  title: string;
}
