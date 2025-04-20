export default async function CollectionPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;

  return (
    <div className="unimplemented-page">
      <h1>{id}</h1>
      <p>This is the Collection page. Future content will appear here.</p>
    </div>
  );
}
