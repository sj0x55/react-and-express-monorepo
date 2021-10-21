import { fetch as fetchPolyfill } from 'whatwg-fetch';

if (typeof window !== 'undefined') {
  window.fetch = fetchPolyfill;
}
