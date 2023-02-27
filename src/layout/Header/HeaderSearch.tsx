import { observer } from "mobx-react-lite";

export default observer(function HeaderSearch() {
  return (
    <div className="layout-header-nav-search">
      <input
        type="search"
        className="layout-header-nav-search-input"
        placeholder="Search for friends, videos and more..."
      />
      <div className="layout-header-nav-search-icon">
        <i className="far fa-search"></i>
      </div>
    </div>
  );
});
