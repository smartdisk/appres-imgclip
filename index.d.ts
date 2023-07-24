export declare class ImgClip {
  static paste(listener: (url: any) => any): object;
  paste(listener: (url: any) => any): object;  

  static release(paster: object): void;
  release(paster: object): void;  

  static createUrl(blob: any): string;
  createUrl(blob: any): string;  

  static revoke(imgurl: any): void;
  revoke(imgurl: any): void;  

  static bufferToBase64(buffer: any): string;
  bufferToBase64(buffer: any): string;

  static bufferToBytes(buffer: any): any;
  bufferToBytes(buffer: any): any;

  static bufferToArray(buffer: any): any;
  bufferToArray(buffer: any): any;


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