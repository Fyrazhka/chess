import React, {FC} from 'react';
import {Cell} from "../models/Cell";
interface CellProps{
    cell:Cell;
}
const CellComponent:FC<CellProps> = ({cell}) => {
    return (
        <div className={['cell', cell.color].join(' ')}>
            {cell.figure?.logo && <img src={cell.figure.logo} style={{marginTop: 8, marginLeft: 8}} alt=""/>}
        </div>
    );
};

export default CellComponent;