interface Result<T> {
  msg?: string;
  result: T | null;
  success: boolean;
  code: number;
}

interface Action<P> extends Dispatch {
  type: string;
  payload: P;
}
