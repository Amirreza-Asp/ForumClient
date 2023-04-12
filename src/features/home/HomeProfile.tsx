import { observer } from "mobx-react-lite";
import { useStore } from "../../app/stores/store";

export default observer(function HomeProfile() {
  const {
    accountStore: { user },
  } = useStore();

  let optionalInformationCount = 0;
  optionalInformationCount += user?.phoneNumber ? 1 : 0;
  optionalInformationCount += user?.email ? 1 : 0;

  return (
    <div className="profiles">
      <div className="profiles-box">
        <h2 className="profiles-box-title">Complete Your Profile</h2>

        <ul className="profiles-box-steps">
          <li className="profiles-box-steps-item">
            <div>
              <span className="profiles-box-steps-item-check">
                {user && <i className="fa fa-check"></i>}
              </span>
              <p className="profiles-box-steps-item-para">
                General Information
              </p>
            </div>
            <span
              className={`profiles-box-steps-item-number ${
                user ? "check" : ""
              }`}
            >
              {user ? 6 : 0}/6
            </span>
          </li>
          <li className="profiles-box-steps-item">
            <div>
              <span className="profiles-box-steps-item-check">
                {optionalInformationCount === 2 && (
                  <i className="fa fa-check"></i>
                )}
              </span>
              <p className="profiles-box-steps-item-para">
                Optional Information
              </p>
            </div>
            <span
              className={`profiles-box-steps-item-number ${
                optionalInformationCount === 2 ? "check" : ""
              }`}
            >
              {optionalInformationCount}/2
            </span>
          </li>
          <li className="profiles-box-steps-item">
            <div>
              <span className="profiles-box-steps-item-check">
                {user?.image && <i className="fa fa-check"></i>}
              </span>
              <p className="profiles-box-steps-item-para">Profile Photo</p>
            </div>
            <span
              className={`profiles-box-steps-item-number ${
                user?.image ? "check" : ""
              }`}
            >
              {user?.image ? 1 : 0}/1
            </span>
          </li>
        </ul>
      </div>
    </div>
  );
});
