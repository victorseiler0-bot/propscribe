"use client";
import { useState } from "react";
import { Input, Textarea } from "@/components/ui/Input";
import Button from "@/components/ui/Button";

export default function Contact() {
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    await new Promise((r) => setTimeout(r, 1200));
    setLoading(false);
    setSubmitted(true);
  };

  return (
    <section id="contact" className="relative py-24">
      <div className="max-w-xl mx-auto px-6">
        <div className="text-center mb-12">
          <span className="inline-block text-xs font-medium text-amber-400 uppercase tracking-[0.15em] mb-4">
            Support
          </span>
          <h2 className="text-4xl font-bold text-white mb-4 tracking-tight">Get in touch</h2>
          <p className="text-slate-400">We typically respond within 24 hours.</p>
        </div>

        {submitted ? (
          <div className="rounded-2xl border border-emerald-500/20 bg-emerald-500/[0.06] p-10 text-center">
            <div className="w-12 h-12 rounded-full bg-emerald-500/20 flex items-center justify-center mx-auto mb-4">
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#10b981" strokeWidth="2">
                <path d="M5 13l4 4L19 7" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </div>
            <h3 className="text-white font-semibold mb-2">Message sent!</h3>
            <p className="text-slate-400 text-sm">We'll get back to you within 24 hours.</p>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-5 glass rounded-2xl p-8">
            <div className="grid sm:grid-cols-2 gap-5">
              <Input label="Name" placeholder="Alex Johnson" required />
              <Input label="Email" type="email" placeholder="alex@agency.com" required />
            </div>
            <Input label="Subject" placeholder="How can we help?" required />
            <Textarea
              label="Message"
              placeholder="Tell us more..."
              rows={5}
              required
            />
            <Button type="submit" variant="primary" size="md" loading={loading} className="w-full">
              Send Message
            </Button>
          </form>
        )}
      </div>
    </section>
  );
}
