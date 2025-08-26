import { useState } from "react";
import "../Styles/ReservationCard.scss";

export default function ReservationCard() {
  const [form, setForm] = useState({
    name: "",
    persons: "",
    phone: "",
    email: "",
  });

  const [errors, setErrors] = useState({
    name: "",
    persons: "",
    phone: "",
    email: "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
    setErrors({ ...errors, [e.target.name]: "" }); // clear error on input
  };

  const validate = () => {
    let valid = true;
    const newErrors: typeof errors = { name: "", persons: "", phone: "", email: "" };

    if (!form.name.trim()) {
      newErrors.name = "Name is required";
      valid = false;
    }

    const personsNum = parseInt(form.persons, 10);
    if (!form.persons || isNaN(personsNum) || personsNum < 1) {
      newErrors.persons = "Enter a valid number of persons";
      valid = false;
    }

    if (!form.phone.trim() || !/^\+?[0-9]{7,15}$/.test(form.phone)) {
      newErrors.phone = "Enter a valid phone number";
      valid = false;
    }

    if (!form.email.trim() || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) {
      newErrors.email = "Enter a valid email";
      valid = false;
    }

    setErrors(newErrors);
    return valid;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (validate()) {
      alert("Reservation submitted!");
      setForm({ name: "", persons: "", phone: "", email: "" }); // reset form
    }
  };

  return (
    <div className="reservation-card" id="reserve">
      <h2>Reserve a Table</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          name="name"
          placeholder="Your Name"
          value={form.name}
          onChange={handleChange}
        />
        {errors.name && <span className="error">{errors.name}</span>}

        <input
          type="number"
          name="persons"
          placeholder="Number of Persons"
          value={form.persons}
          onChange={handleChange}
          min="1"
        />
        {errors.persons && <span className="error">{errors.persons}</span>}

        <input
          type="tel"
          name="phone"
          placeholder="Phone Number"
          value={form.phone}
          onChange={handleChange}
        />
        {errors.phone && <span className="error">{errors.phone}</span>}

        <input
          name="email"
          placeholder="Email Address"
          value={form.email}
          onChange={handleChange}
        />
        {errors.email && <span className="error">{errors.email}</span>}
        <button type="submit">Reserve</button>
      </form>
    </div>
  );
}
