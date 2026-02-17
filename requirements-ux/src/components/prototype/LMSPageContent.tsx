"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { usePrototypeUI } from "./PrototypeUI";
import { NavCrosshair } from "./NavCrosshair";

const PRIMARY = "#1a8a8a";
const SIDEBAR_BG = "#1b2332";

export function LMSPageContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const { showToast, showSync, hideSync } = usePrototypeUI();
  const [expandedPerson, setExpandedPerson] = useState<string | null>("phone1");
  const [selectedPerson, setSelectedPerson] = useState<string | null>("phone1");
  const [selectedLead, setSelectedLead] = useState<string | null>(null);
  const [eventFilter, setEventFilter] = useState("all");
  const [msgMode, setMsgMode] = useState<"reply" | "private">("reply");
  const [messageInput, setMessageInput] = useState("");
  const [callOverlay, setCallOverlay] = useState(false);
  const [callStatus, setCallStatus] = useState("Ringing...");
  const [callTimer, setCallTimer] = useState(0);
  const [aiCallModal, setAiCallModal] = useState(false);
  const [convertModal, setConvertModal] = useState(false);
  const [navCrosshair, setNavCrosshair] = useState<string | null>(null);
  const [timelineEvents, setTimelineEvents] = useState<Array<{ id: string; type: string; lead: string; content: React.ReactNode }>>([]);
  const [converted, setConverted] = useState(false);
  const callTimerRef = useRef<ReturnType<typeof setInterval> | null>(null);

  useEffect(() => {
    if (searchParams.get("from") === "hc") showToast("Navigated from HyperConnect", "info");
  }, [searchParams, showToast]);

  const viewMode = selectedLead ? "filtered" : "consolidated";
  const activitiesTitle = selectedLead
    ? `Activities — ${selectedLead === "membership" ? "Membership Lead" : "Botox Treatment Lead"}`
    : "Activities";

  const toggleExpand = (personId: string) => {
    setExpandedPerson((p) => (p === personId ? null : personId));
  };

  const selectPerson = (personId: string) => {
    setSelectedPerson(personId);
    setSelectedLead(null);
  };

  const selectLead = (leadId: string) => {
    setSelectedLead(leadId);
  };

  const sendMessage = useCallback(() => {
    const text = messageInput.trim();
    if (!text) return;
    setMessageInput("");
    if (msgMode === "private") {
      showToast("Private notes do NOT sync to HyperConnect", "warning");
      return;
    }
    setTimelineEvents((e) => [
      {
        id: `msg-${Date.now()}`,
        type: "sms",
        lead: selectedLead || "all",
        content: (
          <div className="flex justify-end">
            <div className="max-w-[80%] rounded-xl rounded-br rounded-tr rounded-bl bg-[#1a8a8a] px-3.5 py-2.5 text-left text-sm text-white">
              {text}
            </div>
          </div>
        ),
      },
      ...e,
    ]);
    showSync("Syncing SMS to HyperConnect...");
    setTimeout(() => {
      hideSync();
      showToast("Message sent & synced to HyperConnect", "success");
    }, 1500);
  }, [messageInput, msgMode, selectedLead, showToast, showSync, hideSync]);

  const startCall = () => {
    setCallOverlay(true);
    setCallStatus("Ringing...");
    setCallTimer(0);
    setTimeout(() => {
      setCallStatus("Connected");
      let t = 0;
      callTimerRef.current = setInterval(() => {
        t++;
        setCallTimer(t);
      }, 1000);
    }, 2000);
  };

  const endCall = () => {
    if (callTimerRef.current) clearInterval(callTimerRef.current);
    callTimerRef.current = null;
    setCallOverlay(false);
    const mins = Math.floor(callTimer / 60).toString().padStart(2, "0");
    const secs = (callTimer % 60).toString().padStart(2, "0");
    setTimelineEvents((e) => [
      {
        id: `call-${Date.now()}`,
        type: "call",
        lead: selectedLead || "all",
        content: (
          <div className="text-sm text-[#4d5768]">
            Outbound call to +1 (407) 203-8926. Duration: {mins}:{secs}
          </div>
        ),
      },
      ...e,
    ]);
    showSync("Syncing call log to HyperConnect...");
    setTimeout(() => {
      hideSync();
      showToast("Call logged & synced to HyperConnect", "success");
    }, 1500);
  };

  const scheduleAICall = () => {
    setAiCallModal(false);
    setTimelineEvents((e) => [
      {
        id: `ai-${Date.now()}`,
        type: "call",
        lead: "membership",
        content: (
          <div className="text-sm text-[#4d5768]">
            Appointment follow-up AI call scheduled. Will execute within business hours (9 AM – 5 PM EST).
          </div>
        ),
      },
      ...e,
    ]);
    showToast("AI call scheduled successfully", "success");
  };

  const convertLead = () => {
    setConvertModal(false);
    setConverted(true);
    showSync("Converting lead & updating HyperConnect...");
    setTimeout(() => {
      hideSync();
      showToast("Lead converted! Badge removed in HyperConnect.", "success", 4000);
    }, 2000);
  };

  const navigateToHC = () => {
    setNavCrosshair("Opening HyperConnect → Emily Johnson Smith's profile...");
    setTimeout(() => {
      setNavCrosshair(null);
      router.push("/hc?guest=Emily%20Johnson%20Smith&from=lms");
    }, 1200);
  };

  const timelineEventTypes = [
    { type: "sms", lead: "membership", show: eventFilter === "all" || eventFilter === "sms", leadTag: "membership" },
    { type: "sms", lead: "all", show: eventFilter === "all" || eventFilter === "sms", leadTag: null },
    { type: "task", lead: "membership", show: eventFilter === "all" || eventFilter === "task", leadTag: "membership" },
    { type: "call", lead: "botox", show: eventFilter === "all" || eventFilter === "call", leadTag: "botox" },
    { type: "note", lead: "botox", show: eventFilter === "all" || eventFilter === "note", leadTag: "botox" },
    { type: "call", lead: "membership", show: eventFilter === "all" || eventFilter === "call", leadTag: "membership" },
  ];

  return (
    <div className="flex h-full" style={{ background: "#f4f5f7" }}>
      {/* Sidebar */}
      <nav
        className="flex w-14 shrink-0 flex-col items-center gap-1 py-3"
        style={{ background: SIDEBAR_BG }}
      >
        {["🔍", "🏠", "👥", "📞", "📋", "📅", "💬", "📊"].map((icon, i) => (
          <button
            key={icon}
            type="button"
            className={`flex h-10 w-10 items-center justify-center rounded-lg text-lg transition-colors hover:bg-white/10 ${
              i === 4 ? "bg-teal-500/15 text-[#4db8b8]" : "text-[#8895a7]"
            }`}
          >
            {icon}
          </button>
        ))}
        <div className="flex-1" />
        <button type="button" className="flex h-10 w-10 items-center justify-center rounded-lg text-[#8895a7] hover:bg-white/10">
          ⚙
        </button>
      </nav>

      <div className="flex flex-1 flex-col min-h-0">
        {/* Top bar */}
        <div className="flex h-14 items-center justify-between border-b border-[#e0e4ea] bg-white px-5">
          <div className="flex items-center gap-3">
            <button type="button" onClick={() => router.push("/")} className="text-xl text-[#2c3345]">
              ←
            </button>
            <span className="text-lg font-semibold text-[#2c3345]">Lead details</span>
          </div>
          <div className="text-sm text-[#6b7689]">Beuforce – Albertville</div>
          <div className="flex items-center gap-3">
            <select className="rounded-md border border-[#e0e4ea] px-2.5 py-1.5 text-sm">
              <option>Albertville</option>
            </select>
            <button
              type="button"
              className="rounded-md bg-[#1a8a8a] px-4 py-2 text-sm font-medium text-white"
              onClick={() => showToast("Add new lead form would open", "info")}
            >
              + Add new lead
            </button>
            <div className="flex h-8 w-8 items-center justify-center rounded-full bg-[#4a7fa5] text-xs font-semibold text-white">
              SJ
            </div>
          </div>
        </div>
        <div className="border-b border-[#e0e4ea] bg-white py-1 pl-14 text-xs text-[#6b7689]">
          All leads › Lead details
        </div>

        {/* 3 panels */}
        <div className="flex flex-1 min-h-0">
          {/* Left: Lead list */}
          <div className="flex w-[300px] shrink-0 flex-col border-r border-[#e0e4ea] bg-white">
            <div className="border-b border-[#e0e4ea] p-3">
              <input
                type="text"
                placeholder="Search leads..."
                className="w-full rounded-md border border-[#e0e4ea] bg-white py-2 pl-9 pr-3 text-sm outline-none focus:border-[#1a8a8a]"
              />
            </div>
            <div className="flex-1 overflow-y-auto">
              {/* Person with 2 leads */}
              <div
                onClick={() => selectPerson("phone1")}
                className={`flex cursor-pointer items-start gap-2.5 border-b border-[#f0f2f5] px-4 py-3 transition-colors hover:bg-[#f5f6f8] ${
                  selectedPerson === "phone1" && !selectedLead ? "border-l-4 border-l-[#1a8a8a] bg-[#e6f4f4]" : ""
                }`}
              >
                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-[#4a7fa5] text-sm font-semibold text-white">
                  +1
                </div>
                <div className="min-w-0 flex-1">
                  <div className="flex items-center gap-1.5 text-sm font-semibold text-[#2c3345]">
                    +1 (407) 203-8926
                    <span className="rounded-full bg-[#fce8e3] px-2 py-0.5 text-[10px] font-semibold text-[#c04b30]">
                      2 Leads
                    </span>
                    <button
                      type="button"
                      onClick={(e) => { e.stopPropagation(); toggleExpand("phone1"); }}
                      className={`text-[#6b7689] transition-transform ${expandedPerson === "phone1" ? "rotate-90" : ""}`}
                    >
                      ▶
                    </button>
                  </div>
                  <div className="truncate text-xs text-[#6b7689]">AI call completed, Positive response.</div>
                </div>
              </div>
              {expandedPerson === "phone1" && (
                <>
                  <div
                    onClick={(e) => { e.stopPropagation(); selectLead("membership"); setSelectedPerson("phone1"); }}
                    className={`flex cursor-pointer items-center gap-2 border-b border-[#f5f6f8] py-2.5 pl-12 pr-4 transition-colors hover:bg-[#f0f2f5] ${
                      selectedLead === "membership" ? "bg-[#e6f4f4]" : ""
                    }`}
                  >
                    <span>📋</span>
                    <span className="flex-1 text-sm font-medium">Membership Lead</span>
                    <span className="rounded bg-[#e1eff5] px-2 py-0.5 text-[10px] font-semibold text-[#2b7a8e]">AI call done</span>
                  </div>
                  <div
                    onClick={(e) => { e.stopPropagation(); selectLead("botox"); setSelectedPerson("phone1"); }}
                    className={`flex cursor-pointer items-center gap-2 border-b border-[#f5f6f8] py-2.5 pl-12 pr-4 transition-colors hover:bg-[#f0f2f5] ${
                      selectedLead === "botox" ? "bg-[#e6f4f4]" : ""
                    }`}
                  >
                    <span>💉</span>
                    <span className="flex-1 text-sm font-medium">Botox Treatment Lead</span>
                    <span className="rounded bg-[#e2f2e9] px-2 py-0.5 text-[10px] font-semibold text-[#2d7a52]">Follow up done</span>
                  </div>
                </>
              )}
              {["Sophia Williams", "Olivia Garcia", "Liam Martinez"].map((name, i) => (
                <div
                  key={name}
                  onClick={() => selectPerson(name)}
                  className="flex cursor-pointer items-start gap-2.5 border-b border-[#f0f2f5] px-4 py-3 hover:bg-[#f5f6f8]"
                >
                  <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-[#3d8b6e] text-sm font-semibold text-white">
                    {name.split(" ").map((n) => n[0]).join("")}
                  </div>
                  <div className="min-w-0 flex-1">
                    <div className="text-sm font-semibold text-[#2c3345]">{name}</div>
                    <div className="truncate text-xs text-[#6b7689]">Follow up call completed</div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Center: Timeline + messaging */}
          <div className="flex min-w-0 flex-1 flex-col bg-[#f4f5f7]">
            <div className="flex items-center justify-between border-b border-[#e0e4ea] bg-white px-5 py-3">
              <span className="text-base font-semibold">{activitiesTitle}</span>
              <div className="flex items-center gap-2">
                <select
                  value={eventFilter}
                  onChange={(e) => setEventFilter(e.target.value)}
                  className="rounded-md border border-[#e0e4ea] bg-white px-3 py-1.5 text-sm"
                >
                  <option value="all">All events</option>
                  <option value="sms">Messages</option>
                  <option value="call">Calls</option>
                  <option value="task">Tasks</option>
                  <option value="note">Notes</option>
                </select>
                <button
                  type="button"
                  className="rounded-md border border-[#1a8a8a] bg-white px-3.5 py-1.5 text-sm text-[#1a8a8a]"
                  onClick={() => showToast("Purchase history panel would open", "info")}
                >
                  Purchase history
                </button>
              </div>
            </div>
            <div className="flex-1 overflow-y-auto p-5">
              {timelineEvents.map((ev) => {
                const showByLead = viewMode === "consolidated" || ev.lead === selectedLead || ev.lead === "all";
                const showByType = eventFilter === "all" || ev.type === eventFilter;
                if (!showByLead || !showByType) return null;
                return (
                  <div key={ev.id} className="mb-3 rounded-lg border border-[#e0e4ea] bg-white p-4">
                    <div className="mb-2 flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <span className="flex h-7 w-7 items-center justify-center rounded-md bg-[#e1eff5] text-sm text-[#2b7a8e]">✉</span>
                        <span className="text-sm font-semibold">SMS</span>
                        <span className="rounded bg-[#e1eff5] px-2 py-0.5 text-[10px] font-semibold text-[#2b7a8e]">Outbound</span>
                      </div>
                      <span className="text-xs text-[#6b7689]">You · just now</span>
                    </div>
                    {ev.content}
                  </div>
                );
              })}
              {/* Static sample events */}
              {timelineEventTypes.map((ev, i) => {
                const showByLead = viewMode === "consolidated" || ev.lead === selectedLead || ev.lead === "all";
                if (!showByLead || !ev.show) return null;
                return (
                  <div key={i} className="mb-3 rounded-lg border border-[#e0e4ea] bg-white p-4">
                    <div className="mb-2 flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <span className="flex h-7 w-7 items-center justify-center rounded-md bg-[#e1eff5] text-sm">✉</span>
                        <span className="text-sm font-semibold">SMS</span>
                        <span className="rounded bg-[#e1eff5] px-2 py-0.5 text-[10px]">Outbound</span>
                      </div>
                      <span className="text-xs text-[#6b7689]">Sarah Johnson · 9:40 am</span>
                    </div>
                    <div className="flex justify-end">
                      <div className="max-w-[80%] rounded-xl rounded-br rounded-tr rounded-bl bg-[#1a8a8a] px-3.5 py-2.5 text-sm text-white">
                        ...and any more offer pricing you can provide?
                      </div>
                    </div>
                    {ev.leadTag && (
                      <div className="mt-1.5 inline-block rounded bg-[#f0f2f5] px-1.5 py-0.5 text-[11px] text-[#6b7689]">
                        Lead: {ev.leadTag === "membership" ? "Membership Lead" : "Botox Treatment Lead"}
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
            {/* Messaging */}
            <div className="border-t border-[#e0e4ea] bg-white p-5">
              <div className="mb-2 flex items-center justify-between">
                <div className="flex rounded-lg border border-[#e0e4ea] overflow-hidden">
                  <button
                    type="button"
                    onClick={() => setMsgMode("reply")}
                    className={`px-3.5 py-1.5 text-sm ${msgMode === "reply" ? "bg-[#1a8a8a] text-white" : "bg-[#f5f6f8] text-[#2c3345]"}`}
                  >
                    Reply
                  </button>
                  <button
                    type="button"
                    onClick={() => setMsgMode("private")}
                    className={`px-3.5 py-1.5 text-sm ${msgMode === "private" ? "bg-[#1a8a8a] text-white" : "bg-[#f5f6f8] text-[#2c3345]"}`}
                  >
                    Private note
                  </button>
                </div>
                <div className="flex items-center gap-2 text-sm">
                  <span className="text-[#6b7689]">✉</span>
                  <select className="rounded border border-[#e0e4ea] px-2 py-1 text-xs">SMS</select>
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
                <div className="flex gap-1.5">
                  <button type="button" className="flex h-9 w-9 items-center justify-center rounded-lg bg-[#f0f2f5] text-[#6b7689]">📎</button>
                  <button type="button" className="flex h-9 w-9 items-center justify-center rounded-lg bg-[#1a8a8a] text-white" onClick={sendMessage}>
                    ➤
                  </button>
                </div>
              </div>
            </div>
          </div>

          {/* Right: Lead details */}
          <div className="flex w-[340px] shrink-0 flex-col overflow-y-auto border-l border-[#e0e4ea] bg-white">
            <div className="flex border-b border-[#e0e4ea] px-4">
              {["Details", "Notes", "Tasks"].map((tab, i) => (
                <button
                  key={tab}
                  type="button"
                  className={`border-b-2 px-3 py-3 text-sm font-medium ${
                    i === 0 ? "border-[#1a8a8a] text-[#1a8a8a]" : "border-transparent text-[#6b7689]"
                  }`}
                >
                  {tab}
                </button>
              ))}
            </div>
            <div className="border-b border-[#e0e4ea] p-4">
              <div className="mb-2 flex items-center justify-between">
                <span className="text-sm text-[#6b7689]">Lead score</span>
                <span className="text-lg font-bold text-[#2d9e6a]">83 / 150</span>
              </div>
              <div className="h-1.5 overflow-hidden rounded-full bg-[#e0e4ea]">
                <div className="h-full w-[55%] rounded-full bg-[#2d9e6a]" />
              </div>
            </div>
            <div className="flex gap-2 border-b border-[#e0e4ea] p-3">
              <button
                type="button"
                onClick={startCall}
                className="flex-1 rounded-lg bg-[#1a8a8a] py-2.5 text-sm font-semibold text-white"
              >
                📞 Call ▼
              </button>
              <button
                type="button"
                onClick={() => setAiCallModal(true)}
                className="flex-1 rounded-lg border border-[#e0e4ea] bg-white py-2.5 text-sm font-semibold text-[#2c3345]"
              >
                🤖 AI call
              </button>
            </div>
            <div className="flex gap-1 border-b border-[#e0e4ea] p-2 overflow-x-auto">
              {["More info", "Vitals", "Allergies", "Habits"].map((t, i) => (
                <span
                  key={t}
                  className={`shrink-0 rounded-full border px-2.5 py-1 text-xs ${
                    i === 0 ? "border-[#1a8a8a] bg-[#e6f4f4] text-[#1a8a8a]" : "border-[#e0e4ea] bg-white"
                  }`}
                >
                  {t}
                </span>
              ))}
            </div>
            <div className="m-4 rounded-lg border border-[#b0d5d5] bg-[#edf5f5] p-3.5">
              <div className="mb-1.5 flex items-center gap-1 text-xs text-[#6b7689]">ℹ Linked guest profile</div>
              <div className="flex items-center justify-between text-sm font-medium">
                <span>Emily Johnson Smith | +1 702 555 7623</span>
                <button type="button" onClick={navigateToHC} className="text-[#1a8a8a] hover:underline">
                  Change ↗
                </button>
              </div>
            </div>
            <div className="px-4 pb-4">
              <h4 className="mb-3 text-sm text-[#6b7689]">👤 User details</h4>
              <div className="grid grid-cols-2 gap-3 text-sm">
                <div><label className="block text-xs text-[#6b7689]">Name</label><div className="font-medium">NA</div></div>
                <div><label className="block text-xs text-[#6b7689]">Phone</label><div className="font-medium">+1 (407) 203-8926</div></div>
                <div><label className="block text-xs text-[#6b7689]">Email</label><div className="font-medium text-[#8895a7]">–</div></div>
              </div>
            </div>
            <div className="border-t border-[#e0e4ea] px-4 pb-4 pt-2">
              <h4 className="mb-3 text-sm text-[#6b7689]">📊 Lead assessment</h4>
              <div className="flex gap-4">
                <div className="flex-1">
                  <label className="block text-xs text-[#6b7689]">Sales stage</label>
                  <select className="mt-1 w-full rounded-md border border-[#e0e4ea] bg-white px-2.5 py-1.5 text-sm">
                    <option>New lead</option>
                    <option>Won</option>
                  </select>
                </div>
                <div className="flex-1">
                  <label className="block text-xs text-[#6b7689]">Priority</label>
                  <div className="mt-1 rounded-md border border-[#e0cdb3] bg-[#faf0e1] px-2.5 py-1.5 text-center text-sm font-medium text-[#a06b28]">Medium</div>
                </div>
              </div>
            </div>
            {!converted && (
              <div className="mt-auto border-t border-[#e0e4ea] p-4">
                <button
                  type="button"
                  onClick={() => setConvertModal(true)}
                  className="w-full rounded-lg bg-[#2d9e6a] py-2.5 text-sm font-semibold text-white"
                >
                  🏆 Convert Lead
                </button>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Call overlay */}
      {callOverlay && (
        <div className="fixed inset-0 z-[8000] flex items-center justify-center bg-black/80">
          <div className="w-80 rounded-2xl bg-[#1b2332] p-10 text-center text-white">
            <div className="mx-auto mb-4 flex h-18 w-18 items-center justify-center rounded-full bg-[#4a7fa5] text-2xl">+1</div>
            <div className="text-2xl font-semibold">+1 (407) 203-8926</div>
            <div className="text-sm text-[#8895a7]">Outbound call via LMS</div>
            <div className={`mt-4 text-sm ${callStatus === "Connected" ? "text-[#2d9e6a]" : ""}`}>{callStatus}</div>
            <div className="my-6 text-3xl font-light">
              {Math.floor(callTimer / 60).toString().padStart(2, "0")}:{(callTimer % 60).toString().padStart(2, "0")}
            </div>
            <div className="flex justify-center gap-4">
              <button type="button" className="flex h-14 w-14 items-center justify-center rounded-full bg-[#334155] text-xl">🔇</button>
              <button type="button" className="flex h-14 w-14 items-center justify-center rounded-full bg-[#334155] text-xl">⏸</button>
              <button type="button" onClick={endCall} className="flex h-14 w-14 items-center justify-center rounded-full bg-[#c9453a] text-xl">🔴</button>
            </div>
          </div>
        </div>
      )}

      {/* AI Call modal */}
      {aiCallModal && (
        <div className="fixed inset-0 z-[5000] flex items-center justify-center bg-black/50">
          <div className="w-full max-w-lg rounded-xl bg-white p-6 shadow-xl">
            <h3 className="mb-4 text-lg font-semibold">🤖 Schedule AI Call</h3>
            <div className="space-y-4">
              <div>
                <label className="mb-1 block text-sm font-medium">Use Case</label>
                <select className="w-full rounded-md border border-[#e0e4ea] px-3 py-2 text-sm">
                  <option>Appointment Follow-Up</option>
                </select>
              </div>
              <div>
                <label className="mb-1 block text-sm font-medium">Prompt / Script</label>
                <textarea className="w-full rounded-md border border-[#e0e4ea] px-3 py-2 text-sm" rows={3} placeholder="Hi, this is an AI assistant..." />
              </div>
              <div>
                <label className="mb-1 block text-sm font-medium">Context (auto-populated)</label>
                <div className="rounded-md bg-[#f5f6f8] p-2.5 text-xs text-[#6b7689]">
                  <strong>Lead:</strong> Membership Lead<br />
                  <strong>Phone:</strong> +1 (407) 203-8926<br />
                  <strong>Last interaction:</strong> SMS exchange on May 8, 2025
                </div>
              </div>
            </div>
            <div className="mt-6 flex justify-end gap-3">
              <button type="button" onClick={() => setAiCallModal(false)} className="rounded-md border border-[#e0e4ea] bg-[#f0f2f5] px-4 py-2 text-sm font-medium">
                Cancel
              </button>
              <button type="button" onClick={scheduleAICall} className="rounded-md bg-[#1a8a8a] px-4 py-2 text-sm font-medium text-white">
                🤖 Schedule AI Call
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Convert modal */}
      {convertModal && (
        <div className="fixed inset-0 z-[5000] flex items-center justify-center bg-black/50">
          <div className="w-full max-w-md rounded-xl bg-white p-6 shadow-xl">
            <h3 className="mb-2 text-lg font-semibold">🏆 Convert Lead</h3>
            <p className="mb-4 text-sm text-[#6b7689]">
              Mark this lead as converted? This will remove the lead indicator in HyperConnect and transition the contact to a regular guest profile.
            </p>
            <div className="mb-4 rounded-lg border border-[#9ccfb0] bg-[#e2f2e9] p-3 text-sm">
              <strong>Lead:</strong> Membership Lead<br />
              <strong>Contact:</strong> +1 (407) 203-8926<br />
              <strong>Linked guest:</strong> Emily Johnson Smith
            </div>
            <div className="flex justify-end gap-3">
              <button type="button" onClick={() => setConvertModal(false)} className="rounded-md border border-[#e0e4ea] bg-[#f0f2f5] px-4 py-2 text-sm font-medium">
                Cancel
              </button>
              <button type="button" onClick={convertLead} className="rounded-md bg-[#2d9e6a] px-4 py-2 text-sm font-medium text-white">
                ✓ Confirm Conversion
              </button>
            </div>
          </div>
        </div>
      )}

      {navCrosshair && (
        <div className="fixed inset-0 z-[9500] bg-black/20">
          <NavCrosshair text={navCrosshair} />
        </div>
      )}
    </div>
  );
}
