export interface Frontmatter<T> {
  frontmatter: T;
}

export interface GraphqlNode<T> {
  node: T;
}

export interface MarkdownRemark<T> {
  edges: [GraphqlNode<T>];
}

export type MarkdownMetadata<T> = MarkdownRemark<Frontmatter<T>>;
