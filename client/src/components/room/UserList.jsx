export default function UserList({ users }) {
  return (
    <div className="users-list">
      <h3>Joined Users</h3>
      <ul>
        {users.map((user, index) => {
          if (!user) return null;
          return <li key={index}>User ID: {user}</li>;
        })}
      </ul>
    </div>
  );
}
