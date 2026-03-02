import React from "react";
import styles from "./AssetsContainer.module.css";

function AssetsContainer({ children }) {
  return (
    <div className={styles.assets__container}>
      <h3>Assets</h3>
      {children}
    </div>
  );
}

export default AssetsContainer;
