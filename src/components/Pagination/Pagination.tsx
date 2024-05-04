import React from "react";
import ReactPaginate from "react-paginate";
import "./Pagination.scss";

type Props = {
  initialPage: string | null;
  handlePageClick: (v: number) => void;
  pageCount: number;
};

export const Pagination: React.FC<Props> = ({
  initialPage,
  handlePageClick,
  pageCount,
}) => {
  return (
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
  );
};
