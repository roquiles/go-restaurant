import { useState } from "react";
import { FiEdit3, FiTrash } from "react-icons/fi";
import api from "../../services/api";
import { Container } from "./styles";

interface FoodType {
  id: number;
  name: string;
  description: string;
  price: string;
  available: boolean;
  image: string;
}

interface FoodProps {
  id: number;
  food: FoodType;
  handleDelete: (id: number) => void;
  handleEditFood: (food: FoodType) => void;
}

export function FoodItem({
  id,
  food,
  handleDelete,
  handleEditFood,
}: FoodProps) {
  const [isAvailable, setIsAvailable] = useState(food.available);

  async function toggleAvailable() {
    await api.put(`/foods/${food.id}`, {
      ...food,
      available: !isAvailable,
    });
    setIsAvailable(!isAvailable);
  }

  function setEditingFood() {
    handleEditFood(food);
  }

  return (
    <Container available={isAvailable}>
      <header>
        <img src={food.image} alt={food.name} />
      </header>
      <section className="body">
        <h2>{food.name}</h2>
        <p>{food.description}</p>
        <p className="price">
          R$ <b>{food.price}</b>
        </p>
      </section>
      <section className="footer">
        <div className="icon-container">
          <button
            type="button"
            className="icon"
            onClick={setEditingFood}
            data-testid={`edit-food-${id}`}
          >
            <FiEdit3 size={20} />
          </button>

          <button
            type="button"
            className="icon"
            onClick={() => handleDelete(id)}
            data-testid={`remove-food-${id}`}
          >
            <FiTrash size={20} />
          </button>
        </div>

        <div className="availability-container">
          <p>{isAvailable ? "Disponível" : "Indisponível"}</p>

          <label htmlFor={`available-switch-${id}`} className="switch">
            <input
              id={`available-switch-${id}`}
              type="checkbox"
              checked={isAvailable}
              onChange={toggleAvailable}
              data-testid={`change-status-food-${id}`}
            />
            <span className="slider" />
          </label>
        </div>
      </section>
    </Container>
  );
}
