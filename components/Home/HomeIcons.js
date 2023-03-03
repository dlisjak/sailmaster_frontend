import HandLens from "../icons/HandLens";
import Calendar from "../icons/Calendar";
import Reservation from "../icons/Reservation";
import FreeIcon from "../icons/FreeIcon";
import HomeIcon from "./HomeIcon";

export default function HomeIcons() {
  return (
    <div className="row">
      <div className="home-icon-wrapper sm:w-1/4 pr-[15px] pl-[15px] w-full">
        <HomeIcon
          title="home_icon_1_title"
          link="home_icon_1_link"
          text="home_icon_1_text"
        >
          <HandLens />
        </HomeIcon>
      </div>
      <div className="home-icon-wrapper sm:w-1/4 pr-[15px] pl-[15px] w-full">
        <HomeIcon
          title="home_icon_2_title"
          link="home_icon_2_link"
          text="home_icon_2_text"
        >
          <Calendar />
        </HomeIcon>
      </div>
      <div className="home-icon-wrapper sm:w-1/4 pr-[15px] pl-[15px] w-full">
        <HomeIcon
          title="home_icon_3_title"
          link="home_icon_3_link"
          text="home_icon_3_text"
        >
          <Reservation />
        </HomeIcon>
      </div>
      <div className="home-icon-wrapper sm:w-1/4 pr-[15px] pl-[15px] w-full">
        <HomeIcon
          title="home_icon_4_title"
          link="home_icon_4_link"
          text="home_icon_4_text"
        >
          <FreeIcon />
        </HomeIcon>
      </div>
    </div>
  );
}
