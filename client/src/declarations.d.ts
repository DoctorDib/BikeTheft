declare global {
    interface ImportMeta {
        [propertyName: string]: string | number;
    }
}

// Prevents errors in the @snowpack/plugin-typescript
// any fixes  / solutions are welcome!

// import.meta.env; // errors occur when removed
