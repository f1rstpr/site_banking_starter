import "./FilterInput.css";

export default function FilterInput({ handleOnInputChange, filterInputValue }) {
  console.log(filterInputValue);
  return (
    <div className="FilterInput">
      <i className="material-icons">search</i>
      <input
        type="text"
        placeholder={`${filterInputValue}`}
        onChange={(e) => handleOnInputChange(e.target.value)}
      />
    </div>
  );
}
