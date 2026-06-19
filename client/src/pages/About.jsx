import '../styles/pages.css';

export default function About() {
  return (
    <>
      <header className="page-header">
        <div className="container">
          <span className="section-label">Our Story</span>
          <h1 className="section-title">About Savory Haven</h1>
          <p className="section-subtitle" style={{ margin: '0 auto' }}>
            A passion for food, a commitment to excellence, and a love for hospitality.
          </p>
        </div>
      </header>

      <section className="section">
        <div className="container about-grid">
          <div className="about-image">
            <img
              src="https://images.unsplash.com/photo-1555396273-367ea4eb4db5?w=800&q=80"
              alt="Restaurant interior"
            />
          </div>
          <div className="about-text">
            <span className="section-label">Since 2010</span>
            <h2 className="section-title">A Legacy of Flavor</h2>
            <p>
              Savory Haven was born from a simple belief: that great food has the power
              to bring people together. Founded by Chef Marco Delgado, our restaurant
              has grown from a small bistro into one of the city's most beloved dining
              destinations.
            </p>
            <p>
              Every dish on our menu tells a story — of the farmers who grow our
              produce, the artisans who craft our ingredients, and the team that
              transforms them into culinary art. We source locally whenever possible
              and import the finest specialty items from around the world.
            </p>
            <p>
              Our kitchen is led by Executive Chef Elena Vasquez, whose innovative
              approach blends classic techniques with modern flair. Under her guidance,
              Savory Haven earned its first Michelin star in 2018 and continues to
              push the boundaries of fine dining.
            </p>

            <div className="about-stats">
              <div>
                <div className="stat-number">15+</div>
                <div className="stat-label">Years of Excellence</div>
              </div>
              <div>
                <div className="stat-number">1</div>
                <div className="stat-label">Michelin Star</div>
              </div>
              <div>
                <div className="stat-number">50k+</div>
                <div className="stat-label">Happy Guests</div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
