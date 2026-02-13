import React, { useEffect, useState } from "react";
import styles from "./Pagination.module.css";
function Pagination({ page, setPage }) {
  return (
    <div className={styles.pagination}>
      <button
        className={styles.paginationBtn}
        disabled={page === 1}
        onClick={() => setPage((page) => page - 1)}
      >
        &lt;
      </button>
      <span>{page}</span>
      <button
        className={styles.paginationBtn}
        onClick={() => setPage((page) => page + 1)}
      >
        &gt;
      </button>
    </div>
  );
}

export default Pagination;
