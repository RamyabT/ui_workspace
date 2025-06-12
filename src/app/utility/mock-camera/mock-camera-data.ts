import { Injectable } from "@angular/core";

@Injectable({
    providedIn: 'root'
})
export class MockCameraData {
    private _imageSrc: string | undefined;

    setImageSrc(imgSrc: string): void {
        this._imageSrc = imgSrc;
    }

    public getBase64ImageData(): Promise<string[]> {
        if (this._imageSrc) {
            return new Promise((resolve, reject) => {

                var img = new Image();
                img.onload = function() {
                  var canvas: HTMLCanvasElement = document.createElement('CANVAS') as HTMLCanvasElement;
                  var ctx = canvas.getContext('2d');
                  var dataURL;
              
                  const imgPaddingWidth = 94;
                  const imgPaddingHeight = 160;
          
                  canvas.height = img.naturalHeight + imgPaddingHeight;
                  canvas.width = img.naturalWidth + imgPaddingWidth;
              
                  ctx!.fillStyle = "black";
                  ctx!.fillRect(0,0, canvas.width, canvas.height);
                  ctx!.drawImage(img, imgPaddingWidth/2, imgPaddingHeight/2);
                  dataURL = canvas.toDataURL('image/jpeg');
                  resolve([dataURL.replace('data:image/jpeg;base64,', '')]);
                };
                img.src = this._imageSrc!;
              });
        } else {
            return Promise.reject('no mock image src provided');
        }
        
    }
}