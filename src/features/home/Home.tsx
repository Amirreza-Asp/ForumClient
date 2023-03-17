import "./home.css";
import HomeMain from "./HomeMain";
import HomeProfile from "./HomeProfile";
import HomeContributors from "./HomeContributors";
import { observer } from "mobx-react-lite";
import { useStore } from "../../app/stores/store";

export default observer(function Home() {
  const {
    layoutStore: { close },
  } = useStore();

  return (
    <section className={`${close ? "close" : ""} page home-main`}>
      <div className="content">
        <HomeMain />

        <div className="contributors">
          <HomeProfile />
          <HomeContributors />
        </div>
      </div>
    </section>
  );
});
