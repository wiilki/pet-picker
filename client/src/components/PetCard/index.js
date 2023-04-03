import React from 'react';

const PetCard = ({ name, breed, age, gender, location, image }) => {
    return (
        <div className="card">
            <div className="card-header">
                <h2>{name}</h2>
            </div>
            <div className="card-body">
                <img src={image} alt={name} />
                <ul>
                    {breed && (
                        <li>
                            <strong>Breed:</strong> {breed}
                        </li>
                    )}
                    <li>
                        <strong>Age:</strong> {age}
                    </li>
                    <li>
                        <strong>Gender:</strong> {gender}
                    </li>
                    <li>
                        <strong>Location:</strong> {location}
                    </li>
                </ul>
            </div>
        </div>
    );
};

export default PetCard;