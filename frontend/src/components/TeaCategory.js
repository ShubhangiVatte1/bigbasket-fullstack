function TeaCategory({ selected, onSelect }) {
  return (
    <div className="tea-category">
      <p className={selected === "all" ? "active" : ""}
         onClick={() => onSelect("all")}>
        All Tea
      </p>

      <p className={selected === "green" ? "active" : ""}
         onClick={() => onSelect("green")}>
        Green Tea
      </p>

      <p className={selected === "black" ? "active" : ""}
         onClick={() => onSelect("black")}>
        Black Tea
      </p>

      <p className={selected === "herbal" ? "active" : ""}
         onClick={() => onSelect("herbal")}>
        Herbal Tea
      </p>
    </div>
  );
}

export default TeaCategory;
