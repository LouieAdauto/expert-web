import { UserMenu } from "./UserMenu";

function Toolbar() {
  return (
    <div className="absolute top-0 right-0 left-0 flex justify-between items-center px-8 py-4">
      <div /> {/* espacio */}
      <UserMenu />
    </div>
  );
}

export default Toolbar;
