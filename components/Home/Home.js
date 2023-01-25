import Link from "next/link";
import { Helmet } from "react-helmet";
import { useTranslation } from "next-i18next";

import { Row, Col, Button } from "react-bootstrap";

// Import components
import { OFFER } from "../../constants/actionTypes";
import Testimonial from "../common/Testimonial";
import HandLens from "../icons/HandLens";
import Calendar from "../icons/Calendar";
import Reservation from "../icons/Reservation";
import FreeIcon from "../icons/FreeIcon";
import Header from "./Header";
import HomeSpecialOffers from "./HomeSpecialOffers";
import IconsLine from "./IconsLine";
import HomeOffers from "./HomeOffers";
import HomeIcon from "./HomeIcon";
import HomeBlogItem from "./HomeBlogItem";
import HomeNewsletter from "./HomeNewsletter";

// Home page component
class Home extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      addNewsletter: false,
      newsletterFadeOut: false,
      showStickNavigation: false,
    };

    this.handleAddedNewsletter = this.handleAddedNewsletter.bind(this);
  }

  componentDidMount() {
    this.props.dispatch({ type: OFFER, offer: {} });
    this.props.dispatch({
      type: "SPECIAL_OFFERS_SAGA",
      payload: { lang: this.props.i18n.language },
    });
    this.props.dispatch({
      type: "OFFERS_HOME_SAGA",
      payload: { lang: this.props.i18n.language },
    });
    this.props.dispatch({
      type: "BLOG_SAGA",
      payload: { lang: this.props.i18n.language, limit: 3 },
    });
    this.props.dispatch({
      type: "TESTIMONIALS_SAGA",
      payload: { lang: this.props.i18n.language, limit: 4 },
    });
    window.scrollTo(0, 0);
  }

  componentWillReceiveProps(nextProps) {
    if (
      nextProps.form.homeNewsletter &&
      nextProps.form.homeNewsletter.submitSucceeded
    ) {
      this.handleAddedNewsletter();
    }
  }

  handleAddedNewsletter() {
    // Fade out form
    this.setState({ newsletterFadeOut: true });

    // Show fade in text
    setTimeout((_) => {
      this.setState({ addNewsletter: true });
    }, 500);
  }

  renderTestimonial() {
    const { t } = useTranslation("common");

    if (this.props.testimonials.results) {
      return this.props.testimonials.results.map((item, index) => {
        const image = item.image.thumbnail || item.profile_photo_url;
        const country = item.country ? item.country.name : null;
        return (
          <Col
            xs={12}
            sm={3}
            className="home-icon-wrapper"
            key={`testimonial-${index}`}
          >
            <Testimonial
              image={image}
              name={item.name}
              text={item.opinion}
              country={country}
              source={item.source}
              rating={item.rating}
              author_url={item.author_url}
            />
          </Col>
        );
      });
    }
  }

  renderBlog() {
    if (this.props.blog.results) {
      return this.props.blog.results.map((item, index) => {
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
      });
    }
  }

  // render
  render() {
    const { t } = useTranslation("common");

    return (
      <div className="page-home">
        <Helmet>
          <title>{t("home_seo_title")}</title>
          <meta
            name="description"
            content={t("home_seo_desc")}
          />
          <meta
            property="og:title"
            content={t("home_seo_title")}
          />
          <meta
            property="og:description"
            content={t("home_seo_desc")}
          />
        </Helmet>

        <Header />

        <IconsLine />
        <HomeSpecialOffers />
        <HomeOffers />

        <div className="container">
          <div className="row">
            <Col xs={12} sm={3} className="home-icon-wrapper">
              <HomeIcon
                title="home_icon_1_title"
                link="home_icon_1_link"
                text="home_icon_1_text"
              >
                <HandLens />
              </HomeIcon>
            </Col>
            <Col xs={12} sm={3} className="home-icon-wrapper">
              <HomeIcon
                title="home_icon_2_title"
                link="home_icon_2_link"
                text="home_icon_2_text"
              >
                <Calendar />
              </HomeIcon>
            </Col>
            <Col xs={12} sm={3} className="home-icon-wrapper">
              <HomeIcon
                title="home_icon_3_title"
                link="home_icon_3_link"
                text="home_icon_3_text"
              >
                <Reservation />
              </HomeIcon>
            </Col>
            <Col xs={12} sm={3} className="home-icon-wrapper">
              <HomeIcon
                title="home_icon_4_title"
                link="home_icon_4_link"
                text="home_icon_4_text"
              >
                <FreeIcon />
              </HomeIcon>
            </Col>
          </div>
        </div>

        <div className="testimonial-wrapper">
          <div className="container">
            <div className="row">
              <Col xs={12} className="page-title">
                <h2>{t("testimonials_title")}</h2>
              </Col>
            </div>
            <div className="row">{this.renderTestimonial()}</div>
            <div className="row">
              <Col xs={12}>
                <a
                  href="https://www.google.com/maps/place/TheSailmaster.si+-+najem+jadrnice,+katamarana,+jahte/@46.0624786,14.5115861,17z/data=!3m1!4b1!4m7!3m6!1s0x477acd357b03fa45:0xdf35888269b1eab6!8m2!3d46.0624786!4d14.5137748!9m1!1b1"
                  target="_blank"
                >
                  <img
                    className="google-review-icon"
                    src="/media/GoogleReview_logo.png"
                    alt={t("testimonials_more")}
                  />
                </a>
              </Col>
            </div>
          </div>
        </div>

        <div className="home-blog-wrapper">
          <div className="container">
            <div className="row">
              <Col xs={12} className="page-title">
                <h2>{t("home_blog_title")}</h2>
              </Col>
            </div>
            <div className="row">{this.renderBlog()}</div>
            <div className="row">
              <Link href={t("blog_route")}>
                <Col xs={12} sm={4} smOffset={4}>
                  <Button className="gold-border-button">
                    {thist("all_blogs")}
                  </Button>
                </Col>
              </Link>
            </div>
          </div>
        </div>

        <div className="home-newsletter">
          <div className="container">
            <div className="row">
              <Col xs={12} className="text-center page-title">
                <h2>{t("newsletter_title")}</h2>
              </Col>
              <Col xs={12}>
                <div className="text-center">
                  <div>{t("newsletter_subtitle")}</div>
                </div>
              </Col>
              {!this.state.addNewsletter ? (
                <div className={this.state.newsletterFadeOut ? "fade-out" : ""}>
                  <HomeNewsletter />
                </div>
              ) : (
                <Col xs={12} className="text-center newsletter-success-wrapper">
                  <div className="newsletter-success fade-in">
                    {thist("newsletter_success")}
                  </div>
                </Col>
              )}
            </div>
          </div>
        </div>
      </div>
    );
  }
}

// function mapStateToProps(state) {
//   return {
//     locationsMap: state.locationsMap || [],
//     blog: state.blog || {},
//     testimonials: state.testimonials || {},
//     form: state.form || {},
//   };
// }

export default Home;
