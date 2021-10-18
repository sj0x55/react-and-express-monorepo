import { HttpMethod } from "@react-and-express/enums";

const timeoutOfPromise = <T>(ms: number, promise: Promise<T>): Promise<T> => {
  return new Promise(function (resolve, reject) {
    setTimeout(function () {
      reject(new Error('timeout'));
    }, ms);

    promise.then(resolve, reject);
  });
};

const fetchData = async <T>(method: string, url: string): Promise<T> => {
  const fetchDataFromUrl = async (url: string) => {
    const timeout = method === HttpMethod.GET ? 2000 : 10000;
    const time = new Date().getTime();

    return (await timeoutOfPromise<Response>(timeout, fetch(`${url}?t=${time}`, { method }))).json();
  };

  return await fetchDataFromUrl(url);
};

export const GET = async <T>(url: string) => await fetchData<T>(HttpMethod.GET, url);
export const POST = async <T>(url: string) => await fetchData<T>(HttpMethod.POST, url);
export const PUT = async <T>(url: string) => await fetchData<T>(HttpMethod.PUT, url);
