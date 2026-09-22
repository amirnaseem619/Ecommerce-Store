export default function InfoPage({ title, body }) {
  return (
    <div className="mx-auto max-w-3xl px-4 py-14 lg:px-6">
      <h1 className="font-serif text-4xl text-navy">{title}</h1>
      <p className="mt-4 text-sm leading-relaxed text-slate-600">{body}</p>
    </div>
  )
}
