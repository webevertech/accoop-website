import { redirect } from 'next/navigation'

export default async function LegacyPartnerPage({
  params,
}: {
  params: Promise<{ id: string }>
}) {
  const { id } = await params
  redirect(`/partners/${id}`)
}
