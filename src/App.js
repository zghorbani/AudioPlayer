import React from "react";
import { FullControl } from "./players";

class App extends React.Component {
  render() {
    return (
      <div className="container">
        
        <div className="players">
          <section>
            <FullControl />
          </section>
        </div>
      </div>
    );
  }
}

export default App;
