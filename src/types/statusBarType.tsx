export type Points = {
    maxPoints: number,
    points?: number,
    set: {
        setPoints: (_:number) => void,
        setMax?: (_:number) => void
    },
    color: string,
    darkerColor?: string
    title?: string
}