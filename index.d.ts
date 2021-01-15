export declare class ImgClip {
  static paste(listener: function(blob)): void;
  paste(listener: function(blob)): void;  
  
  static revoke(imgurl: any): void;
  revoke(imgurl: any): void;  

  static bufferToBase64(buffer: any): string;
  bufferToBase64(buffer: any): string;

  static bufferToBytes(buffer: any): any;
  bufferToBytes(buffer: any): any;

  static imgurlToBase64(imgurl: any): Promise<any>;
  imgurlToBase64(imgurl: any): Promise<any>; 
  
  static imgurlToReadable(imgurl: any): Promise<any>;
  imgurlToReadable(imgurl: any): Promise<any>;  

  static imgurlToArrayBuffer(imgurl: any): Promise<any>;
  imgurlToArrayBuffer(imgurl: any): Promise<any>;  

  static imgurlToBytes(imgurl: any): Promise<any>;
  imgurlToBytes(imgurl: any): Promise<any>;  


  static resize2Canvas(img: any, options: any): HTMLCanvasElement;
  resize2Canvas(img: any, options: any): HTMLCanvasElement;

  static resize(img: any, options: any): string;
  resize(img: any, options: any): string;

}