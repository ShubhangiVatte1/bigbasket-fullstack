import React from "react";
import "./NandiniCategory.css";

function NandiniCategory({ selected, onSelect }) {
  return (
    <div className="nandini-category">
       <p className={selected === "all" ? "active" : ""}
         onClick={() => onSelect("all")}>
        All Nandini
      </p>
      <p
        className={selected === "Milk" ? "active" : ""}
        onClick={() => onSelect("milk")}
      >
        Milk
      </p>
      

      <p
        className={selected === "curd" ? "active" : ""}
        onClick={() => onSelect("curd")}
      >
        Curd
      </p>

      <p
        className={selected === "butter" ? "active" : ""}
        onClick={() => onSelect("butter")}
      >
        Butter 
      </p>

      <p
        className={selected === "cheese" ? "active" : ""}
        onClick={() => onSelect("cheese")}
      >
        Cheese 
      </p>
    </div>
  );
}

export default NandiniCategory;
