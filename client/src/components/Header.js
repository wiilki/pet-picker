import AppNavbar from "./Navbar";
import heroImage from '../images/PetPickerLogo.png'
import '../styles/navbar.css'

const Header = () => {

    return (
        <header className="text-light bg-dark p-2">
            <AppNavbar />
            <div className="hero-container">
                <img src={heroImage} alt="Pet Picker Logo" />
            </div>
        </header>
    );
};

export default Header;
