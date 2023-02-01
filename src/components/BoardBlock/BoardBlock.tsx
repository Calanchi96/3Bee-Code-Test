import React, { useEffect, useState } from 'react';
import styles from "./BoardBlock.module.css";

const BoardBlock = (props: any) => {

  return (
    <div onClick={(ev) => props.onClick(ev)} className={styles.BoardBlock + props.className + " cursor-pointer"}>
    </div>
  );
};

export default BoardBlock;