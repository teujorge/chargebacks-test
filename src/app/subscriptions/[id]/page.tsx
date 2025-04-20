export default async function SubscriptionPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;

  return (
    <div className="unimplemented-page">
      <h1>{id}</h1>
      <p>This is the Subscription page. Future content will appear here.</p>
    </div>
  );
}
