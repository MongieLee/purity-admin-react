interface Result<T> {
    msg?: string;
    data: T | null;
    success: boolean;
    code: number;
}

interface Action<P> extends Dispatch{
    type: string;
    payload: P;
}