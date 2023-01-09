// import { connect } from "react-redux";
import React from "react";
import classnames from 'classnames';
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Container from "react-bootstrap/Container";

import { ConnectedBasicSearch } from "components/filter/OfferFilter";
import QuickContact from "components/QuickContact";

export const LayoutWithSidebar = ({
  sidebar,
  children,
  className,
  rowClassName = null,
  mainClassName = null,
  // deprecated
  FilterSideWrapperClassName = null,
}) => {
  return (
    <div className={classnames(
      "base-layout",
      className,
      FilterSideWrapperClassName,
    )}>
      <Container>
        <Row className={rowClassName}>
          <Col xs={12} md={3} className="filter-side">
            {sidebar}
          </Col>
          <Col xs={12} md={9} className={mainClassName}>
            {children}
          </Col>
        </Row>
      </Container>
    </div>
  );
};

const FilterSideWrapper = ({ ...params }) => {
  return (
    <LayoutWithSidebar
      sidebar={
        <>
          <ConnectedBasicSearch />
          <QuickContact />
        </>
      }
      {...params}
    />
  );
};

// function mapStateToProps(state) {
//   return {
//     yachtType: state.yachtType,
//     brands: state.brands,
//   };
// }

export const LayoutQuickSearchSidebar = FilterSideWrapper;
