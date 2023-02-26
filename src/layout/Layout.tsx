import Header from "./Header/Header";
import { observer } from "mobx-react-lite";
import Sidebar from "./Sidebar/Sidebar";

interface Props {
  children: string | JSX.Element | JSX.Element[];
}

export default observer(function Layout({ children }: Props) {
  return (
    <div className="home-layout">
      <Header />
      <Sidebar />
      {children}
    </div>
  );
});
