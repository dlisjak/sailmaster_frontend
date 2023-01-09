import React from "react";
import Container from "react-bootstrap/Container";
import * as Sentry from "@sentry/react";

import { useTranslation } from 'next-i18next';

const ErrorBoundary = ({ children }) => {
  const { t } = useTranslation();
  return (
    <Sentry.ErrorBoundary
      fallback={
        <Container className="my-5">
          <h1>{t("error_500_title")}</h1>
          <p>{t("error_500_content")}</p>
        </Container>
      }
    >
      {children}
    </Sentry.ErrorBoundary>
  );
};

export default ErrorBoundary;
