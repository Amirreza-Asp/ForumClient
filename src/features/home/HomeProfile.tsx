import React from 'react'

export default function HomeProfile() {
  return (
    <div className="profile">
          <div className="profile-box">
            <h2 className="profile-box-title">Complete Your Profile</h2>

            <ul className="profile-box-steps">
              <li className="profile-box-steps-item">
                <div>
                  <span className="profile-box-steps-item-check"></span>
                  <p className="profile-box-steps-item-para">
                    General Information
                  </p>
                </div>
                <span className="profile-box-steps-item-number">5/6</span>
              </li>
              <li className="profile-box-steps-item">
                <div>
                  <span className="profile-box-steps-item-check"></span>
                  <p className="profile-box-steps-item-para">Work Experience</p>
                </div>
                <span className="profile-box-steps-item-number">1/3</span>
              </li>
              <li className="profile-box-steps-item">
                <div>
                  <span className="profile-box-steps-item-check check">
                    <i className="fa fa-check"></i>
                  </span>
                  <p className="profile-box-steps-item-para">Profile Photo</p>
                </div>
                <span className="profile-box-steps-item-number check">1/1</span>
              </li>
              <li className="profile-box-steps-item">
                <div>
                  <span className="profile-box-steps-item-check check">
                    <i className="fa fa-check"></i>
                  </span>
                  <p className="profile-box-steps-item-para">Cover Photo</p>
                </div>
                <span className="profile-box-steps-item-number check">1/1</span>
              </li>
            </ul>
          </div>
        </div>
  )
}
