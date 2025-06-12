export interface ICameraPreviewOptions {
    x: number
    y: number
    width: number,
    height: number,
    toBack: boolean,
    previewDrag: boolean,
    tapPhoto: boolean,
    storeToFile: boolean,
    camera: 'rear' | 'front'
}