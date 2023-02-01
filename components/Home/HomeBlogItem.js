import Link from "next/link";
import { useTranslation } from 'next-i18next';

import getBlogLink from "../common/utils/getBlogLink";
import Image from "next/image";

const HomeBlogItem = ({ slug, image, title, text }) => {
  const { t } = useTranslation("common")

  return (
    <div className="home-blog">
      <div className="home-blog-image">
        <Link href={getBlogLink(slug)}>
          <Image src={image} className="img-fluid" width={508} height={266} alt={title} />
        </Link>
      </div>
      <div className="home-blog-bottom">
        <h3 className="home-blog-title">{title}</h3>
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
