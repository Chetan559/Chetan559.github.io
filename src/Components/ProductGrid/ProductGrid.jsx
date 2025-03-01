import React, { useEffect, useState } from "react";
import Legion from "../../assets/legion.png";
import Keyboard from "../../assets/keyboard.png";
import Mouse from "../../assets/mouse.png";
import Headphone from "../../assets/headphone.png";
import Phone from "../../assets/mobile.png";
import Tv from "../../assets/ledscreen.png";

const ProductGrid = () => {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    const fetchedData = [
      {
        id: 1,
        name: "Lenovo Legion 5",
        image: Legion,
        description:
          "Lenovo Legion 5 Intel Core i5 10th Gen - 10500H 15.6 inch (39.62cm) FHD IPS Gaming Laptop (8GB/512GB SSD/4GB NVIDIA RTX 3050/120Hz/Windows 11/Backlit/3months Game Pass/Phantom Black/2.3Kg)",
        link: "https://www.amazon.in/Lenovo-Legion-Intel-Core-10th/dp/B09Z2R77Z1",
      },
      {
        id: 2,
        name: "Cosmic Byte H11",
        image: Headphone,
        description:
          "Cosmic Byte H11 Gaming Wired Over-Ear PC Headset With Microphone",
        link: "https://www.amazon.in/Cosmic-Byte-H11-Microphone-Orange/dp/B07Y8LF4LK",
      },
      {
        id: 3,
        name: "Lenovo Legion M200",
        image: Mouse,
        description:
          "Lenovo Legion M200 RGB Gaming Wired USB Mouse, Ambidextrous, 6-Buttons, Upto 2400 DPI with 4 Levels DPI Switch, Multicolor-Colour RGB Backlight (GX30P93886)",
        link: "https://www.amazon.in/Lenovo-M200-WW-GX30P93886-Mouse-Black/dp/B076GZ3CFC",
      },
      {
        id: 4,
        name: "FINGERS SuperClicks K4",
        image: Keyboard,
        description: "FINGERS SuperClicks K4 Wired Multimedia USB Keyboard",
        link: "https://www.amazon.in/Fingers-SuperClicks-Wired-Multimedia-Keyboard/dp/B07SQGSHXH",
      },
      {
        id: 5,
        name: "vivo V20 SE",
        image: Phone,
        description: "vivo V20 SE (Gravity Black, 128 GB)  (8 GB RAM)",
        link: "https://www.flipkart.com/vivo-v20-se-gravity-black-128-gb/p/itm5e8ddfe992958?pid=MOBFWRGKNZV5JCRY&affExtParam1=39016890",
      },
      {
        id: 6,
        name: "SAMSUNG 32-inch HD LED TV - Series 4 UA32FH4005",
        image: Tv,
        description:
          "The Samsung 32-inch HD LED TV Series 4 combines sharp HD visuals, vibrant colors, and energy efficiency in a sleek, compact design, making it a perfect fit for any space.",
        link: "https://mytondong.blogspot.com/2014/08/samsung-32-inch-hd-led-tv-series-4.html",
      },
    ];

    setProducts(fetchedData);
  }, []);

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
      {products.map((product) => (
        <div
          key={product.id}
          className="flex items-start space-x-4 border border-gray-300 dark:border-gray-600 rounded-lg p-4 transition-all hover:border-gray-500 dark:hover:border-gray-400 hover:shadow-lg"
        >
          <img
            src={product.image}
            alt={product.name}
            className="w-16 h-16 object-contain transition-transform duration-300 hover:scale-110"
          />
          <div>
            <a
              href={product.link}
              className="font-semibold text-black dark:text-white transition-colors duration-300 hover:text-[#D67BFF]"
            >
              {product.name}
            </a>
            <p className="text-gray-600 dark:text-gray-400">
              {product.description}
            </p>
          </div>
        </div>
      ))}
    </div>
  );
};

export default ProductGrid;
