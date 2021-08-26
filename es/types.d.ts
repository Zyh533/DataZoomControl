import * as React from 'react';

export interface DataZoomControlProps {
    width: number,
    height: number,
    onBarMove?: () => void,
    onBarMoveEnd?: () => void,
    onBarResize?: () => void,
    onBarResizeEnd?: () => void
}

declare const _default: React.NamedExoticComponent<DataZoomControlProps>;
export default _default;
