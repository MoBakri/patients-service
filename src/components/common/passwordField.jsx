import React from "react";
const PasswordField = ({
  user,
  cnfPass,
  handleOldPassword,
  handleNewPassword,
  handleCnfPassword,
  errors,
}) => {
  return (
    <React.Fragment>
      {user && <div className="my-3">{`Username: ${user.username}`}</div>}
      <label htmlFor="passField1 oPassword">
        <div className="mb-3">
          <input
            type="password"
            id="oPassword"
            name="oPassword"
            value={cnfPass.oPassword}
            onChange={handleOldPassword}
            placeholder="Old password"
            className="form-control"
          />
        </div>
        <div className="passField2 mb-3">
          <input
            type="password"
            id="nfgPassword"
            name="nfgPassword"
            value={cnfPass.nPassword}
            onChange={handleNewPassword}
            placeholder="New password"
            className="form-control"
          />
        </div>
        <div className="passField3">
          <input
            type="Password"
            id="rpfgPassword"
            name="cfmfgPassword"
            value={cnfPass.cnfPassword}
            onChange={handleCnfPassword}
            placeholder="Confirm new password"
            className="form-control"
          />
        </div>
      </label>
    </React.Fragment>
  );
};

export default PasswordField;
