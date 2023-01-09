import React from "react";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Button from "react-bootstrap/Button";
import Container from "react-bootstrap/Container";
import Link from "next/link";
import { useTranslation } from 'next-i18next';
import HomeBlogItem from "./HomeBlogItem";

const HomeBlogs = ({ items }) => {
  const { t } = useTranslation();
  return (
    <div className="home-blog-wrapper">
      <Container className="page-home__block">
        <div className="page-home__title">
          <h2>{t("home_blog_title")}</h2>
        </div>
        <div className="row">
          {items.map((item, index) => {
            return (
              <Col
                xs={12}
                sm={4}
                className="page-title"
                key={`blog-${index}-${item.slug}`}
              >
                <HomeBlogItem
                  image={item.image.thumbnail}
                  title={item.title}
                  text={item.descrtiption}
                  slug={item.slug}
                />
              </Col>
            );
          })}
        </div>
        <div className="d-flex mt-3 justify-content-center">
          <Link href={t("blog_route")}>
            <Button size="lg" variant="outline-secondary">{t("all_blogs")}</Button>
          </Link>
        </div>
      </Container>
    </div>
  );
};

export default HomeBlogs;
