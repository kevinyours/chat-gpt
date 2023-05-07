interface FetherProps {
  url: string;
  payload: any;
}

async function fetcher({ url, payload }: FetherProps) {
  return fetch(url, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(payload),
    mode: 'cors',
    cache: 'no-cache',
    credentials: 'same-origin',
  });
}

export default fetcher;
