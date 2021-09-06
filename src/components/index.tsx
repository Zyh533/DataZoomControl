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
    onBarMove?: () => void,
    onBarMoveEnd?: () => void,
    onBarResize?: () => void,
    onBarResizeEnd?: () => void
}
