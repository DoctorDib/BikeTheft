declare module '*.jpg';
declare module '*.png';

declare global {
    interface ImportMeta {
        [propertyName: string]: any;
    }
}
import.meta.env;
