// import { connect } from "react-redux";
import { useTranslation } from "next-i18next";
import { Row, Col } from "react-bootstrap";
import Link from "next/link";
import { Helmet } from "react-helmet";
import InfiniteScroll from "react-infinite-scroller";
import FilterSideWrapper from "../common/FilterSideWrapper";
import getBlogLink from "../common/utils/getBlogLink";

class Blog extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      loadMore: false,
    };

    this.loadMore = this.loadMore.bind(this);
  }

  componentDidMount() {
    this.props.dispatch({
      type: "BLOG_PAGE_SAGA",
      payload: { lang: this.props.i18n.language },
    });
    window.scrollTo(0, 0);
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.blog_page.next) {
      this.setState({ loadMore: true });
    }
  }

  loadMore() {
    this.setState({ loadMore: false });

    if (this.props.blog_page.next) {
      this.props.dispatch({
        type: "BLOG_PAGE_PAGINATION_SAGA",
        payload: { url: this.props.blog_page.next },
      });
    }
  }

  renderBlog() {
    const { t } = useTranslation("common");

    if (!this.props.blog_page.results) {
      return <div />;
    }

    return this.props.blog_page.results.map((item, index) => {
      return (
        <div className="blog-item" key={`blog-${index}`}>
          <div className="row">
            <Col xs={12} sm={5}>
              <Link href={getBlogLink(item.slug)}>
                <img alt="" src={item.image.thumbnail} className="img-fluid" />
              </Link>
            </Col>

            <Col xs={12} sm={7}>
              <Link href={getBlogLink(item.slug)}>
                <div className="blog-title">{item.title}</div>
              </Link>
              <div className="blog-desc">{item.descrtiption}</div>
              <Link href={getBlogLink(item.slug)}>
                <button className="gold-border-button">
                  {t("read_more")}
                </button>
              </Link>
            </Col>
          </div>
        </div>
      );
    });
  }

  render() {
    const { t } = useTranslation("common");

    return (
      <FilterSideWrapper
        location={this.props.location.pathname}
        FilterSideWrapperClassName="background-white"
      >
        <Helmet>
          <title>{t("blog_seo_title")}</title>
          <meta
            name="description"
            content={t("blog_seo_desc")}
          />
          <meta
            property="og:title"
            content={t("blog_seo_title")}
          />
          <meta
            property="og:description"
            content={t("blog_seo_desc")}
          />
        </Helmet>
        <div className="blog">
          <div className="row">
            <Col xs={12} sm={12}>
              <div className="col-inner">
                <h1>{t("blog")}</h1>
                <InfiniteScroll
                  pageStart={0}
                  loadMore={this.loadMore}
                  hasMore={this.state.loadMore}
                  loader={<div className="loader">Loading ...</div>}
                  threshold={1200}
                >
                  {this.renderBlog()}
                </InfiniteScroll>
              </div>
            </Col>
          </div>
        </div>
      </FilterSideWrapper>
    );
  }
}

export default Blog;
