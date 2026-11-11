import { useEffect } from "react";
import homepageContent from "@/assets/homepage-content.html?raw";

const HomepageRenderer = () => {
  useEffect(() => {
    const menuButton = document.querySelector<HTMLButtonElement>(".menu-btn");
    const navigation = document.getElementById("nav");
    const closeMenu = () => {
      navigation?.classList.remove("open");
      menuButton?.setAttribute("aria-expanded", "false");
    };

    const toggleMenu = () => {
      const isOpen = navigation?.classList.toggle("open") ?? false;
      menuButton?.setAttribute("aria-expanded", String(isOpen));
    };

    menuButton?.addEventListener("click", toggleMenu);
    navigation?.addEventListener("click", closeMenu);

    const formCleanups = Array.from(document.querySelectorAll<HTMLFormElement>("form[data-form]")).map((form) => {
      const handleSubmit = (event: SubmitEvent) => {
        event.preventDefault();
        const values = Object.fromEntries(new FormData(form).entries());
        const name = String(values.name ?? "").trim();
        const phone = String(values.phone ?? "").trim();
        const message = form.querySelector<HTMLElement>(".form-msg");

        if (!name || !phone) {
          if (message) message.textContent = "Please add your name and phone number so we can call you back.";
          return;
        }

        const emailBody = [
          `Name: ${name}`,
          `Phone: ${phone}`,
          values.email ? `Email: ${values.email}` : "",
          values.suburb ? `Suburb: ${values.suburb}` : "",
          values.service ? `Service: ${values.service}` : "",
          values.message ? `\n${values.message}` : "",
        ].filter(Boolean).join("\n");
        const subject = `Quote request: ${values.service || "Air conditioning"}${values.suburb ? ` (${values.suburb})` : ""}`;
        window.location.href = `mailto:aircooldynamics@gmail.com?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(emailBody)}`;
      };

      form.addEventListener("submit", handleSubmit);
      return () => form.removeEventListener("submit", handleSubmit);
    });

    return () => {
      menuButton?.removeEventListener("click", toggleMenu);
      navigation?.removeEventListener("click", closeMenu);
      formCleanups.forEach((cleanup) => cleanup());
    };
  }, []);

  return <div dangerouslySetInnerHTML={{ __html: homepageContent }} />;
};

export default HomepageRenderer;
