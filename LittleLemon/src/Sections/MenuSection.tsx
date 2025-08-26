import "../Styles/MenuSection.scss";
import type { MenuItem } from "../Info/menuData";

interface MenuSectionProps {
  items: MenuItem[];
}

export default function MenuSection({ items }: MenuSectionProps) {
  return (
    
    <section className="menu-section" id="menu">
        <section className="hero-text">
          <h1>Welcome to Our Restaurant</h1>
          <p>
            Discover our carefully crafted meals made with fresh ingredients.
            Whether it’s breakfast, lunch, or dinner, we have something for every occasion.
          </p>
        </section>
        <div className="menu-section-items">
            {items.map((item, index) => (
              <div className="menu-card" key={index}>
                <img className="menu-image" src={item.image} alt={item.title} />
                <h3>{item.title}</h3>
                <p>{item.description}</p>
              </div>
            ))}
        </div>
    </section>
  );
}
