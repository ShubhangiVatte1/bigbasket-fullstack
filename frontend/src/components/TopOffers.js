// import React from "react";
import "./TopOffers.css";

const offers = [
  {
    id: 1,
    title: "DEALS OF\nTHE WEEK",
    bg: "red",
  },
  {
    id: 2,
    title: "BIG PACK\nBIGGER DISCOUNTS",
    bg: "red",
  },
  {
    id: 3,
    title: "COMBOS\nYOU CAN’T MISS",
    bg: "red",
  },
  {
    id: 4,
    title: "THE\n₹30 CORNER",
    bg: "red",
  },
];

const TopOffers = () => {
  return (
    <div className="topoffer">
    <div className="top-offers">
      <h2>Top Offers</h2>

      <div className="offers-grid">
        {offers.map((offer) => (
          <div key={offer.id} className="offer-card">
            <div className="offer-red">
              {offer.title.split("\n").map((line, i) => (
                <p key={i}>{line}</p>
              ))}
            </div>

            <div className="offer-footer">
              View offers &gt;
            </div>
          </div>
        ))}
      </div>
    </div>
    </div>
  );
};

export default TopOffers;
