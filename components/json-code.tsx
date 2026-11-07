import type { ReactNode } from "react";

// Match JSON strings (including escapes), numbers, literals, and punctuation.
const jsonToken =
  /"(?:\\.|[^"\\])*"|-?\d+(?:\.\d+)?(?:[eE][+-]?\d+)?|\b(?:true|false|null)\b|[{}\[\]:,]/g;

export function JsonCode({ value }: { value: string }) {
  const tokens: ReactNode[] = [];
  let cursor = 0;

  for (const match of value.matchAll(jsonToken)) {
    const token = match[0];
    const index = match.index;
    const isKey =
      token.startsWith('"') &&
      value
        .slice(index + token.length)
        .trimStart()
        .startsWith(":");
    let kind = "punctuation";

    if (isKey) kind = "key";
    else if (token.startsWith('"')) kind = "string";
    else if (/^-?\d/.test(token)) kind = "number";
    else if (token === "true" || token === "false") kind = "boolean";
    else if (token === "null") kind = "null";

    tokens.push(value.slice(cursor, index));
    tokens.push(
      <span className={`json-${kind}`} key={index}>
        {token}
      </span>,
    );
    cursor = index + token.length;
  }

  tokens.push(value.slice(cursor));

  return <code>{tokens}</code>;
}
