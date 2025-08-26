import breakfastImg from "../assets/Breakfast.jpg";
import lunchImg from "../assets/Lunch.jpg";
import dinnerImg from "../assets/Dinner.jpg";

export interface MenuItem {
  title: string;
  description: string;
  image: string;
}

export const menuItems: MenuItem[] = [
  {
    title: "Breakfast",
    description: "Start your day with our fresh and healthy breakfast options.",
    image: breakfastImg,
  },
  {
    title: "Lunch",
    description:
      "Enjoy our delicious lunch specials, perfect for any appetite.",
    image: lunchImg,
  },
  {
    title: "Dinner",
    description:
      "Relax with a delightful dinner experience with family and friends.",
    image: dinnerImg,
  },
];
