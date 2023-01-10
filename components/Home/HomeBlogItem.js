import Link from "next/link";
import { useTranslation } from 'next-i18next';

import getBlogLink from "../common/utils/getBlogLink";

const HomeBlogItem = ({ slug, image, title, text }) => {
  const { t } = useTranslation("common")

  return (
    <div className="home-blog">
      <div className="home-blog-image">
        <Link href={getBlogLink(slug)}>
          <img src={image} className="img-fluid" alt={title} />
        </Link>
      </div>
      <div className="home-blog-bottom">
        <div className="home-blog-title">{title}</div>
        <div className="home-blog-text">{text}</div>
        <div className="home-blog-button">
          <Link href={getBlogLink(slug)}>
            <button className="gold-border-button">
              {t("read_more")}
            </button>
          </Link>
        </div>
      </div>
    </div>
  );
}

export default HomeBlogItem;
