import React, { ReactNode, useEffect, useState } from 'react';
import styles from "./Gameboard.module.css";

const Gameboard = (props: any) => {

  return (
    <div className={styles.Gameboard + " " + props.className + " grid grid-cols-3 gap-5 p-5"}>
      {props.children}
    </div>
  );
};

export default Gameboard;