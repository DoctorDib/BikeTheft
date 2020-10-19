declare module '*.jpg';
declare module '*.png';

declare global {
    interface ImportMeta {
        [propertyName: string]: any;
    }
}

// Prevents errors in the @snowpack/plugin-typescript
// any fixes  / solutions are welcome!

// import.meta.env; // errors occur when removed
