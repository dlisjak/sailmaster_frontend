import { useEffect, useState } from "react";

import { useTranslation } from "next-i18next";

const CookieLaw = () => {
  const [closedCookies, setClosedCookies] = useState(true)
  const { t } = useTranslation("common")

  useEffect(() => {
    const closedCookies = localStorage.getItem("closedCookies");

    setClosedCookies(closedCookies)
  }, []);

  const handleCloseCookies = () => {
    localStorage.setItem("closedCookies", true);
    setClosedCookies(true);
  }

  if (closedCookies) {
    return <div />;
  }

  return (
    <div className="CookieLaw">
      <div className="container">
        <div className="row">
          <div className="w-full">
            <div className="CookieLaw__inner">
              <div className="CookieLaw__left sm:w-4/5 pr-4 pl-4 w-full">
                <div className="CookieLaw__left__info">i</div>
                <div
                  className="CookieLaw__left__infoText"
                  dangerouslySetInnerHTML={{ __html: t("COOKIES") }}
                />
              </div>
              <div className="CookieLaw__right sm:w-1/5 pr-4 pl-4 w-full">
                <button
                  type="button"
                  className="gold-button btn btn-primary"
                  onClick={handleCloseCookies}
                >
                  {t("CLOSE")}
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default CookieLaw;
