import { useNavigation, useTable } from "@refinedev/core";
import { Link } from "react-router-dom";

export const ListProducts = () => {
  const {
    tableQueryResult: { data, isLoading },
    current,
    setCurrent,
    pageCount,
    sorters,
    setSorters,
  } = useTable({
    // inffered
    // resource: "protected-products",
    pagination: { current: 1, pageSize: 10 },
    sorters: { initial: [{ field: "id", order: "asc" }] },
    // auto query-params
    syncWithLocation: true,
  });

  const { showUrl, editUrl } = useNavigation();

  const onPrevious = () => {
    if (current > 1) {
      setCurrent(current - 1);
    }
  };

  const onNext = () => {
    if (current < pageCount) {
      setCurrent(current + 1);
    }
  };

  const onPage = (page: number) => {
    setCurrent(page);
  };

  // We'll use this function to get the current sorter for a field.
  const getSorter = (field: string) => {
    const sorter = sorters?.find((sorter) => sorter.field === field);

    if (sorter) {
      return sorter.order;
    }
  };

  // We'll use this function to toggle the sorters when the user clicks on the table headers.
  const onSort = (field: string) => {
    const sorter = getSorter(field);
    setSorters(
      sorter === "desc"
        ? []
        : [
            {
              field,
              order: sorter === "asc" ? "desc" : "asc",
            },
          ]
    );
  };

  // We'll use this object to display visual indicators for the sorters.
  const indicator = { asc: "⬆️", desc: "⬇️" };

  if (isLoading) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <h1>Products</h1>
      <table>
        <thead>
          <tr>
            <th onClick={() => onSort("id")}>
              ID {indicator[getSorter("id") || "asc"]}
            </th>
            <th onClick={() => onSort("name")}>
              Name {indicator[getSorter("name") || "asc"]}
            </th>
            <th>Category</th>
            <th onClick={() => onSort("material")}>
              Material {indicator[getSorter("material") || "asc"]}
            </th>
            <th onClick={() => onSort("price")}>
              Price {indicator[getSorter("price") || "asc"]}
            </th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {data?.data?.map((product) => (
            <tr key={product.id}>
              <td>{product.id}</td>
              <td>{product.name}</td>
              <td>{product.category?.id}</td>
              <td>{product.material}</td>
              <td>{product.price}</td>
              <td>
                <Link to={showUrl("protected-products", product.id || "")}>
                  Show
                </Link>
                <Link to={editUrl("protected-products", product.id || "")}>
                  Edit
                </Link>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <div className="pagination">
        <button type="button" onClick={onPrevious}>
          {"<"}
        </button>
        <div>
          {current - 1 > 0 && (
            <span onClick={() => onPage(current - 1)}>{current - 1}</span>
          )}
          <span className="current">{current}</span>
          {current + 1 < pageCount && (
            <span onClick={() => onPage(current + 1)}>{current + 1}</span>
          )}
        </div>
        <button type="button" onClick={onNext}>
          {">"}
        </button>
      </div>
    </div>
  );
};
