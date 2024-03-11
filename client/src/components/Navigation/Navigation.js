import React from "react";

function Navigation() {
  return (
    <>
      <nav className="bg-primary text-center position-absolute top-0 start-0 end-0 shadow-sm">
        <div className="container-fluid">
          <a className="navbar-brand" href="#">
            <h1 className="text-white my-2">Link Slice</h1>
          </a>
        </div>
      </nav>
    </>
  );
}

export default Navigation;
