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

  const relatedPosts = BLOG_POSTS.filter((item) => item.slug !== post.slug)
  const postUrl = `${baseUrl}/blog/${post.slug}`
  const publishedTime = `${post.publishDate}T00:00:00Z`
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

  return (
    <main className="relative min-h-screen overflow-hidden bg-[#eef2f5] text-[#111418]">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(articleJsonLd) }} />
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

        <section
          className="mt-8 border border-[#dbe1e7] bg-white/90 p-6"
          style={{ clipPath: 'inset(0 round 20px)' }}
        >
          <h2 className="text-2xl font-semibold text-[#111418]">Podsumowanie</h2>
          <p className="mt-3 text-base leading-relaxed text-[#3f474f]">{post.summary}</p>
        </section>

        <section className="mt-8 border border-[#dbe1e7] bg-white/85 p-6" style={{ clipPath: 'inset(0 round 20px)' }}>
          <h2 className="text-xl font-semibold text-[#111418]">Czytaj także</h2>
          <div className="mt-4 grid grid-cols-1 gap-3 md:grid-cols-2">
            {relatedPosts.map((item) => (
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
      </article>
    </main>
  )
}
