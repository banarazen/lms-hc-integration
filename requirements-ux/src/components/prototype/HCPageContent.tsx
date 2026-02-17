"use client";

import { useState, useCallback, useEffect } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { usePrototypeUI } from "./PrototypeUI";
import { NavCrosshair } from "./NavCrosshair";

const SIDEBAR_BG = "#141c2b";
const PRIMARY = "#1a8a8a";

const guests = [
  { id: "phone-lead", name: "+1 (407) 203-8926", status: "Hi! I saw your ad for the f...", time: "1:43 pm", isLead: true },
  { id: "anna", name: "Anna Duke", status: "Inbound call", time: "1:30 pm", isLead: false },
  { id: "sarah", name: "Sarah Clark", status: "Chat with smartbot", time: "1:12 pm", isLead: false },
  { id: "mike", name: "Mike Ross", status: "Outbound call", time: "12:10 pm", isLead: true },
  { id: "linda", name: "Linda Thomas", status: "Joined waitlist", time: "11:58 am", isLead: false },
  { id: "lily", name: "Lily White", status: "Booking cancelled/No show", time: "11:23 am", isLead: true },
  { id: "john", name: "John Perry", status: "Appointment notes added", time: "10:45 am", isLead: true },
];

export function HCPageContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const fromLms = searchParams.get("from") === "lms";
  const guestParam = searchParams.get("guest");
  const { showToast, showSync, hideSync } = usePrototypeUI();
  const [selectedGuest, setSelectedGuest] = useState(guests[1]); // Anna Duke default
  const [messageInput, setMessageInput] = useState("");
  const [navCrosshair, setNavCrosshair] = useState<string | null>(null);
  const [hcMessages, setHcMessages] = useState<Array<{ text: string; time: string }>>([]);

  useEffect(() => {
    if (fromLms) showToast(`Navigated from LMS${guestParam ? ` → ${decodeURIComponent(guestParam)}` : ""}`, "info");
  }, [fromLms, guestParam, showToast]);

  const navigateToLMS = useCallback(() => {
    setNavCrosshair("Opening AI Lead Manager → Membership Lead...");
    setTimeout(() => {
      setNavCrosshair(null);
      router.push("/lms?lead=Membership%20Lead&from=hc");
    }, 1200);
  }, [router]);

  const sendMessage = useCallback(() => {
    const text = messageInput.trim();
    if (!text) return;
    setMessageInput("");
    setHcMessages((m) => [{ text, time: "just now" }, ...m]);
    showSync("Syncing SMS to AI Lead Manager...");
    setTimeout(() => {
      hideSync();
      showToast("Message sent & synced to all active leads in LMS", "success");
    }, 1500);
  }, [messageInput, showToast, showSync, hideSync]);

  return (
    <div className="flex h-full" style={{ background: "#f5f6f8" }}>
      {/* Sidebar */}
      <nav className="flex w-14 shrink-0 flex-col items-center gap-1 py-3" style={{ background: SIDEBAR_BG }}>
        <div className="mb-2 flex h-10 w-10 items-center justify-center text-xl font-extrabold text-[#1a8a8a]">HC</div>
        {["🏠", "☷", "👥", "📞", "📅", "💬", "🤖", "📊"].map((icon, i) => (
          <button
            key={icon}
            type="button"
            className={`flex h-10 w-10 items-center justify-center rounded-lg text-lg transition-colors hover:bg-white/10 ${
              i === 2 ? "bg-teal-500/15 text-[#1a8a8a]" : "text-[#6b7689]"
            }`}
          >
            {icon}
          </button>
        ))}
        <div className="flex-1" />
        <button type="button" className="flex h-10 w-10 items-center justify-center rounded-lg text-[#6b7689] hover:bg-white/10">⚙</button>
      </nav>

      <div className="flex flex-1 flex-col min-h-0">
        {/* Top bar */}
        <div className="flex h-14 items-center justify-between border-b border-[#e0e4ea] bg-white px-5">
          <div className="flex items-center gap-3">
            <div className="flex h-8 w-8 items-center justify-center rounded-full bg-[#7b6ea8] text-xs font-semibold text-white">
              {selectedGuest.name.split(" ").map((n) => n[0]).join("")}
            </div>
            <div>
              <div className="text-base font-semibold">{selectedGuest.name}&apos;s Timeline</div>
              <div className="text-xs text-[#6b7689]">Center: Boston</div>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <select className="rounded-md border border-[#e0e4ea] px-2.5 py-1.5 text-sm">
              <option>South Granville</option>
              <option>Albertville</option>
            </select>
            <div className="flex h-8 w-8 items-center justify-center rounded-full bg-[#4a7fa5] text-xs font-semibold text-white">SJ</div>
          </div>
        </div>

        <div className="flex flex-1 min-h-0">
          {/* Left: Guest list */}
          <div className="flex w-80 shrink-0 flex-col border-r border-[#e0e4ea] bg-white">
            <div className="flex items-center justify-between border-b border-[#e0e4ea] px-4 py-3">
              <span className="text-sm font-semibold">Leads and guests ▾</span>
              <div className="flex gap-2">
                <button type="button" className="text-[#6b7689]">☷</button>
                <button type="button" className="text-[#6b7689]">🔍</button>
              </div>
            </div>
            <div className="px-4 py-2 text-[11px] font-semibold uppercase tracking-wide text-[#6b7689]">Recent</div>
            <div className="flex-1 overflow-y-auto">
              {guests.map((g) => (
                <div
                  key={g.id}
                  onClick={() => setSelectedGuest(g)}
                  className={`flex cursor-pointer items-center gap-2.5 border-b border-[#f5f6f8] px-4 py-2.5 transition-colors hover:bg-[#f5f6f8] ${
                    selectedGuest.id === g.id ? "border-l-4 border-l-[#1a8a8a] bg-[#edf5f5]" : ""
                  }`}
                >
                  <div className="relative flex h-10 w-10 shrink-0 items-center justify-center rounded-full text-sm font-semibold text-white" style={{ background: "#4a7fa5" }}>
                    {g.name.startsWith("+") ? "+1" : g.name.split(" ").map((n) => n[0]).join("")}
                    {g.isLead && (
                      <span className="absolute -bottom-0.5 -right-0.5 flex h-4 w-4 items-center justify-center rounded-full border-2 border-white bg-[#c04b30] text-[8px] font-bold text-white">
                        L
                      </span>
                    )}
                  </div>
                  <div className="min-w-0 flex-1">
                    <div className="flex items-center gap-1.5 text-sm font-semibold">
                      {g.name}
                      {g.isLead && (
                        <span className="rounded border border-[#e8816a] bg-[#fce8e3] px-1.5 py-0.5 text-[10px] font-bold uppercase tracking-wide text-[#c04b30]">
                          LEAD
                        </span>
                      )}
                    </div>
                    <div className="truncate text-xs text-[#6b7689]">{g.status}</div>
                  </div>
                  <div className="text-right text-[11px] text-[#6b7689]">{g.time}</div>
                </div>
              ))}
            </div>
          </div>

          {/* Center: Timeline */}
          <div className="flex min-w-0 flex-1 flex-col bg-[#f5f6f8]">
            <div className="flex items-center justify-between border-b border-[#e0e4ea] bg-white px-5 py-3">
              <div>
                <div className="text-base font-semibold">{selectedGuest.name}</div>
                <div className="text-sm text-[#1a8a8a] cursor-pointer">Assign tags</div>
              </div>
              <div className="flex gap-2">
                <button type="button" className="flex h-10 w-10 items-center justify-center rounded-full bg-[#1a8a8a] text-white">📞</button>
                <button type="button" className="flex items-center gap-1.5 rounded-md bg-[#1a8a8a] px-4 py-2 text-sm font-medium text-white">📝 New</button>
                <button type="button" className="flex h-10 w-10 items-center justify-center rounded-full bg-[#f0f2f5] text-[#6b7689]">⋮</button>
              </div>
            </div>
            <div className="flex-1 overflow-y-auto p-5">
              {/* Google review */}
              <div className="mb-4">
                <div className="mb-1 flex items-center justify-between text-xs text-[#6b7689]">
                  <span>Anna Duke - not linked</span>
                  <span>4:20 pm</span>
                </div>
                <div className="rounded-xl border border-[#e0e4ea] bg-white p-3.5">
                  <div className="mb-2 flex items-center gap-2">
                    <span className="text-lg text-[#4a7fa5]">G</span>
                    <span className="font-semibold">Google review</span>
                    <span className="ml-auto text-[#c4a050]">★★★★★ 5.0</span>
                  </div>
                  <p className="text-sm leading-relaxed text-[#4d5768]">
                    Had an amazing experience with my haircut and hair color! The stylist really listened...
                    <span className="cursor-pointer text-[#1a8a8a]">Read more</span>
                  </p>
                </div>
              </div>

              {/* New lead created - clickable to LMS */}
              <div className="mb-4">
                <div className="mb-1 flex items-center justify-between text-xs text-[#6b7689]">
                  <span>System · <span className="rounded bg-[#ece5f3] px-1.5 py-0.5 text-[10px] font-medium text-[#6b5a8e]">via LMS</span></span>
                  <span>2:15 pm</span>
                </div>
                <button
                  type="button"
                  onClick={navigateToLMS}
                  className="w-full rounded-xl border border-[#e0cdb3] bg-gradient-to-br from-[#faf5ee] to-[#f5efe3] p-3.5 text-left transition-shadow hover:shadow-md"
                >
                  <div className="flex items-center gap-1.5 text-sm font-semibold text-[#7a5c2e]">📋 New lead created: Membership Lead</div>
                  <div className="mt-1 text-sm text-[#1a8a8a]">View in AI Lead Manager ↗</div>
                </button>
              </div>

              {/* Synced SMS from LMS */}
              <div className="mb-4">
                <div className="mb-1 flex items-center justify-between text-xs text-[#6b7689]">
                  <span>Sarah Johnson <span className="rounded bg-[#ece5f3] px-1.5 py-0.5 text-[10px] font-medium text-[#6b5a8e]">via LMS</span></span>
                  <span>2:10 pm</span>
                </div>
                <div className="flex justify-end">
                  <div className="max-w-[75%] rounded-xl rounded-br rounded-tr rounded-bl bg-[#1a8a8a] px-3.5 py-2.5 text-sm text-white">
                    Hello! Thank you for your interest in our full body laser service. I&apos;d love to discuss the treatment details and pricing with you.
                  </div>
                </div>
              </div>

              <div className="my-4 text-center text-xs text-[#6b7689]">TODAY</div>

              {/* Inbound call */}
              <div className="mb-4">
                <div className="mb-1 flex items-center justify-between text-xs text-[#6b7689]">
                  <span>Anna Duke</span>
                  <span>1:30 pm</span>
                </div>
                <div className="overflow-hidden rounded-xl border border-[#e0e4ea] bg-white">
                  <div className="flex items-center justify-between px-3.5 py-3">
                    <span className="text-sm font-semibold">Inbound call</span>
                    <div className="flex items-center gap-2 text-xs">
                      <span className="font-medium text-[#2d9e6a]">Positive</span>
                      <span>4 min 34 sec</span>
                      <span>▶</span>
                    </div>
                  </div>
                  <div className="px-3.5 pb-3 text-xs text-[#6b7689]">With: Diana · Center: Albertville, AL</div>
                  <div className="flex items-center gap-2 bg-[#f5f6f8] px-3.5 py-2">
                    <button type="button" className="flex h-8 w-8 items-center justify-center rounded-full bg-[#1a8a8a] text-white">▶</button>
                    <div className="h-1 flex-1 overflow-hidden rounded-full bg-[#e0e4ea]">
                      <div className="h-full w-1/3 rounded-full bg-[#1a8a8a]" />
                    </div>
                  </div>
                </div>
              </div>

              {/* Synced AI Call from LMS */}
              <div className="mb-4">
                <div className="mb-1 flex items-center justify-between text-xs text-[#6b7689]">
                  <span>AI Agent <span className="rounded bg-[#ece5f3] px-1.5 py-0.5 text-[10px] font-medium text-[#6b5a8e]">via LMS</span></span>
                  <span>9:15 am</span>
                </div>
                <div className="overflow-hidden rounded-xl border border-[#e0e4ea] bg-white">
                  <div className="flex items-center justify-between px-3.5 py-3">
                    <span className="text-sm font-semibold">🤖 AI Call (Follow-up)</span>
                    <div className="flex items-center gap-2 text-xs">
                      <span className="font-medium text-[#2d9e6a]">Positive</span>
                      <span>2 min 34 sec</span>
                    </div>
                  </div>
                  <div className="px-3.5 pb-3 text-xs text-[#6b7689]">Automated appointment follow-up. Lead interested in membership pricing.</div>
                  <div className="flex items-center gap-2 bg-[#f5f6f8] px-3.5 py-2">
                    <button type="button" className="flex h-8 w-8 items-center justify-center rounded-full bg-[#1a8a8a] text-white">▶</button>
                    <div className="h-1 flex-1 overflow-hidden rounded-full bg-[#e0e4ea]">
                      <div className="h-full w-3/5 rounded-full bg-[#1a8a8a]" />
                    </div>
                  </div>
                </div>
              </div>

              {/* User-sent messages */}
              {hcMessages.map((msg, i) => (
                <div key={i} className="mb-4">
                  <div className="mb-1 flex items-center justify-between text-xs text-[#6b7689]">
                    <span>You</span>
                    <span>{msg.time}</span>
                  </div>
                  <div className="flex justify-end">
                    <div className="max-w-[75%] rounded-xl rounded-br rounded-tr rounded-bl bg-[#1a8a8a] px-3.5 py-2.5 text-sm text-white">
                      {msg.text}
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Messaging */}
            <div className="border-t border-[#e0e4ea] bg-white p-5">
              <div className="mb-2 flex items-center justify-between">
                <div className="flex overflow-hidden rounded-lg border border-[#e0e4ea]">
                  <button type="button" className="bg-[#1a8a8a] px-3.5 py-1.5 text-sm text-white">Reply</button>
                  <button type="button" className="border-l border-[#e0e4ea] bg-[#f5f6f8] px-3.5 py-1.5 text-sm">Private note</button>
                </div>
                <div className="flex items-center gap-2 text-sm">
                  <span className="text-[#6b7689]">✉</span>
                  <span className="text-sm">SMS</span>
                  <span className="text-[10px] text-[#8895a7]">▾</span>
                </div>
              </div>
              <div className="flex gap-2 items-end">
                <textarea
                  placeholder="Type message here"
                  value={messageInput}
                  onChange={(e) => setMessageInput(e.target.value)}
                  onKeyDown={(e) => { if (e.key === "Enter" && !e.shiftKey) { e.preventDefault(); sendMessage(); } }}
                  className="min-h-[40px] flex-1 resize-none rounded-lg border border-[#e0e4ea] px-3 py-2.5 text-sm outline-none focus:border-[#1a8a8a]"
                  rows={1}
                />
                <div className="flex gap-1">
                  <button type="button" className="flex h-8 w-8 items-center justify-center rounded-md bg-[#f0f2f5] text-[#6b7689]">📄</button>
                  <button type="button" className="flex h-8 w-8 items-center justify-center rounded-md bg-[#f0f2f5] text-[#6b7689]">📎</button>
                  <button type="button" className="flex h-8 w-8 items-center justify-center rounded-md bg-[#f0f2f5] text-[#6b7689]">📷</button>
                  <button type="button" className="flex h-8 w-8 items-center justify-center rounded-md bg-[#f0f2f5] text-[#6b7689]">😊</button>
                  <button type="button" onClick={sendMessage} className="flex h-8 w-8 items-center justify-center rounded-md bg-[#1a8a8a] text-white">➤</button>
                </div>
              </div>
            </div>
          </div>

          {/* Right: Guest profile */}
          <div className="flex w-[340px] shrink-0 flex-col overflow-y-auto border-l border-[#e0e4ea] bg-white">
            <div className="border-b border-[#e0e4ea] p-5 text-center">
              <div className="mx-auto mb-2.5 flex h-16 w-16 items-center justify-center rounded-full bg-[#7b6ea8] text-2xl font-semibold text-white">
                {selectedGuest.name.split(" ").map((n) => n[0]).join("")}
              </div>
              <div className="text-base font-semibold">{selectedGuest.name}</div>
              <div className="text-xs text-[#6b7689]">annaduke@gmail.com | +1 580-368-2040</div>
              <div className="mt-1 text-xs text-[#6b7689]">💬 23 Apr, 2024 · 📍 Albertville, AL</div>
              <div className="mt-2.5 flex flex-wrap justify-center gap-1.5">
                <span className="rounded-full border border-[#9ccfb0] bg-[#e2f2e9] px-2.5 py-1 text-[11px] font-medium text-[#2d7a52]">High spender</span>
                <span className="rounded-full border border-[#a0c8d5] bg-[#e1eff5] px-2.5 py-1 text-[11px] font-medium text-[#2b7a8e]">Member</span>
              </div>
              <div className="mt-2 flex justify-center gap-5 py-3">
                <div className="text-center">
                  <div className="text-[10px] text-[#6b7689]">Points</div>
                  <div className="text-sm font-semibold">4020</div>
                </div>
                <div className="text-center">
                  <div className="text-[10px] text-[#6b7689]">$</div>
                  <div className="text-sm font-semibold">101</div>
                </div>
              </div>
            </div>
            <div className="border-b border-[#e0e4ea] p-3.5">
              <div className="mb-2 flex items-center justify-between">
                <span className="text-sm font-semibold">Last appointment</span>
                <span className="text-sm text-[#8895a7]">›</span>
              </div>
              <div className="rounded-lg bg-[#f8fafc] p-3 text-sm">
                <div className="font-semibold">2nd Aug at 12:45 pm</div>
                <div className="mt-1.5 text-[#4d5768]">Hair cut with Alex · Hair Treatment · Blowout</div>
                <div className="mt-1.5 text-xs text-[#8895a7]">Center: Albertville, AL · Amount: $150</div>
              </div>
            </div>
            <div className="border-b border-[#e0e4ea] p-3.5">
              <div className="mb-2 flex items-center justify-between">
                <span className="text-sm font-semibold">Notes</span>
                <span className="text-sm text-[#8895a7]">›</span>
              </div>
              <div className="text-sm text-[#4d5768]">Avoids heat styling, prefers air-dry finishing.</div>
              <div className="mt-1 text-xs text-[#8895a7]">Type: Booking alert · Date: 23 Apr 2024</div>
              <div className="mt-2 text-sm text-[#1a8a8a] cursor-pointer">+ Add new</div>
            </div>
          </div>
        </div>
      </div>

      {navCrosshair && (
        <div className="fixed inset-0 z-[9500] bg-black/20">
          <NavCrosshair text={navCrosshair} />
        </div>
      )}
    </div>
  );
}
