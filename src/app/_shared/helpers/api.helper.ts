export function extractID(url: string): string {
  return url
    .split('/')
    .filter((part) => part)
    .pop();
}

export function extractIDs(urls: string[]): string[] {
  return urls.map((url) =>
    url
      .split('/')
      .filter((part) => part)
      .pop()
  );
}
