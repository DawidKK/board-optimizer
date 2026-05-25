import type { MetaFunction } from 'react-router'
import { Link } from 'react-router'

import { BLOG_POSTS, getBlogPostBySlug } from '../../src/content/blogPosts'

const baseUrl = 'https://pilsen.pl'
const ogImageUrl = `${baseUrl}/favicon.svg`

export const meta: MetaFunction = ({ params }) => {
  const post = getBlogPostBySlug(params.slug ?? '')

  if (!post) {
    const title = 'Wpis nie znaleziony | Blog PILSEN'
    const description = 'Szukany wpis blogowy nie istnieje.'
    const url = `${baseUrl}/blog`

    return [
      { title },
      { name: 'description', content: description },
      { name: 'robots', content: 'noindex,follow' },
      { tagName: 'link', rel: 'canonical', href: url },
      { property: 'og:title', content: title },
      { property: 'og:description', content: description },
      { property: 'og:type', content: 'article' },
      { property: 'og:url', content: url },
      { property: 'og:image', content: ogImageUrl },
      { name: 'twitter:card', content: 'summary' },
      { name: 'twitter:title', content: title },
      { name: 'twitter:description', content: description },
      { name: 'twitter:image', content: ogImageUrl },
    ]
  }

  const url = `${baseUrl}/blog/${post.slug}`
  const publishedTime = `${post.publishDate}T00:00:00Z`

  return [
    { title: post.metaTitle },
    { name: 'description', content: post.metaDescription },
    { name: 'robots', content: 'index,follow' },
    { tagName: 'link', rel: 'canonical', href: url },
    { property: 'og:title', content: post.metaTitle },
    { property: 'og:description', content: post.metaDescription },
    { property: 'og:type', content: 'article' },
    { property: 'og:url', content: url },
    { property: 'og:image', content: ogImageUrl },
    { property: 'article:published_time', content: publishedTime },
    { name: 'twitter:card', content: 'summary' },
    { name: 'twitter:title', content: post.metaTitle },
    { name: 'twitter:description', content: post.metaDescription },
    { name: 'twitter:image', content: ogImageUrl },
  ]
}

function formatDate(date: string) {
  return new Intl.DateTimeFormat('pl-PL', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  }).format(new Date(date))
}

export default function BlogPostRoute({ params }: { params: { slug?: string } }) {
  const post = getBlogPostBySlug(params.slug ?? '')

  if (!post) {
    throw new Response('Nie znaleziono wpisu.', { status: 404 })
  }

  const candidates = BLOG_POSTS.filter((item) => item.slug !== post.slug)
  const pickByIntent = (intent: 'TOFU' | 'MOFU' | 'BOFU', count: number) =>
    candidates.filter((item) => item.intent === intent).slice(0, count)
  const relatedPosts = [
    ...pickByIntent('TOFU', 2),
    ...pickByIntent('MOFU', 1),
    ...pickByIntent('BOFU', 1),
  ]
  const fallbackRelated = candidates.filter((item) => !relatedPosts.some((selected) => selected.slug === item.slug))
  const resolvedRelatedPosts = [...relatedPosts, ...fallbackRelated].slice(0, 4)
  const postUrl = `${baseUrl}/blog/${post.slug}`
  const publishedTime = `${post.publishDate}T00:00:00Z`
  const hasFaq = Boolean(post.faq && post.faq.length > 0)
  const articleJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'BlogPosting',
    headline: post.title,
    description: post.metaDescription,
    datePublished: publishedTime,
    dateModified: publishedTime,
    inLanguage: 'pl-PL',
    mainEntityOfPage: postUrl,
    image: [ogImageUrl],
    author: {
      '@type': 'Organization',
      name: 'PILSEN',
    },
    publisher: {
      '@type': 'Organization',
      name: 'PILSEN',
      logo: {
        '@type': 'ImageObject',
        url: ogImageUrl,
      },
    },
  }
  const faqJsonLd = hasFaq
    ? {
        '@context': 'https://schema.org',
        '@type': 'FAQPage',
        mainEntity: post.faq?.map((item) => ({
          '@type': 'Question',
          name: item.question,
          acceptedAnswer: {
            '@type': 'Answer',
            text: item.answer,
          },
        })),
      }
    : null
  const breadcrumbJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      { '@type': 'ListItem', position: 1, name: 'Strona główna', item: `${baseUrl}/` },
      { '@type': 'ListItem', position: 2, name: 'Blog', item: `${baseUrl}/blog` },
      { '@type': 'ListItem', position: 3, name: post.title, item: postUrl },
    ],
  }

  return (
    <main className="relative min-h-screen overflow-hidden bg-[#eef2f5] text-[#111418]">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(articleJsonLd) }} />
      {faqJsonLd ? (
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }} />
      ) : null}
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }} />
      <div
        className="pointer-events-none absolute inset-0"
        style={{
          backgroundImage:
            'linear-gradient(to right, rgba(17,20,24,0.07) 1px, transparent 1px), linear-gradient(to bottom, rgba(17,20,24,0.07) 1px, transparent 1px)',
          backgroundSize: '56px 56px',
        }}
      />

      <article className="relative mx-auto w-full max-w-4xl px-6 pt-12 pb-16 md:px-10">
        <header className="space-y-4 border border-[#dbe1e7] bg-white/85 p-6" style={{ clipPath: 'inset(0 round 22px)' }}>
          <p className="text-xs font-medium tracking-wide text-[#5b646d] uppercase">
            {formatDate(post.publishDate)}
          </p>
          <h1 className="text-4xl leading-tight font-semibold tracking-tight text-[#111418] md:text-5xl">
            {post.title}
          </h1>
          <p className="text-base leading-relaxed text-[#3f474f] md:text-lg">{post.lead}</p>
        </header>

        {post.quickAnswer ? (
          <section
            className="mt-8 border border-[#dbe1e7] bg-white/90 p-6"
            style={{ clipPath: 'inset(0 round 20px)' }}
          >
            <h2 className="text-2xl font-semibold text-[#111418]">Quick Answer</h2>
            <p className="mt-3 text-base leading-relaxed text-[#3f474f]">{post.quickAnswer}</p>
          </section>
        ) : null}

        <section className="mt-8 space-y-6">
          {post.sections.map((section) => (
            <section
              key={section.heading}
              className="border border-[#dbe1e7] bg-white/80 p-6"
              style={{ clipPath: 'inset(0 round 20px)' }}
            >
              <h2 className="text-2xl font-semibold text-[#111418]">{section.heading}</h2>
              <div className="mt-3 space-y-3 text-base leading-relaxed text-[#3f474f]">
                {section.paragraphs.map((paragraph) => (
                  <p key={paragraph}>{paragraph}</p>
                ))}
              </div>
            </section>
          ))}
        </section>

        {post.decisionTable ? (
          <section
            className="mt-8 border border-[#dbe1e7] bg-white/90 p-6"
            style={{ clipPath: 'inset(0 round 20px)' }}
          >
            <h2 className="text-2xl font-semibold text-[#111418]">{post.decisionTable.caption}</h2>
            <div className="mt-4 overflow-x-auto">
              <table className="w-full min-w-[640px] border-collapse text-left text-sm text-[#3f474f]">
                <thead>
                  <tr>
                    {post.decisionTable.columns.map((column) => (
                      <th key={column} className="border border-[#dbe1e7] bg-[#f8fafc] px-3 py-2 font-semibold text-[#111418]">
                        {column}
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {post.decisionTable.rows.map((row, index) => (
                    <tr key={`${row.join('-')}-${index}`}>
                      {row.map((cell, cellIndex) => (
                        <td key={`${cell}-${cellIndex}`} className="border border-[#dbe1e7] px-3 py-2 align-top">
                          {cell}
                        </td>
                      ))}
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </section>
        ) : null}

        <section
          className="mt-8 border border-[#dbe1e7] bg-white/85 p-6"
          style={{ clipPath: 'inset(0 round 20px)' }}
        >
          <h2 className="text-2xl font-semibold text-[#111418]">Najczęstsze błędy</h2>
          <ul className="mt-4 list-disc space-y-2 pl-5 text-base text-[#3f474f]">
            {post.mistakes.map((mistake) => (
              <li key={mistake}>{mistake}</li>
            ))}
          </ul>
        </section>

        <section
          className="mt-8 border border-[#dbe1e7] bg-white/85 p-6"
          style={{ clipPath: 'inset(0 round 20px)' }}
        >
          <h2 className="text-2xl font-semibold text-[#111418]">Checklista przed cięciem</h2>
          <ul className="mt-4 list-disc space-y-2 pl-5 text-base text-[#3f474f]">
            {post.checklist.map((item) => (
              <li key={item}>{item}</li>
            ))}
          </ul>
        </section>

        {hasFaq ? (
          <section
            className="mt-8 border border-[#dbe1e7] bg-white/90 p-6"
            style={{ clipPath: 'inset(0 round 20px)' }}
          >
            <h2 className="text-2xl font-semibold text-[#111418]">FAQ</h2>
            <div className="mt-4 space-y-4">
              {post.faq?.map((item) => (
                <article key={item.question} className="border border-[#dbe1e7] bg-[#f8fafc] p-4">
                  <h3 className="text-lg font-semibold text-[#111418]">{item.question}</h3>
                  <p className="mt-2 text-base leading-relaxed text-[#3f474f]">{item.answer}</p>
                </article>
              ))}
            </div>
          </section>
        ) : null}

        <section
          className="mt-8 border border-[#dbe1e7] bg-white/90 p-6"
          style={{ clipPath: 'inset(0 round 20px)' }}
        >
          <h2 className="text-2xl font-semibold text-[#111418]">{post.conclusion ? 'Wniosek' : 'Podsumowanie'}</h2>
          <p className="mt-3 text-base leading-relaxed text-[#3f474f]">{post.conclusion ?? post.summary}</p>
        </section>

        <section className="mt-8 border border-[#dbe1e7] bg-white/85 p-6" style={{ clipPath: 'inset(0 round 20px)' }}>
          <h2 className="text-xl font-semibold text-[#111418]">Czytaj także</h2>
          <div className="mt-4 grid grid-cols-1 gap-3 md:grid-cols-2">
            {resolvedRelatedPosts.map((item) => (
              <Link
                key={item.slug}
                to={`/blog/${item.slug}`}
                className="border border-[#dbe1e7] bg-[#f8fafc] px-4 py-3 text-sm font-medium text-[#2f3a44] transition-colors hover:bg-[#eef2f6]"
                style={{ clipPath: 'inset(0 round 12px)' }}
              >
                {item.title}
              </Link>
            ))}
          </div>
          <Link
            to="/blog"
            className="mt-5 inline-flex w-fit items-center border border-[#ff7a1a] bg-[#ff7a1a] px-4 py-2 text-sm font-semibold text-white transition-colors hover:bg-[#ea6f17]"
            style={{ clipPath: 'inset(0 round 12px)' }}
          >
            Wróć do listy poradników
          </Link>
        </section>

        <section className="mt-8 border border-[#dbe1e7] bg-white/85 p-6" style={{ clipPath: 'inset(0 round 20px)' }}>
          <h2 className="text-xl font-semibold text-[#111418]">Landingi materiałowe</h2>
          <p className="mt-2 text-sm leading-relaxed text-[#3f474f]">
            Jeśli pracujesz na konkretnym materiale, przejdź do dedykowanych poradników z praktycznymi ustawieniami.
          </p>
          <div className="mt-4 grid grid-cols-1 gap-3 md:grid-cols-2">
            <Link
              to="/rozkroj-plyt-mdf"
              className="border border-[#dbe1e7] bg-[#f8fafc] px-4 py-3 text-sm font-medium text-[#2f3a44] transition-colors hover:bg-[#eef2f6]"
              style={{ clipPath: 'inset(0 round 12px)' }}
            >
              Rozkrój płyt MDF
            </Link>
            <Link
              to="/rozkroj-sklejki"
              className="border border-[#dbe1e7] bg-[#f8fafc] px-4 py-3 text-sm font-medium text-[#2f3a44] transition-colors hover:bg-[#eef2f6]"
              style={{ clipPath: 'inset(0 round 12px)' }}
            >
              Rozkrój sklejki
            </Link>
          </div>
        </section>

        <section className="mt-8 border border-[#dbe1e7] bg-white/85 p-6" style={{ clipPath: 'inset(0 round 20px)' }}>
          <h2 className="text-xl font-semibold text-[#111418]">Słownik pojęć</h2>
          <p className="mt-2 text-sm leading-relaxed text-[#3f474f]">
            Uporządkuj terminy techniczne i przejdź do krótkich definicji z przykładami praktycznymi.
          </p>
          <div className="mt-4 grid grid-cols-1 gap-3 md:grid-cols-2">
            <Link
              to="/slownik/kerf"
              className="border border-[#dbe1e7] bg-[#f8fafc] px-4 py-3 text-sm font-medium text-[#2f3a44] transition-colors hover:bg-[#eef2f6]"
              style={{ clipPath: 'inset(0 round 12px)' }}
            >
              Kerf
            </Link>
            <Link
              to="/slownik/nesting-cnc"
              className="border border-[#dbe1e7] bg-[#f8fafc] px-4 py-3 text-sm font-medium text-[#2f3a44] transition-colors hover:bg-[#eef2f6]"
              style={{ clipPath: 'inset(0 round 12px)' }}
            >
              Nesting CNC
            </Link>
            <Link
              to="/slownik/cutlist"
              className="border border-[#dbe1e7] bg-[#f8fafc] px-4 py-3 text-sm font-medium text-[#2f3a44] transition-colors hover:bg-[#eef2f6]"
              style={{ clipPath: 'inset(0 round 12px)' }}
            >
              Cutlist
            </Link>
            <Link
              to="/slownik/uslojenie-plyty"
              className="border border-[#dbe1e7] bg-[#f8fafc] px-4 py-3 text-sm font-medium text-[#2f3a44] transition-colors hover:bg-[#eef2f6]"
              style={{ clipPath: 'inset(0 round 12px)' }}
            >
              Usłojenie płyty
            </Link>
          </div>
        </section>
      </article>
    </main>
  )
}
