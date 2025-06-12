import { Injectable } from '@angular/core';
import { CameraPreview, CameraPreviewOptions, CameraPreviewPictureOptions } from '@awesome-cordova-plugins/camera-preview/ngx';
import { Camera, CameraOptions } from '@awesome-cordova-plugins/camera/ngx';

@Injectable({
  providedIn: 'root'
})
export class CameraService {
  toolTip: any
  startIcon:any
  defaultCameraOptions: CameraOptions;
  public picture: any;
  private pictureOpts: CameraPreviewPictureOptions = {
    width: 1280,
    height: 1280,
    quality: 72
  }
  defaultCameraPreviewOptions: CameraPreviewOptions = {
    x: 0,
    y: 0,
    width: 200,
    height: 200,
    toBack: false,
    previewDrag: false,
    tapPhoto: false,
    storeToFile: false,
    camera: 'rear'
  }

  defaultCameraPreviewPictureOptions: CameraPreviewPictureOptions = {
    width: 1024,
    height: 1024,
    quality: 85
  }

  cameraPreviewOpts = {
    x: 0,
    y: 0,
    width: window.screen.width,
    height: window.screen.height,
    camera: this._cameraPreview.CAMERA_DIRECTION.BACK,  // Front/back camera
    toBack: true,   // Set to true if you want your html in front of your preview
    tapPhoto: false,  // Tap to take photo
    tapFocus: true,   // Tap to focus
    previewDrag: false,
    storeToFile: false
  }
  callbackMethod: any;
  skipStartFrame: boolean = false;
  skipImageConfirmation: boolean = false;
  constructor(
    private _camera: Camera,
    private _cameraPreview: CameraPreview,
  ) {
    this.defaultCameraOptions = {
      quality: 100,
      destinationType: this._camera.DestinationType.FILE_URI,
      encodingType: this._camera.EncodingType.JPEG,
      sourceType: this._camera.PictureSourceType.PHOTOLIBRARY,
      mediaType: this._camera.MediaType.PICTURE
    }
  }

  getPicture(options: CameraOptions): Promise<any> {
    let cameraOptions = {
      ...this.defaultCameraOptions,
      ...options
    };
    return this._camera.getPicture(cameraOptions);
  }

  takePicture(options: CameraPreviewPictureOptions): Promise<any> {
    let previewPictureOptions = {
      ...this.defaultCameraPreviewPictureOptions,
      ...options
    };
    return this._cameraPreview.takePicture(options);
  }

  startCameraWithFrame(toolTip: any,startIcon:any, callback: any) {
    if (toolTip) this.toolTip = toolTip
    if (startIcon) this.startIcon = startIcon
    if (callback) this.callbackMethod = callback;
    this.takePicWithFrame();
  }

  takePicWithFrame() {
    this._cameraPreview.startCamera(this.cameraPreviewOpts);

    document.body.classList.add('camera-preview-mode');
    var bodyContent: any = document.getElementsByTagName('app-root')[0];
    bodyContent["style"].visibility = "hidden";

    // Create a rectangle & buttons
    var rect = document.createElement('div');
    var photohint = document.createElement('div');
    var start_frame_btn = document.createElement('button');
    start_frame_btn.type = "button";
    start_frame_btn.name = "startFrame";
    start_frame_btn.value = "startFrame";

    var take_pic_btn = document.createElement('button');
    take_pic_btn.type = "button";
    take_pic_btn.name = "takePicture";
    take_pic_btn.value = "takePicture";

    var use_pic_btn = document.createElement('button');
    use_pic_btn.type = "button";
    use_pic_btn.name = "usePicture";
    use_pic_btn.value = "usePicture";

    var retake_pic_btn = document.createElement('button');
    retake_pic_btn.type = "button";
    retake_pic_btn.name = "reTakePicture";
    retake_pic_btn.value = "reTakePicture";

    var close_frame_btn = document.createElement('button');
    close_frame_btn.type = "button";
    close_frame_btn.name = "closeFrame";
    close_frame_btn.value = "closeFrame";

    photohint.innerHTML = this.toolTip
    start_frame_btn.innerHTML= this.startIcon

    // Add styles
    rect.className += 'camera-preview-div';
    photohint.className += 'photo_hint_class'
    start_frame_btn.className += 'start_frame_class'
    take_pic_btn.className += 'take_pic_class';
    use_pic_btn.className += 'use_pic_class';
    retake_pic_btn.className += 'retake_pic_class';
    close_frame_btn.className += 'close_frame_class';
    // Append to body section
    document.body.appendChild(rect);
    document.body.appendChild(start_frame_btn);
    document.body.appendChild(take_pic_btn);
    document.body.appendChild(use_pic_btn);
    document.body.appendChild(retake_pic_btn);
    document.body.appendChild(close_frame_btn);
    rect.appendChild(photohint)

    take_pic_btn.style.visibility = 'hidden';
    use_pic_btn.style.visibility = 'hidden';
    retake_pic_btn.style.visibility = 'hidden';

    var croppedBase64Img = "";

    // Get rectangle coordinates
    var rect_coords: any;
    var x_coord: any;
    var y_coord: any;

    var _this = this;

    close_frame_btn.onclick = function () {
      _this._cameraPreview.stopCamera();
      document.body.classList.remove('camera-preview-mode');
      bodyContent["style"].visibility = "visible";
      rect.remove()
      start_frame_btn.remove()
      take_pic_btn.remove()
      use_pic_btn.remove()
      retake_pic_btn.remove()
      close_frame_btn.remove()
    }

    start_frame_btn.onclick = function () {
      photohint.style.visibility = 'hidden'
      start_frame_btn.style.visibility = 'hidden';
      take_pic_btn.style.visibility = 'visible';
      rect.style.background = 'rgba(255, 255, 255, 0)';
      rect.style.top = '10%'
      rect.style.bottom = '10%'
      rect.style.right = '12%'
      rect.style.left = '12%'
      rect.style.boxShadow = '0 0 500px 5000px rgba(0, 0, 0, 0.5)'
      rect_coords = rect.getBoundingClientRect()
      x_coord = rect_coords.left, y_coord = rect_coords.top;
    }

    if ( this.skipStartFrame) {
      start_frame_btn.click();
    }

    take_pic_btn.onclick = function () {
      // Get rectangle size
      var rect_width = rect.offsetWidth,
        rect_height = rect.offsetHeight;

      // take a picture
      _this._cameraPreview.takePicture(_this.pictureOpts).then((imageData) => {
        _this._cameraPreview.stopCamera();
        _this.picture = imageData[0];

        _this.crop(_this.picture, rect_width, rect_height, x_coord, y_coord, function (cropped_img_base64: any) {
          croppedBase64Img = cropped_img_base64;

          if (!_this.skipImageConfirmation) {
            rect.style.visibility = 'visible';
            take_pic_btn.style.visibility = 'hidden';
            rect.style.backgroundImage = "url(" + cropped_img_base64 + ")";
            rect.classList.add('camera-preview-img');

            use_pic_btn.style.visibility = 'visible';
            retake_pic_btn.style.visibility = 'visible';
          } else {
            rect.style.visibility = 'hidden';
            take_pic_btn.style.visibility = 'hidden';
            use_pic_btn.style.visibility = 'hidden';
            retake_pic_btn.style.visibility = 'hidden';
            use_pic_btn.click();
          }
        });

      }, (err) => {
        console.log(err);
        document.body.classList.remove('camera-preview-mode');
      });
    };

    retake_pic_btn.onclick = function () {
      rect.remove()
      start_frame_btn.remove()
      take_pic_btn.remove()
      use_pic_btn.remove()
      retake_pic_btn.remove()
      close_frame_btn.remove()
      document.body.classList.remove('camera-preview-mode');

      _this.takePicWithFrame();
    };

    use_pic_btn.onclick = function () {
      document.body.classList.remove('camera-preview-mode');
      rect.remove()
      start_frame_btn.remove()
      take_pic_btn.remove()
      use_pic_btn.remove()
      retake_pic_btn.remove()
      close_frame_btn.remove()


      _this.rotate(croppedBase64Img, 270, function (rotatedImgData: any) {
        bodyContent["style"].visibility = "visible";
        document.body.classList.remove('camera-preview-mode');
        _this.resizeImage(rotatedImgData, function (imgData: any) {
          if (_this.callbackMethod) _this.callbackMethod(imgData);
        }, { width: 1600, height: 1200 });
      });
    }
  }

  resizeImage(base64Str: any, callback: any, dimension: any = undefined) {
    var img = new Image();

    img.onload = function () {
      var canvas = document.createElement('canvas');
      var MAX_WIDTH = (dimension) ? dimension.width : 200;
      var MAX_HEIGHT = (dimension) ? dimension.height : 200;
      var width = img.width;
      var height = img.height;

      if (width > height) {
        if (width > MAX_WIDTH) {
          height *= MAX_WIDTH / width;
          width = MAX_WIDTH;
        }
      } else {
        if (height > MAX_HEIGHT) {
          width *= MAX_HEIGHT / height;
          height = MAX_HEIGHT;
        }
      }
      canvas.width = width;
      canvas.height = height;
      var ctx: any = canvas.getContext('2d');
      ctx.drawImage(img, 0, 0, width, height);
      callback(canvas.toDataURL("image/jpeg"));
    }
    img.src = base64Str;
  }

  rotate(srcBase64: any, degrees: any, callback: any) {
    const canvas = document.createElement('canvas');
    let ctx: any = canvas.getContext("2d");
    let image = new Image();

    image.onload = function () {
      canvas.width = degrees % 180 === 0 ? image.width : image.height;
      canvas.height = degrees % 180 === 0 ? image.height : image.width;

      ctx.translate(canvas.width / 2, canvas.height / 2);
      ctx.rotate(degrees * Math.PI / 180);
      ctx.drawImage(image, image.width / -2, image.height / -2);

      callback(canvas.toDataURL());
    };

    image.src = srcBase64;
  }


  crop(base64PictureData: any, rect_width: any, rect_height: any, x_coord: any, y_coord: any, callback: any) {

    // image variable will contain ORIGINAL image
    var image = new Image();

    // canvas variable will contain CROPPED image
    var canvas = document.createElement('canvas');
    var ctx: any = canvas.getContext('2d');

    // Load original image onto image object
    image.src = 'data:image/png;base64,' + base64PictureData;
    image.onload = function () {

      // Map rectangle onto image taken
      var x_axis_scale = image.width / window.screen.width
      var y_axis_scale = image.height / window.screen.height
      // INTERPOLATE
      var x_coord_int = x_coord * x_axis_scale;
      var y_coord_int = y_coord * y_axis_scale;
      var rect_width_int = rect_width * x_axis_scale;
      var rect_height_int = rect_height * y_axis_scale

      // Set canvas size equivalent to cropped image size
      canvas.width = rect_width_int;
      canvas.height = rect_height_int;

      ctx.drawImage(image,
        x_coord_int, y_coord_int,           // Start CROPPING from x_coord(interpolated) and y_coord(interpolated)
        rect_width_int, rect_height_int,    // Crop interpolated rectangle
        0, 0,                               // Place the result at 0, 0 in the canvas,
        rect_width_int, rect_height_int);   // Crop interpolated rectangle

      // Get base64 representation of cropped image
      var cropped_img_base64 = canvas.toDataURL();

      // Now we are ready to send cropped image TO SERVER
      callback(cropped_img_base64);

      return cropped_img_base64;
    };
  }

  /**
   * 
   * @param options 
   * The camera will launch in respected x,y, width & height in front of the document
   */
  startCameraAbove(options: CameraPreviewOptions): Promise<any> {
    let cameraOptions = {
      ...this.defaultCameraPreviewOptions,
      ...options
    };
    return this._cameraPreview.startCamera(cameraOptions);
  }

  /**
   * 
   * @param options 
   * The camera will launch background of document
   */
  startCameraBelow(options: CameraPreviewOptions) {
    document.querySelector('html')?.classList.add('camera-preview-mode');
    let cameraOptions: CameraPreviewOptions = {
      x: 0, y: 0,
      width: window.screen.width,
      height: window.screen.height,
      camera: "front",
      tapPhoto: false,
      previewDrag: false,
      toBack: true,
      storeToFile: false
    };
    this._cameraPreview.startCamera(cameraOptions);
  }

  /**
   * To stop the launched camera
   */
  stopCamera() {
    document.querySelector('html')?.classList.remove('camera-preview-mode');
    try {
      this._cameraPreview.stopCamera();
    } catch (err) {
      console.log("No camera launched...");
    }
  }

  /**
   * 
   * @param base64PictureData 
   * @param rect_width 
   * @param rect_height 
   * @param callback 
   */
  cropImage(base64PictureData: string, rect_width: number, rect_height: number, callback: { (cropedImgData: any): void; (arg0: string): void; }) {

    // image will contain ORIGINAL image
    let image = new Image();

    // image will contain CROPPED image
    let canvas = document.createElement('canvas');
    let ctx: any = canvas.getContext('2d');

    // Load original image into image element
    image.src = 'data:image/jpeg;base64,' + base64PictureData;
    image.onload = function () {

      let scaleHeight = rect_height / image.height;
      let scaleWidth = rect_width / image.width;

      let scale;
      let x_img_units;
      let y_img_units;
      if (scaleHeight < scaleWidth) {
        scale = scaleWidth;
        x_img_units = 0;
        y_img_units = (image.height - (rect_height / scale)) / 2;
      } else {
        scale = scaleHeight;
        x_img_units = (image.width - (rect_width / scale)) / 2;
        y_img_units = 0;
      }

      let rect_width_img_units = rect_width / scale;
      let rect_height_img_units = rect_height / scale;

      // Set canvas size equivalent to interpolated rectangle size
      canvas.width = rect_width_img_units;
      canvas.height = rect_height_img_units;

      ctx.drawImage(image,
        x_img_units, y_img_units,                       // Start CROPPING from (x_img_units, y_img_units).
        rect_width_img_units, rect_height_img_units,    // Crop interpolated rectangle
        0, 0,                                           // Place the result at 0, 0 in the canvas,
        rect_width_img_units, rect_height_img_units);   // Crop interpolated rectangle

      // Get base64 representation of cropped image
      let cropped_img_base64 = canvas.toDataURL();

      // Now we are ready to send cropped image TO SERVER
      callback(cropped_img_base64);

      return cropped_img_base64;
    };
  }

}

export interface CBXCameraOption extends CameraPreviewOptions { }
export interface CBXPictureOption extends CameraPreviewPictureOptions { }
