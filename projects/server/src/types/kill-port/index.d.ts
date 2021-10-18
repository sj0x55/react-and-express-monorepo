declare module 'kill-port' {
  export default function kill(port: number): Promise<void>;
}
