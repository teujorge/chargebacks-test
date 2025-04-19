export async function sleep(ms?: number) {
  return await new Promise((resolve) =>
    setTimeout(resolve, ms ?? Math.random() * 900 + 100)
  );
}
