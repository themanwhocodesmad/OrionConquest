const PillSwitch = ({ isOn, handleToggle }) => {
    return (
      <label className="pill-switch">
        <input type="checkbox" checked={isOn} onChange={handleToggle} />
        <span className="slider"></span>
      </label>
    );
  };

  export default PillSwitch;