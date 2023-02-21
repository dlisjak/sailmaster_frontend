import React, { Fragment, useCallback, useState } from 'react';
import { useRouter } from 'next/router';
import Head from 'next/head';
import Link from 'next/link';
import Image from 'next/image';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import { useTranslation } from 'next-i18next';
import { Row, Col } from 'react-bootstrap';
import InfiniteScroll from 'react-infinite-scroller';

import FilterSideWrapper from '../../components/common/FilterSideWrapper';
import getBlogLink from '../../components/common/utils/getBlogLink';
import { getBlogs, getFromApi } from '../../queries/getters';
import nextI18nextConfig from '../../next-i18next.config';
import Loader from '../../components/Loader';

const Blog = ({ results, next }) => {
  const { t } = useTranslation('common');
  const router = useRouter();
  const [blogs, setBlogs] = useState(results);
  const [loadNext, setLoadNext] = useState(next);

  const handleLoadMore = useCallback(async () => {
    const { data } = await getFromApi(loadNext);
    setBlogs((prev) => [...new Set([...prev, ...data.results])]);
    setLoadNext(data.next);
  }, [loadNext]);

  return (
    <FilterSideWrapper location={router.pathname} FilterSideWrapperClassName="background-white">
      <Head>
        <title>{t('blog_seo_title')}</title>
        <meta name="description" content={t('blog_seo_desc')} />
        <meta property="og:title" content={t('blog_seo_title')} />
        <meta property="og:description" content={t('blog_seo_desc')} />
      </Head>
      <div className="blog mt-0 pb-8">
        <Row>
          <Col xs={12} sm={12}>
            <div className="col-inner">
              <h1>{t('blog')}</h1>
              {blogs?.length > 0 && (
                <InfiniteScroll
                  pageStart={0}
                  loadMore={handleLoadMore}
                  hasMore={!!loadNext}
                  loader={<Loader key={0} />}
                  threshold={1200}
                >
                  {blogs?.map((item, idx) => (
                    <Fragment key={`blog-${item.slug}--${idx}`}>
                      <div className="blog-item">
                        <Row>
                          <Col xs={12} sm={5}>
                            <Link href={getBlogLink(item.slug)}>
                              <Image
                                src={item.image.thumbnail}
                                alt={item.title}
                                width={512}
                                height={220}
                                className="img-fluid"
                                priority={idx === 0}
                              />
                            </Link>
                          </Col>

                          <Col xs={12} sm={7}>
                            <Link href={getBlogLink(item.slug)}>
                              <div className="blog-title">{item.title}</div>
                            </Link>
                            <div className="blog-desc">{item.descrtiption}</div>
                            <Link href={getBlogLink(item.slug)}>
                              <button className="gold-border-button">{t('read_more')}</button>
                            </Link>
                          </Col>
                        </Row>
                      </div>
                    </Fragment>
                  ))}
                </InfiniteScroll>
              )}
            </div>
          </Col>
        </Row>
      </div>
    </FilterSideWrapper>
  );
};

export const getStaticProps = async (ctx) => {
  const translations = await serverSideTranslations(ctx.locale, ['common'], nextI18nextConfig);
  const blog = await getBlogs();

  return {
    props: {
      results: blog.results,
      next: blog.next,
      ...translations,
    },
  };
};

export default Blog;
