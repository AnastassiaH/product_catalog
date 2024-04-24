import React, { useEffect, useState } from "react";
import ReactPaginate from "react-paginate";
import { Product } from "../../types";
import { ProductCard } from "../ProductCard";
import { useSearchParams } from "react-router-dom";
import "./PaginatedItems.scss";

type PaginatedItemsProps = {
  itemsPerPage: number;
  items: Product[];
};

export const PaginatedItems: React.FC<PaginatedItemsProps> = ({
  itemsPerPage,
  items,
}) => {
  const [searchParams, setSearchParams] = useSearchParams();
  const initialPage = searchParams.get("page");
  const itemOffset = initialPage ? (+initialPage * itemsPerPage) % items.length : 0;

  const handlePageClick = (value: number) => {
    if (+value > 0) {
      const params = new URLSearchParams(searchParams);
      params.set("page", (value + 1).toString());
      setSearchParams(params);
    }
    if (+value === 0) {
      const params = new URLSearchParams(searchParams);
      params.delete("page");
      setSearchParams(params);
    }
    // const newOffset = (value * itemsPerPage) % items.length;
    // setItemOffset(newOffset);
  };

  const endOffset = itemOffset + itemsPerPage;
  const currentItems = items.slice(itemOffset, endOffset);
  const pageCount =
    itemsPerPage > 16 ? 0 : Math.ceil(items.length / itemsPerPage);

  return (
    <>
      {currentItems &&
        currentItems.map((item: Product) => (
          <div className="itemCard" key={item.id}>
            <ProductCard product={item} />
          </div>
        ))}
      <ReactPaginate
        breakLabel="..."
        nextLabel=" "
        onPageChange={(event) => {
          handlePageClick(event.selected);
        }}
        pageCount={pageCount}
        previousLabel=" "
        renderOnZeroPageCount={null}
        marginPagesDisplayed={1}
        pageRangeDisplayed={2}
        containerClassName="pagination"
        pageClassName="pageNumber"
        pageLinkClassName="pageLink"
        activeClassName="activePage"
        forcePage={initialPage ? +initialPage - 1 : 0}
      />
    </>
  );
};
