export declare class ImgClip {
  static paste(listener: function(blob)): void;
  paste(listener: function(blob)): void;  
  
  static bufferToBase64(buffer: any): string;
  bufferToBase64(buffer: any): string;
  
  static imgurlToBase64(imgurl: any): Promise<any>;
  imgurlToBase64(imgurl: any): Promise<any>; 
  
  static imgurlToReadable(imgurl: any): Promise<any>;
  imgurlToReadable(imgurl: any): Promise<any>;  

  static imgurlToArrayBuffer(imgurl: any): Promise<any>;
  imgurlToArrayBuffer(imgurl: any): Promise<any>;  
}