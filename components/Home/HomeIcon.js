import Link from "next/link";
import { useTranslation } from 'next-i18next';

const HomeIcon = (props) => {
  const { t } = useTranslation();
  return (
    <div className="home-icon flex flex-col items-center text-center">
      <div className="home-icon--icon">
        <Link href={t(`common:${props.link}`) || "#"}>
          {props.children}
        </Link>
      </div>
      <div className="home-icon--title">
        <Link href={t(`common:${props.link}`) || "#"}>
          {t(`common:${props.title}`)}
        </Link>
      </div>
      <div className="home-icon--text">
        <div dangerouslySetInnerHTML={{ __html: t(`common:${props.text}`) }} />
      </div>
    </div>
  );
};

export default HomeIcon;
