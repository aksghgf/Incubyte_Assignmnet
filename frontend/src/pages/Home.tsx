import './Home.css';

function Home() {
    return (
        <div className="home">
            <div className="container">
                <div className="hero">
                    <h1>Welcome to Sweet Shop</h1>
                    <p className="hero-subtitle">
                        Discover delicious sweets and treats!
                    </p>
                </div>

                <div className="features">
                    <div className="feature-card">
                        <div className="feature-icon">🍭</div>
                        <h3>Wide Selection</h3>
                        <p>Browse through our extensive collection of sweets</p>
                    </div>
                    <div className="feature-card">
                        <div className="feature-icon">🛒</div>
                        <h3>Easy Ordering</h3>
                        <p>Simple and secure checkout process</p>
                    </div>
                    <div className="feature-card">
                        <div className="feature-icon">⚡</div>
                        <h3>Quick Delivery</h3>
                        <p>Get your sweets delivered fast</p>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Home;
