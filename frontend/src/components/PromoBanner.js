import React, { useEffect, useState } from "react";
import "./PromoBanner.css";

const banners = [
  {
    title: "Tea Time\nBakes",
    subtitle: "Bakery, Cakes & more.",
    offer: "50%",
    image: "/images/tea-banner.png",
  },
  {
    title: "Fresh\nSnacks",
    subtitle: "Chips, Namkeen & more.",
    offer: "40%",
    image: "/images/snacks-banner.png",
  },
  {
    title: "Gentle Baby\nMust-Haves",
    subtitle: " Diaper,Baby powder & more ",
    offer: "30%",
    image: "/images/grocery-banner.png",
  },
  {
    title: "Protein\nPower-up",
    subtitle: "supplements to make your workouts better",
    offer: "30%",
    image: "/images/grocery-banner1.png",
  },
];

const PromoBanner = () => {
  const [index, setIndex] = useState(0);

  // 🔁 AUTO SLIDE
  useEffect(() => {
    const timer = setInterval(() => {
      setIndex((prev) => (prev + 1) % banners.length);
    }, 3000);

    return () => clearInterval(timer);
  }, []);

  const banner = banners[index];

  return (
    <div className="promo-banner">
      {/* LEFT */}
      <div className="promo-left">
        <h2>
          {banner.title.split("\n").map((line, i) => (
            <span key={i}>
              {line}
              <br />
            </span>
          ))}
        </h2>

        <p>{banner.subtitle}</p>

        <h3>
          UP TO <span>{banner.offer}</span> OFF
        </h3>

        <button className="shop-btn">
          SHOP NOW <span>➜</span>
        </button>
      </div>

      {/* RIGHT */}
      <div className="promo-right">
        <img src={banner.image} alt="promo" />
      </div>

      {/* DOTS */}
      <div className="promo-dots">
        {banners.map((_, i) => (
          <span
            key={i}
            className={`dot ${i === index ? "active" : ""}`}
          ></span>
        ))}
      </div>
    </div>
  );
};

export default PromoBanner;
