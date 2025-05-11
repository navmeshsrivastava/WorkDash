import './AboutPage.css';

export default function AboutPage() {
  return (
    <div className="about-container">
      <h1 className="about-title">About WorkDash</h1>

      <section className="about-section">
        <p>
          <strong>WorkDash</strong> is a modern task management web application
          built using the powerful <strong>MERN Stack</strong> (MongoDB,
          Express.js, React, and Node.js). It streamlines collaboration between{' '}
          <strong>Leads</strong> and <strong>Employees</strong> through
          structured task assignment, submission, and review.
        </p>
      </section>

      <section className="about-section">
        <h2 className="section-title">👤 User Roles</h2>

        <h3 className="role-title">🔹 Lead Role</h3>
        <ul className="feature-list">
          <li>Create and assign tasks with deadlines.</li>
          <li>Attach files (.pdf, .jpg, .png) to tasks.</li>
          <li>Access a "My Created Tasks" section to track task status.</li>
          <li>View task submissions and employee solutions.</li>
          <li>Delete tasks as needed.</li>
        </ul>

        <h3 className="role-title">🔹 Employee Role</h3>
        <ul className="feature-list">
          <li>View and complete tasks from the "See Tasks" section.</li>
          <li>Write code directly within the app using the Monaco Editor.</li>
          <li>See live previews for HTML, CSS, and JS tasks.</li>
          <li>Edit or undo submissions after completion.</li>
          <li>
            Prevent redundant actions with disabled buttons for completed tasks.
          </li>
        </ul>
      </section>

      <section className="about-section">
        <h2 className="section-title">⚙️ Application Features</h2>
        <ul className="feature-list">
          <li>Frontend error handling with proper feedback for users.</li>
          <li>404 page for invalid routes.</li>
          <li>
            Robust backend error handling that thoroughly checks for invalid or
            missing tasks, ensures users and roles are correctly authorized
            before any action (like create, delete, submit, or edit), and
            gracefully handles unauthorized access, malformed IDs, or duplicate
            submissions with clear, structured responses.
          </li>

          <li>JWT-based authentication and role-based authorization.</li>
          <li>Secure password handling with bcrypt.</li>
        </ul>
      </section>

      <section className="about-section">
        <h2 className="section-title">🛠️ Technologies Used</h2>
        <ul className="feature-list">
          <li>
            <strong>MongoDB</strong> – NoSQL database.
          </li>
          <li>
            <strong>Express.js</strong> – Backend server framework.
          </li>
          <li>
            <strong>React.js</strong> – Frontend UI library.
          </li>
          <li>
            <strong>Node.js</strong> – Server runtime environment.
          </li>
          <li>
            <strong>JWT & Bcrypt</strong> – For security and authentication.
          </li>
          <li>
            <strong>Monaco Editor</strong> – In-app code editing and preview
            experience.
          </li>
        </ul>
      </section>

      <section className="about-section">
        <h2 className="section-title">💡 Why WorkDash?</h2>
        <p>
          WorkDash is perfect for teams, organizations, or learning environments
          seeking a lightweight yet powerful system for assigning tasks,
          tracking progress, and managing workflows with clarity and control.
        </p>
      </section>
    </div>
  );
}
