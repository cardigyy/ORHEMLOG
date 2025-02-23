interface Props {
  params: Promise<{ user_id: string }>;
}

export default async function UserHistory({ params }: Props) {
  const { user_id } = await params;

  return (
    <div className="relative flex h-screen flex-col">
      <p>{`User ID: ${user_id}`}</p>
    </div>
  );
}
