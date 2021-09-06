export interface StyleType {
    trail?: {
        background: string
    },
    slideBar?: {
        background: string
    }
}

export const styleDefault: StyleType = {
    trail: {
        background: "#eaeaea"
    },
    slideBar: {
        background: "#9bc9ff"
    }
}

export interface DataZoomControlProps {
    width: number,
    height: number,
    orientation?: "horizontal" | "vertical",
    styleConfg?: StyleType,
    onBarMove?: (starta: number, end: number) => void,
    onBarMoveEnd?: (starta: number, end: number) => void,
    onBarResize?: (starta: number, end: number) => void,
    onBarResizeEnd?: (starta: number, end: number) => void
}
