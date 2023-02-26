import "./sidebar.css";
import React from "react";
import { useStore } from "../../app/stores/store";
import { observer } from "mobx-react-lite";

export default observer(function Sidebar() {
  const {
    layoutStore: { close },
  } = useStore();

  return (
    // <!-- sidebar -->
    <aside className={`sidebar ${close ? "close" : ""}`}>
      <div>
        <a
          href="#"
          className="brand"
          style={{ marginBottom: 10, textAlign: "center" }}
        >
          <span>Aryla</span>
        </a>
        <hr />
        <small className="menu-heading">Categories</small>
        <ul className="tools">
          <li>
            <a href="#">
              <i className="fa-thin fa-money-bill-1-wave"></i>
              <span>Price</span>
            </a>
          </li>
          <li className="active">
            <a href="#">
              <i className="fa-thin fa-monitor-waveform"></i>
              <span>Trade</span>
            </a>
          </li>
          <li>
            <a href="#">
              <i className="fa-thin fa-calendar-days"></i>
              <span>Schedules</span>
            </a>
          </li>
          <li>
            <a href="#">
              <i className="fa-thin fa-handshake"></i>
              <span>Transaction</span>
            </a>
          </li>
          <li>
            <a href="#">
              <i className="fa-thin fa-earth"></i>
              <span>World</span>
            </a>
          </li>
          <li>
            <a href="#">
              <i className="fa-thin fa-user-secret"></i>
              <span>Secret</span>
            </a>
          </li>
        </ul>
        <hr />
        <small className="menu-heading">
          <span>Insights</span>
        </small>
        <ul className="notification">
          <li>
            <a href="#">
              <div>
                <i className="fa-thin fa-mail-bulk"></i>
                <span>Inbox</span>
              </div>
              <span className="badge">18</span>
            </a>
          </li>
          <li>
            <a href="#">
              <div>
                <i className="fa-thin fa-note"></i>
                <span>Topics</span>
              </div>
              <span className="badge">2</span>
            </a>
          </li>
          <li>
            <a href="#">
              <div>
                <i className="fa-thin fa-comment"></i>
                <span>Comments</span>
              </div>
              <span className="badge">24</span>
            </a>
          </li>
        </ul>
        <div className="profile">
          <a href="#">
            <img
              src="assets/images/christopher-campbell-rDEOVtE7vOs-unsplash.jpg"
              alt="user image"
            />
          </a>
          <div>
            <h4>John Doe</h4>
            <small>Free Account</small>
          </div>
        </div>
      </div>
    </aside>
  );
});
