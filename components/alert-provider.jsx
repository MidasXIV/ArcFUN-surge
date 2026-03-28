import { createContext, useContext, useRef, useState } from "react";

const AlertContext = createContext({
  show: () => {},
  success: () => {},
  error: () => {}
});

const ALERT_STYLES = {
  info: "bg-gray-900 text-white",
  success: "bg-green-600 text-white",
  error: "bg-red-600 text-white"
};

export function AlertProvider({ children }) {
  const [alerts, setAlerts] = useState([]);
  const nextId = useRef(0);

  function pushAlert(type, message) {
    const id = nextId.current;
    nextId.current += 1;

    setAlerts((currentAlerts) => [...currentAlerts, { id, type, message }]);

    setTimeout(() => {
      setAlerts((currentAlerts) =>
        currentAlerts.filter((alert) => alert.id !== id)
      );
    }, 4000);
  }

  const api = {
    show: (message) => pushAlert("info", message),
    success: (message) => pushAlert("success", message),
    error: (message) => pushAlert("error", message)
  };

  return (
    <AlertContext.Provider value={api}>
      {children}
      <div className="fixed bottom-6 left-1/2 z-50 flex w-full max-w-sm -translate-x-1/2 flex-col gap-2 px-4">
        {alerts.map((alert) => (
          <div
            key={alert.id}
            className={`rounded-lg px-4 py-3 shadow-lg ${ALERT_STYLES[alert.type]}`}
          >
            {alert.message}
          </div>
        ))}
      </div>
    </AlertContext.Provider>
  );
}

export function useAlert() {
  return useContext(AlertContext);
}