export default function Footer() {
  return (
    <footer
      style={{
        backgroundColor: '#1e88e5',
        color: '#fff',
        textAlign: 'center',
        padding: '1rem',
      }}
    >
      © {new Date().getFullYear()} WorkDash. All rights reserved.
    </footer>
  );
}
