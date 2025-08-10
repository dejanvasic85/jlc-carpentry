export default async function ServicePage({ params }: { params: Promise<{ serviceName: string }> }) {
  const { serviceName } = await params;

  return (
    <div>
      <h1>Service: {serviceName}</h1>
    </div>
  );
}
