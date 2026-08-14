const formatter = new Intl.NumberFormat("en-CA", {
    style: "currency",
    currency: "CAD",
});

export function formatCAD(amount: number): string {
    return formatter.format(amount);
}
