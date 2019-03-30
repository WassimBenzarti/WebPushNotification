import React, { useState, useEffect } from "react";
import ReactDOM from "react-dom";

import "./styles.css";
import usePushNotification from "./common/usePushNotification/usePushNotification";

const applicationServerPublicKey =
  "BDHN8DmrU50geNd3NQnSjVu5Tk7cOYxnMzfXuHvBKXjUrp0Av9-ByjF_Ey3zSjPVQ_WMgbnc1dsod_lrojjKPwE";

function App() {
  const { isSubscribed, subscription, subscribeToPush } = usePushNotification(
    "serviceWorker.js"
  );
  const [input, setInput] = useState("");

  useEffect(
    () => {
      subscription &&
        fetch("https://o7l4zmxoxq.sse.codesandbox.io/subscribe", {
          method: "post",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(subscription)
        });
    },
    [subscription]
  );

  return (
    <div className="App">
      <h1>Hello CodeSandbox</h1>
      <h2>Notifications {isSubscribed ? "active" : "not active"}</h2>

      <button onClick={() => subscribeToPush(applicationServerPublicKey)}>
        {isSubscribed ? "Disable" : "Enable"} notifications
      </button>
      <br />
      <textarea onChange={e => setInput(e.target.value)} />
      <br />
      <button
        onClick={() =>
          fetch("https://o7l4zmxoxq.sse.codesandbox.io/push?msg=" + input)
        }
      >
        Push notifications
      </button>
    </div>
  );
}

const rootElement = document.getElementById("root");
ReactDOM.render(<App />, rootElement);
