// import { connect } from "react-redux";
import { withTranslation } from "react-i18next";
import { Row, Col } from "react-bootstrap";
import { Helmet } from "react-helmet";
import Lightbox from "react-images";
import { ShareButtons, generateShareIcon } from "react-share";

import FilterSideWrapper from "../common/FilterSideWrapper";

class BlogSingle extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      images: [],
      lightboxIsOpen: false,
      currentImage: 0,
    };

    this.openLightBox = this.openLightBox.bind(this);
    this.closeLightbox = this.closeLightbox.bind(this);
    this.gotoPrevious = this.gotoPrevious.bind(this);
    this.gotoNext = this.gotoNext.bind(this);
    this.gotoImage = this.gotoImage.bind(this);
    this.handleClickImage = this.handleClickImage.bind(this);
  }

  componentDidMount() {
    this.props.dispatch({
      type: "BLOG_SINGLE_SAGA",
      payload: {
        slug: this.props.match.params.slug + "?lang=" + this.props.i18n.language,
      },
    });
    window.scrollTo(0, 0);
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.blog_single.id) {
      window.scrollTo(0, 0);
      if (nextProps.blog_single.gallery.length > 0) {
        let images = [];

        nextProps.blog_single.gallery.forEach((item) => {
          images.push({ src: item.image.full_size });
        });

        this.setState({ images });
      }
    }
  }

  openLightBox(index) {
    this.setState({
      currentImage: index,
      lightboxIsOpen: true,
    });
  }

  closeLightbox() {
    this.setState({
      currentImage: 0,
      lightboxIsOpen: false,
    });
  }

  gotoPrevious() {
    this.setState({
      currentImage: this.state.currentImage - 1,
    });
  }

  gotoNext() {
    this.setState({
      currentImage: this.state.currentImage + 1,
    });
  }

  gotoImage(index) {
    this.setState({
      currentImage: index,
    });
  }

  handleClickImage() {
    if (this.state.currentImage === this.props.images.length - 1) return;

    this.gotoNext();
  }

  renderGallery() {
    if (this.props.blog_single.gallery) {
      const gallery = this.props.blog_single.gallery.map((item, index) => {
        return (
          <Col xs={12} sm={6} md={3} key={`gallery-${index}`}>
            <img
              alt=""
              src={item.image.thumbnail}
              className="img-fluid gallery-image"
              onClick={() => this.openLightBox(index)}
            />
          </Col>
        );
      });

      return <div className="row">{gallery}</div>;
    }
  }

  render() {
    if (!this.props.blog_single.id) {
      return <div />;
    }

    const {
      FacebookShareButton,
      GooglePlusShareButton,
      TwitterShareButton,
    } = ShareButtons;

    const FacebookIcon = generateShareIcon("facebook");
    const TwitterIcon = generateShareIcon("twitter");
    const GooglePlusIcon = generateShareIcon("google");

    return (
      <FilterSideWrapper
        location={this.props.location.pathname}
        FilterSideWrapperClassName="background-white"
      >
        <Helmet>
          <title>{this.props.blog_single.title}</title>
          <meta
            name="description"
            content={this.props.blog_single.description}
          />
          <meta property="og:title" content={this.props.blog_single.title} />
          <meta
            property="og:description"
            content={this.props.blog_single.description}
          />
        </Helmet>
        <div className="blog-single">
          <div className="row">
            <Col xs={12} sm={12}>
              <div className="col-inner">
                <div className="image-wrapper">
                  <img
                    alt=""
                    src={this.props.blog_single.image.full_size}
                    className="img-fluid"
                  />
                  <div className="title-wrapper">
                    {this.props.blog_single.title}
                  </div>
                </div>
                <div className="subtitle-wrapper">
                  <FacebookShareButton
                    quote={this.props.blog_single.title}
                    picture={this.props.blog_single.picture}
                    url={window.location.href}
                  >
                    <FacebookIcon size={32} round={true} />
                  </FacebookShareButton>

                  <TwitterShareButton
                    quote={this.props.blog_single.title}
                    via={window.location.href}
                    url={window.location.href}
                  >
                    <TwitterIcon size={32} round={true} />
                  </TwitterShareButton>

                  <GooglePlusShareButton url={window.location.href}>
                    <GooglePlusIcon size={32} round={true} />
                  </GooglePlusShareButton>

                  <div className="wrote">
                    {this.props.t("wrote")}

                    <span>thesailmaster</span>
                  </div>
                  <div className="blog-date">
                    <span>|</span> {this.props.blog_single.date_from}
                  </div>
                </div>
                <div className="blog-border" />
                <div
                  className="blog-content"
                  dangerouslySetInnerHTML={{
                    __html: this.props.blog_single.text,
                  }}
                />
                {this.renderGallery()}
              </div>
            </Col>
          </div>
        </div>
        <Lightbox
          currentImage={this.state.currentImage}
          images={this.state.images}
          isOpen={this.state.lightboxIsOpen}
          onClickImage={this.handleClickImage}
          onClickNext={this.gotoNext}
          onClickPrev={this.gotoPrevious}
          onClickThumbnail={this.gotoImage}
          onClose={this.closeLightbox}
          showThumbnails={true}
        />
      </FilterSideWrapper>
    );
  }
}

// function mapStateToProps(state) {
//   return {
//     blog_single: state.blog_single || {},
//   };
// }
export default withTranslation()(BlogSingle);
