declare module 'smoothscroll-polyfill' {
  function polyfill(): void
}

declare type FC<P = { [key: string]: unknown }> = React.FunctionComponent<P>
