// @toast-ui/editor ships its typings outside of the package.json "exports"
// map, so TypeScript's bundler resolution cannot find them on its own. The
// "toast-ui-editor-types" alias is a tsconfig path that points at them; it is
// only ever used from this type-level declaration, never at runtime.
declare module '@toast-ui/editor' {
  export * from 'toast-ui-editor-types';
  export { default } from 'toast-ui-editor-types';
}
