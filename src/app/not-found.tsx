import Link from "next/link";

export default function NotFound() {
  return (
    <div className="flex h-full w-full flex-col items-center justify-center gap-8">
      <div className="flex flex-row items-center justify-center gap-4">
        <h1 className="text-2xl font-semibold">404</h1>
        <div className="bg-muted-foreground h-1 w-1 rounded-full" />
        <h2 className="text-muted-foreground">This page could not be found.</h2>
      </div>

      <Link
        href="/"
        className="text-foreground text hover:text-foreground bg-accent rounded-lg px-3 py-2"
      >
        Go back to home
      </Link>
    </div>
  );
}
