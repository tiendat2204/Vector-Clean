function formatPrice(amount: number, currency: string = "VND"): string {
    return new Intl.NumberFormat("vi-VN", {
      style: "currency",
      currency: currency,
    }).format(amount);
}

export { formatPrice };
