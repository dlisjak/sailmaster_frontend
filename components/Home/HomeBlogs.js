import Link from "next/link";
import { useTranslation } from 'next-i18next';
import Container from "react-bootstrap/Container";

import HomeBlogItem from "./HomeBlogItem";

const HomeBlogs = ({ items }) => {
  const { t } = useTranslation("common");

  return (
    <div className="home-blog-wrapper">
      <Container className="page-home__block">
        <div className="page-home__title">
          <h2>{t("home_blog_title")}</h2>
        </div>
        <div className="row">
          {items.map((item, index) => {
            return (
              <div
                className="page-title sm:w-1/3 pr-4 pl-4 w-full"
                key={`blog-${index}-${item.slug}`}
              >
                <HomeBlogItem
                  image={item.image.thumbnail}
                  title={item.title}
                  text={item.descrtiption}
                  slug={item.slug}
                />
              </div>
            );
          })}
        </div>
        <div className="d-flex mt-3 justify-content-center">
          <Link className="btn btn-outline-secondary btn-lg" href={t("blog_route")}>
            {t("all_blogs")}
          </Link>
        </div>
      </Container>
    </div>
  );
};

export default HomeBlogs;
