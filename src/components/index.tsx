export type DataZoomControlProps = {
    width: number,
    height: number,
    onBarMove?: () => void,
    onBarMoveEnd?: () => void,
    onBarResize?: () => void,
    onBarResizeEnd?: () => void
}
