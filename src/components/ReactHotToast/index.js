import React from "react";
import toast, { Toaster, useToasterStore } from "react-hot-toast";
import styles from "./ReactHotToast.module.scss";

// HOW TO USE
// TO DISPATCH A INFO TOAST (BLUE COLOR) -> RUN toast("toastMessage")
// TO DISPATCH A ERROR TOAST (RED COLOR) -> RUN toast.error("toastMessage")
// TO DISPATCH A SUCCESS TOAST (GREEN COLOR) -> RUN toast.success("toastMessage")

const ReactHotToast = () => {
  // TOAST POSITION
  const toastPosition = "top-center";
  const toastDuration = 2000;
  const toastLimit = 1;

  const { toasts } = useToasterStore();

  // LIMITING THE NUMBER OF TOASTS TO SHOW AT A TIME
  React.useEffect(() => {
    toasts
      .filter((t) => t.visible) // Only consider visible toasts
      .filter((_, i) => i >= toastLimit) // Is toast index over limit?
      .forEach((t) => toast.dismiss(t.id)); // Dismiss – Use toast.remove(t.id) for no exit animation
  }, [toasts]);

  return (
    <Toaster
      position={toastPosition}
      toastOptions={{
        duration: toastDuration,
        className: styles.reactHotToast,
        success: {
          className: `${styles.reactHotToast} ${styles["reactHotToast--success"]}`,
        },
        error: {
          className: `${styles.reactHotToast} ${styles["reactHotToast--error"]}`,
          icon: null,
        },
      }}
    />
  );
};

export default ReactHotToast;
