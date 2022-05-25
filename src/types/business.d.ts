interface Result<T> {
    msg?: string;
    data: T | null;
    success: boolean;
    code: number;
}