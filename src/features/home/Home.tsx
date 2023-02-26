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
    <main className={`${close ? "close" : ""}`}>
      <section className="content">
        <HomeMain />

        <section className="contributors">
          <HomeProfile />
          <HomeContributors />
        </section>
      </section>
    </main>
  );
});
