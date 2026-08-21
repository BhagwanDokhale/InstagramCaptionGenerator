declare module 'btch-downloader' {
  export interface BaseResponse {
    developer?: string;
    status?: boolean | string;
    message?: string;
    note?: string;
    code?: number;
  }

  export interface InstagramApiItem {
    thumbnail: string;
    url: string;
  }

  export interface InstagramResponse extends BaseResponse {
    result?: InstagramApiItem[];
  }

  export function igdl(url: string): Promise<InstagramResponse>;
  
  export function ttdl(url: string): Promise<any>;
  export function twitter(url: string): Promise<any>;
  export function youtube(url: string): Promise<any>;
  export function fbdown(url: string): Promise<any>;
}

declare module '*.jpg' {
  const content: string;
  export default content;
}

declare module '*.jpeg' {
  const content: string;
  export default content;
}

declare module '*.png' {
  const content: string;
  export default content;
}

declare module '*.svg' {
  const content: string;
  export default content;
}

declare module '*.webp' {
  const content: string;
  export default content;
}

