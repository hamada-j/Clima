export function returnLimit(limit: number): string {
    let str: string = `Accept only ${limit - 1} input. If you need more contacts with admin to allow it.`
    return str;
}
