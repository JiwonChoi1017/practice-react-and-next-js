import { useContext, useRef } from "react";

import { NotificationContext } from "@/store/notification-context";
import classes from "./newsletter-registration.module.css";

const NewsletterRegistration = () => {
  const emailInputRef = useRef<HTMLInputElement>(null);
  const { showNotification } = useContext(NotificationContext);

  const registrationHandler = (event: React.FormEvent) => {
    event.preventDefault();

    const enteredEmail = emailInputRef.current?.value;
    showNotification({
      title: "Signing up...",
      message: "Registering for newsletter.",
      status: "pending",
    });

    fetch("/api/newsletter", {
      method: "POST",
      body: JSON.stringify({ email: enteredEmail }),
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((response) => {
        if (response.ok) {
          return response.json();
        }

        response.json().then((data) => {
          showNotification({
            title: "Error!",
            message: data.message || "Something went wrong!",
            status: "error",
          });
        });
      })
      .then((data) => {
        showNotification({
          title: "Success!",
          message: "Successfully registered for newsletter.",
          status: "success",
        });
      });
  };

  return (
    <section className={classes.newsletter}>
      <h2>Sign up to stay updated!</h2>
      <form onSubmit={registrationHandler}>
        <div className={classes.control}>
          <input
            ref={emailInputRef}
            type="email"
            id="email"
            placeholder="Your email"
            aria-label="Your email"
          />
          <button>Register</button>
        </div>
      </form>
    </section>
  );
};

export default NewsletterRegistration;
