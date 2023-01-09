import React from "react";
import Link from "next/link";
import { withTranslation } from "react-i18next";
import getBlogLink from "../common/utils/getBlogLink";

const HomeBlogItem = (props) => (
  <div className="home-blog">
    <div className="home-blog-image">
      <Link href={getBlogLink(props.slug)}>
        <img src={props.image} className="img-fluid" alt={props.title} />
      </Link>
    </div>
    <div className="home-blog-bottom">
      <div className="home-blog-title">{props.title}</div>
      <div className="home-blog-text">{props.text}</div>
      <div className="home-blog-button">
        <Link href={getBlogLink(props.slug)}>
          <button className="gold-border-button">
            {props.t("read_more")}
          </button>
        </Link>
      </div>
    </div>
  </div>
);

export default withTranslation()(HomeBlogItem);
