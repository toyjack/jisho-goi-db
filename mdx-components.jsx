// This file allows you to provide custom React components
// to be used in MDX files. You can import and use any
// React component you want, including components from
// other libraries.
function h1({ children }) {
  return <h1 className="text-4xl font-bold">{children}</h1>;
}

function h2({ children }) {
  return <h2 className="text-3xl font-bold">{children}</h2>;
}

function p ({ children }) {
  return <p className="text-lg text-base-content">{children}</p>;
}

export function useMDXComponents(components) {
  return { h1, h2,p, ...components };
}