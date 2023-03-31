import React, { useEffect } from "react";
import { useMutation, useQuery } from "@apollo/client";
import { useDispatch, useSelector } from "react-redux";
import {
  ADD_TO_FAVORITES,
  REMOVE_FROM_FAVORITES,
  TOGGLE_FAVORITES,
  UPDATE_FAVORITES,
} from "../utils/actions";
import {
  QUERY_FAVORITE_PETS,
  REMOVE_FAVORITE_PET,
} from "../utils/mutations";

const Favorites = () => {
  const dispatch = useDispatch();
  const { favorites, favoritesOpen } = useSelector((state) => state);

  const { loading, data } = useQuery(QUERY_FAVORITE_PETS);
  const [removeFavoritePet] = useMutation(REMOVE_FAVORITE_PET);

  useEffect(() => {
    if (data) {
      dispatch({
        type: UPDATE_FAVORITES,
        favorites: data.favoritePets,
      });
    } else if (!loading) {
      dispatch({
        type: UPDATE_FAVORITES,
        favorites: [],
      });
    }
  }, [data, loading, dispatch]);

  const removeFromFavorites = async (petId) => {
    try {
      const { data } = await removeFavoritePet({
        variables: { petId },
      });

      dispatch({
        type: REMOVE_FROM_FAVORITES,
        petId,
      });
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className={`favorites ${favoritesOpen && "open"}`}>
      <div className="favorites-header">
        <h2>Favorites</h2>
        <button
          className="close"
          onClick={() => dispatch({ type: TOGGLE_FAVORITES })}
        >
          Close
        </button>
      </div>

      <div className="favorites-list">
        {favorites.map((pet) => (
          <div key={pet.id} className="pet-card">
            <img
              src={
                pet.primary_photo_cropped
                  ? pet.primary_photo_cropped.small
                  : "https://via.placeholder.com/150"
              }
              alt={`${pet.name}`}
            />
            <div>
              <h3>{pet.name}</h3>
              <p>{pet.breed}</p>
              <button onClick={() => removeFromFavorites(pet.id)}>
                Remove
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Favorites;
