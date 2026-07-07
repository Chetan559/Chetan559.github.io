"use client";

import { useState } from "react";
import emailjs from "@emailjs/browser";

type Status = "idle" | "sending" | "sent" | "error";

const inputClass =
  "w-full border-b border-line bg-transparent py-3 text-fg outline-none transition-colors placeholder:text-muted/60 focus:border-accent dark:border-line-dark dark:text-fg-dark dark:placeholder:text-muted-dark/60";

export function ContactForm() {
  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
    message: "",
  });
  const [status, setStatus] = useState<Status>("idle");

  function onChange(
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) {
    setForm({ ...form, [e.target.name]: e.target.value });
  }

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    setStatus("sending");
    try {
      await emailjs.send(
        process.env.NEXT_PUBLIC_EMAILJS_SERVICE_ID!,
        process.env.NEXT_PUBLIC_EMAILJS_TEMPLATE_ID!,
        {
          from_name: form.name,
          reply_to: form.email,
          phone: form.phone,
          message: form.message,
        },
        { publicKey: process.env.NEXT_PUBLIC_EMAILJS_PUBLIC_KEY! }
      );
      setStatus("sent");
      setForm({ name: "", email: "", phone: "", message: "" });
    } catch {
      setStatus("error");
    }
  }

  const buttonLabel = {
    idle: "Send Message",
    sending: "Sending…",
    sent: "Sent ✓",
    error: "Try Again",
  }[status];

  return (
    <form onSubmit={onSubmit} className="max-w-xl space-y-8">
      <div>
        <label htmlFor="name" className="mb-1 block text-sm font-medium uppercase tracking-widest text-muted dark:text-muted-dark">
          Name
        </label>
        <input
          id="name"
          name="name"
          required
          value={form.name}
          onChange={onChange}
          placeholder="Your name"
          className={inputClass}
        />
      </div>
      <div>
        <label htmlFor="email" className="mb-1 block text-sm font-medium uppercase tracking-widest text-muted dark:text-muted-dark">
          Email
        </label>
        <input
          id="email"
          name="email"
          type="email"
          required
          value={form.email}
          onChange={onChange}
          placeholder="you@example.com"
          className={inputClass}
        />
      </div>
      <div>
        <label htmlFor="phone" className="mb-1 block text-sm font-medium uppercase tracking-widest text-muted dark:text-muted-dark">
          Phone <span className="normal-case">(optional)</span>
        </label>
        <input
          id="phone"
          name="phone"
          type="tel"
          value={form.phone}
          onChange={onChange}
          placeholder="+91 …"
          className={inputClass}
        />
      </div>
      <div>
        <label htmlFor="message" className="mb-1 block text-sm font-medium uppercase tracking-widest text-muted dark:text-muted-dark">
          Message
        </label>
        <textarea
          id="message"
          name="message"
          required
          rows={5}
          value={form.message}
          onChange={onChange}
          placeholder="What are we building?"
          className={inputClass}
        />
      </div>

      <div className="flex items-center gap-4">
        <button
          type="submit"
          disabled={status === "sending"}
          data-cursor="hover"
          className="inline-flex h-12 items-center justify-center rounded bg-fg px-6 text-sm font-medium text-bg transition-colors hover:bg-[#1A1A1A] disabled:opacity-60 dark:bg-fg-dark dark:text-bg-dark dark:hover:bg-[#E5E5E5]"
        >
          {buttonLabel}
        </button>
        <p aria-live="polite" className="text-sm">
          {status === "sent" && (
            <span className="text-accent">Thanks — I&apos;ll get back to you soon.</span>
          )}
          {status === "error" && (
            <span className="text-[#C9372C]">
              Something went wrong. Please try again or email me directly.
            </span>
          )}
        </p>
      </div>
    </form>
  );
}
