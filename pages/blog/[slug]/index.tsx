import React from 'react';
import { useRouter } from 'next/router';
import { useTranslation } from 'next-i18next';
import { Row, Col } from 'react-bootstrap';
import { Helmet } from 'react-helmet';
import Image from 'next/image';
import {
  FacebookShareButton,
  FacebookIcon,
  TwitterShareButton,
  TwitterIcon,
  PinterestShareButton,
  PinterestIcon,
} from 'react-share';

import FilterSideWrapper from '../../../components/common/FilterSideWrapper';
import nextI18nextConfig from '../../../next-i18next.config';
import { getBlog, getBlogs } from '../../../queries/getters';

const BlogSingle = ({ blog_single }) => {
  const { t } = useTranslation();
  const router = useRouter();

  if (!blog_single.id) {
    return <div />;
  }

  return (
    <FilterSideWrapper location={router.pathname} FilterSideWrapperClassName="background-white">
      <Helmet>
        <title>{blog_single.title}</title>
        <meta name="description" content={blog_single.description} />
        <meta property="og:title" content={blog_single.title} />
        <meta property="og:description" content={blog_single.description} />
      </Helmet>
      <div className="blog-single mt-0">
        <Row>
          <Col xs={12} sm={12}>
            <div className="col-inner">
              <div className="image-wrapper">
                <Image
                  alt={blog_single.title}
                  src={blog_single.image.full_size}
                  width={800}
                  height={400}
                />
                <div className="title-wrapper">{blog_single.title}</div>
              </div>
              <div className="subtitle-wrapper flex">
                <FacebookShareButton quote={blog_single.title} url={router.asPath}>
                  <FacebookIcon size={32} round={true} />
                </FacebookShareButton>

                <TwitterShareButton
                  title={blog_single.title}
                  via={router.asPath}
                  url={router.asPath}
                >
                  <TwitterIcon size={32} round={true} />
                </TwitterShareButton>

                <PinterestShareButton url={router.asPath} media={blog_single.picture}>
                  <PinterestIcon size={32} round={true} />
                </PinterestShareButton>

                <div className="wrote">
                  {t('wrote')}

                  <span>thesailmaster</span>
                </div>
                <div className="blog-date">
                  <span>|</span> {blog_single.date_from}
                </div>
              </div>
              <div className="blog-border" />
              <div
                className="blog-content"
                dangerouslySetInnerHTML={{
                  __html: blog_single.text,
                }}
              />
            </div>
          </Col>
        </Row>
      </div>
    </FilterSideWrapper>
  );
};

export const getStaticPaths = async () => {
  const { count } = await getBlogs();
  const { results } = await getBlogs(count);

  const paths = results?.map((blog) => ({ params: { slug: blog.slug } }));

  return {
    paths,
    fallback: 'blocking',
  };
};

export const getStaticProps = async (ctx) => {
  const serverSideTranslations = (await import('next-i18next/serverSideTranslations'))
    .serverSideTranslations;

  const { slug } = ctx.params;

  const data = await getBlog(slug);

  const translations = await serverSideTranslations(ctx.locale, ['common'], nextI18nextConfig);

  return {
    props: {
      blog_single: data,
      ...translations,
    },
  };
};

export default BlogSingle;
