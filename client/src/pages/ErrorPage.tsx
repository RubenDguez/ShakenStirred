const ErrorPage = () => {
  return (
    <section
      style={{
        display: 'grid',
        placeContent: 'center',
        height: '98vh',
      }}
    >
      <div style={{
        display: "flex",
        alignItems: "center"
      }}>
        <h2 style={{
          paddingRight: '1rem',
          marginRight: '1rem',
          borderRight: '2px solid black'
        }}>404</h2>
        <p style={{
          textTransform: 'uppercase'
        }}>Page not found</p>
      </div>
    </section>
  );
};

export default ErrorPage;
