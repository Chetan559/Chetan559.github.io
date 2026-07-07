export type Gear = {
  name: string;
  category: string;
  note: string;
  image: string;
  link?: string;
};

export const gear: Gear[] = [
  {
    name: "Lenovo Legion 5",
    category: "Laptop",
    note: "i5 10th Gen · RTX 3050 · 120Hz FHD IPS — the daily driver.",
    image: "/images/gear/legion.png",
    link: "https://www.amazon.in/Lenovo-Legion-Intel-Core-10th/dp/B09Z2R77Z1",
  },
  {
    name: "Cosmic Byte H11",
    category: "Headset",
    note: "Wired over-ear gaming headset with mic.",
    image: "/images/gear/headphone.png",
    link: "https://www.amazon.in/Cosmic-Byte-H11-Microphone-Orange/dp/B07Y8LF4LK",
  },
  {
    name: "Lenovo Legion M200",
    category: "Mouse",
    note: "RGB wired mouse, up to 2400 DPI.",
    image: "/images/gear/mouse.png",
    link: "https://www.amazon.in/Lenovo-M200-WW-GX30P93886-Mouse-Black/dp/B076GZ3CFC",
  },
  {
    name: "FINGERS SuperClicks K4",
    category: "Keyboard",
    note: "Wired multimedia USB keyboard — clicky enough.",
    image: "/images/gear/keyboard.png",
    link: "https://www.amazon.in/Fingers-SuperClicks-Wired-Multimedia-Keyboard/dp/B07SQGSHXH",
  },
  {
    name: "vivo V20 SE",
    category: "Phone",
    note: "Gravity Black · 128 GB · 8 GB RAM.",
    image: "/images/gear/mobile.png",
    link: "https://www.flipkart.com/vivo-v20-se-gravity-black-128-gb/p/itm5e8ddfe992958",
  },
  {
    name: "Samsung 32″ Series 4",
    category: "Display",
    note: "HD LED panel doubling as a second screen.",
    image: "/images/gear/ledscreen.png",
  },
];
