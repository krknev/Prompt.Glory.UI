"use client";

import React, { Dispatch, useCallback, useMemo, useRef, useState } from "react";
import { UploadCloud, Image as ImageIcon, Film, Tag, X, ChevronRight, ChevronLeft, Trophy, DollarSign, Info, CheckCircle2 } from "lucide-react";


type SubmissionType = "general" | "sell" | "contest";

interface MultiSelectOption {
  value: string;
  label: string;
}

type Props = {
  contestTitle?: string;
  contestPrize?: string;
  isModal?: boolean;
  onClose?: () => void;
  onSetShowUploadModal?: Dispatch<React.SetStateAction<boolean>>;
  // onSubmit: (data: {
  //   title: string;
  //   description: string;
  //   file: File | null;
  //   category: string;
  //   tags: string[];
  //   submissionTypes: SubmissionType[];
  //   // Selling
  //   price?: number;
  //   licenseTypes?: string[];
  //   printOnDemand?: boolean;
  //   // Contest
  //   selectedContest?: string;
  //   agreedToRules: boolean;
  //   agreedToTerms: boolean;
  //   // Additional
  //   aiTool?: string;
  //   promptDetails?: string;
  // }) => Promise<void> | void;
};

const CATEGORIES = [
  "Art",
  "Portrait",
  "Landscape",
  "Sci-Fi",
  "Fantasy",
  "Abstract",
  "Realistic",
  "Funny",
  "Surreal",
];

const LICENSES: MultiSelectOption[] = [
  { value: "personal", label: "Personal Use" },
  { value: "commercial", label: "Commercial Use" },
  { value: "exclusive", label: "Exclusive Rights" },
  { value: "editorial", label: "Editorial Use" },
  { value: "extended", label: "Extended Commercial" }
];

const CONTESTS = [
  { id: "weekly-top5", label: "Weekly Top 5" },
  { id: "most-beautiful", label: "Most Beautiful" },
  { id: "funniest", label: "Funniest" },
  { id: "most-realistic", label: "Most Realistic" },
];

export function UploadCard({
  contestTitle = "Enhanced Art Upload",
  contestPrize = "Share, Sell, or Compete",
  isModal = false,
  onClose,
  onSetShowUploadModal,
}: Props) {
  // Form state
  const [file, setFile] = useState<File | null>(null);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [category, setCategory] = useState(CATEGORIES[0]);
  const [tags, setTags] = useState<string[]>([]);
  const [tagInput, setTagInput] = useState("");
  const [submissionTypes, setSubmissionTypes] = useState<SubmissionType[]>(["general"]);

  // Selling
  const [price, setPrice] = useState<number | undefined>();
  const [licenseTypes, setLicenseTypes] = useState<string[]>([]);
  const [printOnDemand, setPrintOnDemand] = useState(false);
  const [sellPrompt, setSellPrompt] = useState(false);
  const [promptPrice, setPromptPrice] = useState<number | undefined>();

  // Contest
  const [selectedContest, setSelectedContest] = useState<string | undefined>();
  const [agreedToRules, setAgreedToRules] = useState(false);

  // User agreements
  const [agreedToTerms, setAgreedToTerms] = useState(false);

  // Additional
  const [aiTool, setAiTool] = useState<string>("");
  const [promptDetails, setPromptDetails] = useState<string>("");

  // Wizard
  const [step, setStep] = useState<1 | 2 | 3>(1);
  const [submitting, setSubmitting] = useState(false);
  const [errors, setErrors] = useState<string[]>([]);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const isVideo = useMemo(
    () => (file ? file.type.startsWith("video/") : false),
    [file]
  );
  const previewURL = useMemo(
    () => (file ? URL.createObjectURL(file) : null),
    [file]
  );

  const resetErrors = () => setErrors([]);

  const validateStep = (s: 1 | 2 | 3) => {
    const newErrors: string[] = [];
    if (s === 2) {
      if (!title.trim()) newErrors.push("Title is required.");
      if (!description.trim()) newErrors.push("Description is required.");
      if (!category) newErrors.push("Category is required.");
    }
    if (s === 3) {
      if (submissionTypes.includes("sell")) {
        if (!price || price <= 0) newErrors.push("Valid price is required.");
        if (licenseTypes.length === 0) newErrors.push("At least one license type is required.");
        if (sellPrompt && (!promptPrice || promptPrice <= 0)) {
          newErrors.push("Valid prompt price is required when selling prompt.");
        }
      }
      if (submissionTypes.includes("contest")) {
        if (!selectedContest)
          newErrors.push("Please select a contest to submit to.");
        if (!agreedToRules) newErrors.push("You must agree to contest rules.");
      }
      if (!agreedToTerms) newErrors.push("You must agree to the terms and conditions.");
    }
    setErrors(newErrors);
    return newErrors.length === 0;
  };

  const goNext = () => {
    resetErrors();
    if (validateStep(step)) {
      if (step < 3) setStep((p) => (p + 1) as 1 | 2 | 3);
    }
  };

  const goPrev = () => {
    resetErrors();
    if (step > 1) setStep((p) => (p - 1) as 1 | 2 | 3);
  };

  const onDropFiles = useCallback((dropped: FileList | null) => {
    if (!dropped || dropped.length === 0) return;
    const f = dropped[0];
    if (
      f.type.startsWith("image/") ||
      f.type.startsWith("video/") ||
      /\.(jpg|jpeg|png|webp|gif|mp4|mov|webm)$/i.test(f.name)
    ) {
      setFile(f);
    } else {
      setErrors(["Unsupported file type. Use image or video formats."]);
    }
  }, []);

  const handleTagAdd = (value: string) => {
    const t = value.trim();
    if (!t) return;
    if (tags.includes(t)) return;
    if (tags.length >= 10) return;
    setTags((prev) => [...prev, t]);
    setTagInput("");
  };

  const removeTag = (t: string) => {
    setTags((prev) => prev.filter((x) => x !== t));
  };

  const handleSubmit = async () => {
    resetErrors();
    const allGood =
      validateStep(1) && validateStep(2) && validateStep(3);
    if (!allGood) return;

    setSubmitting(true);
    try {
      // await onSubmit({
      //   title,
      //   description,
      //   file,
      //   category,
      //   tags,
      //   submissionTypes,
      //   price,
      //   licenseTypes,
      //   printOnDemand,
      //   selectedContest,
      //   agreedToRules,
      //   agreedToTerms,
      //   aiTool: aiTool || undefined,
      //   promptDetails: promptDetails || undefined,
      //   sellPrompt,
      //   promptPrice: sellPrompt ? promptPrice : undefined,
      // });
    } finally {
      setSubmitting(false);
      onSetShowUploadModal?.(false);
    }
  };
  if (isModal && onClose) {
    React.useEffect(() => {
          const handlePopState = (event: PopStateEvent) => {
            event.preventDefault();
            onClose();
            window.history.pushState(null, '', window.location.href);
          };
          
          window.history.pushState(null, '', window.location.href);
          window.addEventListener('popstate', handlePopState);
          
          return () => {
            window.removeEventListener('popstate', handlePopState);
          };
        }, [onClose])
    return (
      <div className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-4 overflow-y-auto">
    
        
        <div className="bg-white dark:bg-gray-900 rounded-2xl max-w-5xl w-full max-h-[95vh] my-4 shadow-2xl">
          {/* Modal Header */}
          <div className="flex items-center justify-between p-6 border-b border-gray-200 dark:border-gray-800">
            <div className="flex items-center gap-3">
              <svg className="h-8 w-8 text-primary" fill="none" viewBox="0 0 48 48" xmlns="http://www.w3.org/2000/svg">
                <path d="M4 4H17.3334V17.3334H30.6666V30.6666H44V44H4V4Z" fill="currentColor"></path>
              </svg>
              <h1 className="text-xl font-bold text-gray-900 dark:text-white">
                PromptGlory
              </h1>
            </div>
            <button
              onClick={onClose}
              className="p-2 rounded-full hover:bg-gray-200 dark:hover:bg-gray-800 transition-colors"
            >
              <svg className="h-5 w-5 text-gray-500 dark:text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>
          
          {/* Modal Content */}
          <div className="p-6 overflow-y-auto max-h-[calc(95vh-80px)]">
            <div
              className={[
                "relative w-full mx-auto",
                "max-w-5xl",
              ].join(" ")}
            >
              {/* Card Shell */}
              <div className="rounded-2xl border border-violet-200/40 dark:border-violet-800/40 shadow-xl overflow-hidden bg-white/70 dark:bg-slate-900/60 backdrop-blur">
                {/* Header */}
                <div className="relative p-6 sm:p-8">
                  {/* soft gradient bg */}
                  <div className="pointer-events-none absolute inset-0 bg-gradient-to-br from-indigo-50 via-violet-50 to-slate-50 dark:from-indigo-950/20 dark:via-violet-950/20 dark:to-slate-950" />
                  <div className="relative flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
                    <div>
                      <h2 className="text-2xl sm:text-3xl font-semibold tracking-tight text-slate-900 dark:text-slate-100">
                        {contestTitle}
                      </h2>
                      <p className="text-sm text-slate-600 dark:text-slate-300 mt-1">
                        {contestPrize}
                      </p>
                    </div>
                    <div className="flex items-center gap-2">
                      <WizardSteps step={step} />
                    </div>
                  </div>
                </div>

                {/* Body */}
                <div className="p-6 pt-0 sm:p-8 sm:pt-0">
                  {errors.length > 0 && (
                    <div className="mb-6 rounded-xl border border-red-300/50 dark:border-red-600/50 bg-red-50 dark:bg-red-950/30 p-4 text-sm text-red-800 dark:text-red-200">
                      <ul className="list-disc ps-5 space-y-1">
                        {errors.map((e, i) => (
                          <li key={i}>{e}</li>
                        ))}
                      </ul>
                    </div>
                  )}

                  {/* {step === 1 && (
                    <StepUpload
                      file={file}
                      isVideo={isVideo}
                      previewURL={previewURL}
                      onPickFile={() => fileInputRef.current?.click()}
                      onDropFiles={onDropFiles}
                      fileInputRef={fileInputRef}
                      setFile={setFile}
                    />
                  )} */}

                  {step === 2 && (
                    <StepDetails
                      title={title}
                      setTitle={setTitle}
                      description={description}
                      setDescription={setDescription}
                      category={category}
                      setCategory={setCategory}
                      tags={tags}
                      tagInput={tagInput}
                      setTagInput={setTagInput}
                      onAddTag={handleTagAdd}
                      onRemoveTag={removeTag}
                      aiTool={aiTool}
                      setAiTool={setAiTool}
                      promptDetails={promptDetails}
                      setPromptDetails={setPromptDetails}
                    />
                  )}

                  {step === 3 && (
                    <StepMonetizeContest
                      submissionTypes={submissionTypes}
                      setSubmissionTypes={setSubmissionTypes}
                      // sell
                      price={price}
                      setPrice={setPrice}
                      licenseTypes={licenseTypes}
                      setLicenseTypes={setLicenseTypes}
                      printOnDemand={printOnDemand}
                      setPrintOnDemand={setPrintOnDemand}
                      sellPrompt={sellPrompt}
                      setSellPrompt={setSellPrompt}
                      promptPrice={promptPrice}
                      setPromptPrice={setPromptPrice}
                      // contest
                      selectedContest={selectedContest}
                      setSelectedContest={setSelectedContest}
                      agreedToRules={agreedToRules}
                      setAgreedToRules={setAgreedToRules}
                      agreedToTerms={agreedToTerms}
                      setAgreedToTerms={setAgreedToTerms}
                    />
                  )}
                </div>

                {/* Footer / Nav */}
                <div className="flex items-center justify-between gap-3 p-6 sm:p-8 border-t border-slate-200/60 dark:border-slate-800/60 bg-white/60 dark:bg-slate-900/60">
                  <button
                    onClick={goPrev}
                    disabled={step === 1}
                    className="inline-flex items-center gap-2 rounded-xl px-4 py-2 border border-slate-300/60 dark:border-slate-700/60 text-slate-700 dark:text-slate-200 hover:bg-slate-50 dark:hover:bg-slate-800 disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    <ChevronLeft className="h-4 w-4" />
                    Back
                  </button>

                  {step < 3 ? (
                    <button
                      onClick={goNext}
                      className="inline-flex items-center gap-2 rounded-xl px-5 py-2.5 bg-violet-600 hover:bg-violet-700 text-white shadow-md shadow-violet-600/20"
                    >
                      Next
                      <ChevronRight className="h-4 w-4" />
                    </button>
                  ) : (
                    <button
                      onClick={handleSubmit}
                      disabled={submitting}
                      className="inline-flex items-center gap-2 rounded-xl px-5 py-2.5 bg-indigo-600 hover:bg-indigo-700 text-white shadow-md shadow-indigo-600/20 disabled:opacity-60"
                    >
                      {submitting ? "Submitting..." : "Submit"}
                      <CheckCircle2 className="h-4 w-4" />
                    </button>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div
      className={[
        "relative w-full mx-auto",
        isModal ? "max-w-3xl" : "max-w-5xl",
      ].join(" ")}
    >
      {/* Card Shell */}
      <div className="rounded-2xl border border-violet-200/40 dark:border-violet-800/40 shadow-xl overflow-hidden bg-white/70 dark:bg-slate-900/60 backdrop-blur">
        {/* Header */}
        <div className="relative p-6 sm:p-8">
          {/* soft gradient bg */}
          <div className="pointer-events-none absolute inset-0 bg-gradient-to-br from-indigo-50 via-violet-50 to-slate-50 dark:from-indigo-950/20 dark:via-violet-950/20 dark:to-slate-950" />
          <div className="relative flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
            <div>
              <h2 className="text-2xl sm:text-3xl font-semibold tracking-tight text-slate-900 dark:text-slate-100">
                {contestTitle}
              </h2>
              <p className="text-sm text-slate-600 dark:text-slate-300 mt-1">
                {contestPrize}
              </p>
            </div>
            <div className="flex items-center gap-2">
              <WizardSteps step={step} />
            </div>
          </div>
        </div>

        {/* Body */}
        <div className="p-6 pt-0 sm:p-8 sm:pt-0">
          {errors.length > 0 && (
            <div className="mb-6 rounded-xl border border-red-300/50 dark:border-red-600/50 bg-red-50 dark:bg-red-950/30 p-4 text-sm text-red-800 dark:text-red-200">
              <ul className="list-disc ps-5 space-y-1">
                {errors.map((e, i) => (
                  <li key={i}>{e}</li>
                ))}
              </ul>
            </div>
          )}

          {/* {step === 1 && (
            <StepUpload
              file={file}
              isVideo={isVideo}
              previewURL={previewURL}
              onPickFile={() => fileInputRef.current?.click()}
              onDropFiles={onDropFiles}
              fileInputRef={fileInputRef}
              setFile={setFile}
            />
          )} */}

          {step === 2 && (
            <StepDetails
              title={title}
              setTitle={setTitle}
              description={description}
              setDescription={setDescription}
              category={category}
              setCategory={setCategory}
              tags={tags}
              tagInput={tagInput}
              setTagInput={setTagInput}
              onAddTag={handleTagAdd}
              onRemoveTag={removeTag}
              aiTool={aiTool}
              setAiTool={setAiTool}
              promptDetails={promptDetails}
              setPromptDetails={setPromptDetails}
            />
          )}

          {step === 3 && (
            <StepMonetizeContest
              submissionTypes={submissionTypes}
              setSubmissionTypes={setSubmissionTypes}
              // sell
              price={price}
              setPrice={setPrice}
              licenseTypes={licenseTypes}
              setLicenseTypes={setLicenseTypes}
              printOnDemand={printOnDemand}
              setPrintOnDemand={setPrintOnDemand}
              sellPrompt={sellPrompt}
              setSellPrompt={setSellPrompt}
              promptPrice={promptPrice}
              setPromptPrice={setPromptPrice}
              // contest
              selectedContest={selectedContest}
              setSelectedContest={setSelectedContest}
              agreedToRules={agreedToRules}
              setAgreedToRules={setAgreedToRules}
              agreedToTerms={agreedToTerms}
              setAgreedToTerms={setAgreedToTerms}
            />
          )}
        </div>

        {/* Footer / Nav */}
        <div className="flex items-center justify-between gap-3 p-6 sm:p-8 border-t border-slate-200/60 dark:border-slate-800/60 bg-white/60 dark:bg-slate-900/60">
          <button
            onClick={goPrev}
            disabled={step === 1}
            className="inline-flex items-center gap-2 rounded-xl px-4 py-2 border border-slate-300/60 dark:border-slate-700/60 text-slate-700 dark:text-slate-200 hover:bg-slate-50 dark:hover:bg-slate-800 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            <ChevronLeft className="h-4 w-4" />
            Back
          </button>

          {step < 3 ? (
            <button
              onClick={goNext}
              className="inline-flex items-center gap-2 rounded-xl px-5 py-2.5 bg-violet-600 hover:bg-violet-700 text-white shadow-md shadow-violet-600/20"
            >
              Next
              <ChevronRight className="h-4 w-4" />
            </button>
          ) : (
            <button
              onClick={handleSubmit}
              disabled={submitting}
              className="inline-flex items-center gap-2 rounded-xl px-5 py-2.5 bg-indigo-600 hover:bg-indigo-700 text-white shadow-md shadow-indigo-600/20 disabled:opacity-60"
            >
              {submitting ? "Submitting..." : "Submit"}
              <CheckCircle2 className="h-4 w-4" />
            </button>
          )}
        </div>
      </div>
    </div>
  );
}

/* ---------- Subcomponents ---------- */

function WizardSteps({ step }: { step: 1 | 2 | 3 }) {
  const steps = [
    { id: 1, label: "Upload" },
    { id: 2, label: "Details" },
    { id: 3, label: "Monetize/Contest" },
  ];
  return (
    <div className="flex items-center gap-2">
      {steps.map((s) => {
        const active = step === (s.id as 1 | 2 | 3);
        return (
          <div
            key={s.id}
            className={[
              "px-3 py-1.5 rounded-full text-xs font-medium border",
              active
                ? "bg-violet-600 text-white border-violet-600"
                : "bg-white/70 dark:bg-slate-900/70 text-slate-700 dark:text-slate-200 border-slate-300/60 dark:border-slate-700/60",
            ].join(" ")}
          >
            {s.label}
          </div>
        );
      })}
    </div>
  );
}

function StepUpload({
  file,
  isVideo,
  previewURL,
  onPickFile,
  onDropFiles,
  fileInputRef,
  setFile,
}: {
  file: File | null;
  isVideo: boolean;
  previewURL: string | null;
  onPickFile: () => void;
  onDropFiles: (files: FileList | null) => void;
  fileInputRef: React.RefObject<HTMLInputElement> | null;
  setFile: (f: File | null) => void;
}) {
  const [dragOver, setDragOver] = useState(false);

  return (
    <div>
      <div
        onDragOver={(e) => {
          e.preventDefault();
          setDragOver(true);
        }}
        onDragLeave={() => setDragOver(false)}
        onDrop={(e) => {
          e.preventDefault();
          setDragOver(false);
          onDropFiles(e.dataTransfer.files);
        }}
        className={[
          "relative w-full border-2 border-dashed rounded-2xl overflow-hidden cursor-pointer",
          dragOver
            ? "border-violet-500 bg-violet-50/60 dark:bg-violet-950/20"
            : "border-slate-300/60 dark:border-slate-700/60 bg-white/60 dark:bg-slate-900/60",
        ].join(" ")}
        onClick={onPickFile}
      >
        <input
          ref={fileInputRef}
          type="file"
          className="hidden"
          accept="image/*,video/*"
          onChange={(e) => onDropFiles(e.target.files)}
        />

        {!file ? (
          <div className="flex flex-col items-center justify-center py-14 text-center">
            <UploadCloud className="h-10 w-10 text-violet-600 mb-3" />
            <h3 className="text-lg font-medium text-slate-900 dark:text-slate-100">
              Drag & drop your image or video
            </h3>
            <p className="text-sm text-slate-600 dark:text-slate-300 mt-1">
              JPG, PNG, WEBP, GIF, MP4 (max ~50MB)
            </p>
            <div className="mt-4 inline-flex items-center gap-2 rounded-xl px-4 py-2 bg-violet-600 text-white hover:bg-violet-700">
              <ImageIcon className="h-4 w-4" />
              <span>Browse files</span>
            </div>
          </div>
        ) : (
          <div className="relative">
            {/* Preview */}
            <div className="aspect-video w-full bg-slate-100 dark:bg-slate-800">
              {isVideo ? (
                <video
                  src={previewURL ?? undefined}
                  className="h-full w-full object-contain"
                  controls
                />
              ) : (
                <img
                  src={previewURL ?? ""}
                  alt="preview"
                  className="h-full w-full object-contain"
                />
              )}
            </div>

            <div className="absolute top-3 right-3 flex gap-2">
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  onPickFile();
                }}
                className="rounded-xl px-3 py-1.5 text-xs bg-white/90 dark:bg-slate-900/90 border border-slate-300/60 dark:border-slate-700/60 text-slate-700 dark:text-slate-200 hover:bg-slate-50 dark:hover:bg-slate-800"
              >
                Change
              </button>
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  setFile(null);
                }}
                className="rounded-xl p-1.5 bg-white/90 dark:bg-slate-900/90 border border-slate-300/60 dark:border-slate-700/60 hover:bg-slate-50 dark:hover:bg-slate-800"
              >
                <X className="h-4 w-4" />
              </button>
            </div>
          </div>
        )}
      </div>

      <div className="mt-4 flex items-center gap-3 text-xs text-slate-600 dark:text-slate-300">
        <Info className="h-4 w-4" />
        <span>
          Tip: Use high-resolution assets. For videos, keep under ~60 seconds
          for best performance.
        </span>
      </div>
    </div>
  );
}

function StepDetails({
  title,
  setTitle,
  description,
  setDescription,
  category,
  setCategory,
  tags,
  tagInput,
  setTagInput,
  onAddTag,
  onRemoveTag,
  aiTool,
  setAiTool,
  promptDetails,
  setPromptDetails,
}: {
  title: string;
  setTitle: (v: string) => void;
  description: string;
  setDescription: (v: string) => void;
  category: string;
  setCategory: (v: string) => void;
  tags: string[];
  tagInput: string;
  setTagInput: (v: string) => void;
  onAddTag: (v: string) => void;
  onRemoveTag: (t: string) => void;
  aiTool: string;
  setAiTool: (v: string) => void;
  promptDetails: string;
  setPromptDetails: (v: string) => void;
}) {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-5 gap-6">
      <div className="lg:col-span-3">
        <label className="block text-sm font-medium text-slate-800 dark:text-slate-200 mb-1">
          Title *
        </label>
        <input
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="Name your masterpiece"
          className="w-full rounded-xl border border-slate-300/60 dark:border-slate-700/60 bg-white/80 dark:bg-slate-900/80 px-3 py-2 outline-none focus:ring-2 focus:ring-violet-500"
        />

        <label className="block text-sm font-medium text-slate-800 dark:text-slate-200 mt-4 mb-1">
          Description *
        </label>
        <textarea
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          rows={6}
          placeholder="Tell the story, technique, settings..."
          className="w-full rounded-xl border border-slate-300/60 dark:border-slate-700/60 bg-white/80 dark:bg-slate-900/80 px-3 py-2 outline-none focus:ring-2 focus:ring-violet-500"
        />

        <label className="block text-sm font-medium text-slate-800 dark:text-slate-200 mt-4 mb-1">
          Prompt / Generation Details (optional)
        </label>
        <textarea
          value={promptDetails}
          onChange={(e) => setPromptDetails(e.target.value)}
          rows={4}
          placeholder="Model, seed, steps, negative prompts..."
          className="w-full rounded-xl border border-slate-300/60 dark:border-slate-700/60 bg-white/80 dark:bg-slate-900/80 px-3 py-2 outline-none focus:ring-2 focus:ring-violet-500"
        />
      </div>

      <div className="lg:col-span-2">
        <label className="block text-sm font-medium text-slate-800 dark:text-slate-200 mb-1">
          Category *
        </label>
        <select
          value={category}
          onChange={(e) => setCategory(e.target.value)}
          className="w-full rounded-xl border border-slate-300/60 dark:border-slate-700/60 bg-white/80 dark:bg-slate-900/80 px-3 py-2 outline-none focus:ring-2 focus:ring-violet-500"
        >
          {CATEGORIES.map((c) => (
            <option key={c} value={c}>
              {c}
            </option>
          ))}
        </select>

        <label className="block text-sm font-medium text-slate-800 dark:text-slate-200 mt-4 mb-1">
          Tags (up to 10)
        </label>
        <div className="flex items-center gap-2">
          <div className="relative flex-1">
            <Tag className="h-4 w-4 absolute left-3 top-1/2 -translate-y-1/2 text-slate-500" />
            <input
              value={tagInput}
              onChange={(e) => setTagInput(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === "Enter") {
                  e.preventDefault();
                  onAddTag(tagInput);
                }
              }}
              placeholder="Press Enter to add"
              className="w-full rounded-xl border border-slate-300/60 dark:border-slate-700/60 bg-white/80 dark:bg-slate-900/80 ps-9 pe-3 py-2 outline-none focus:ring-2 focus:ring-violet-500"
            />
          </div>
          <button
            onClick={() => onAddTag(tagInput)}
            className="rounded-xl px-3 py-2 bg-violet-600 text-white hover:bg-violet-700"
          >
            Add
          </button>
        </div>

        {tags.length > 0 && (
          <div className="mt-2 flex flex-wrap gap-2">
            {tags.map((t) => (
              <span
                key={t}
                className="inline-flex items-center gap-1 rounded-full border border-violet-300/60 dark:border-violet-700/60 bg-violet-50/70 dark:bg-violet-950/20 px-3 py-1 text-xs text-violet-800 dark:text-violet-200"
              >
                {t}
                <button
                  onClick={() => onRemoveTag(t)}
                  className="p-0.5 hover:text-violet-600 dark:hover:text-violet-300"
                >
                  <X className="h-3 w-3" />
                </button>
              </span>
            ))}
          </div>
        )}

        <label className="block text-sm font-medium text-slate-800 dark:text-slate-200 mt-4 mb-1">
          AI Tool (optional)
        </label>
        <input
          value={aiTool}
          onChange={(e) => setAiTool(e.target.value)}
          placeholder="Midjourney, Stable Diffusion, DALL·E, Custom..."
          className="w-full rounded-xl border border-slate-300/60 dark:border-slate-700/60 bg-white/80 dark:bg-slate-900/80 px-3 py-2 outline-none focus:ring-2 focus:ring-violet-500"
        />
      </div>
    </div>
  );
}

function SubmissionTypeTabs({
  value,
  onChange,
}: {
  value: SubmissionType[];
  onChange: (v: SubmissionType[]) => void;
}) {
  const tabs: { key: SubmissionType; label: string; icon: React.ReactNode }[] =
    [
      { key: "general", label: "Gallery Only", icon: <ImageIcon className="h-4 w-4" /> },
      { key: "sell", label: "Sell", icon: <DollarSign className="h-4 w-4" /> },
      { key: "contest", label: "Contest", icon: <Trophy className="h-4 w-4" /> },
    ];

  const toggleSubmissionType = (type: SubmissionType) => {
    if (value.includes(type)) {
      // Remove if already selected (but keep at least one)
      if (value.length > 1) {
        onChange(value.filter(v => v !== type));
      }
    } else {
      // Add if not selected
      onChange([...value, type]);
    }
  };

  return (
    <div className="space-y-3">
      <h3 className="text-sm font-medium text-slate-800 dark:text-slate-200">
        Submission Options (select one or more)
      </h3>
      <div className="flex flex-wrap gap-2">
        {tabs.map((t) => {
          const active = value.includes(t.key);
          return (
            <button
              key={t.key}
              onClick={() => toggleSubmissionType(t.key)}
              className={[
                "inline-flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium border transition-all",
                active
                  ? "bg-violet-600 text-white border-violet-600 shadow-md"
                  : "text-slate-700 dark:text-slate-200 border-slate-300/60 dark:border-slate-700/60 hover:bg-slate-100 dark:hover:bg-slate-800",
              ].join(" ")}
            >
              {t.icon}
              {t.label}
              {active && <span className="text-xs">✓</span>}
            </button>
          );
        })}
      </div>
    </div>
  );
}

function MultiSelectDropdown({
  options,
  value,
  onChange,
  placeholder = "Select options...",
}: {
  options: MultiSelectOption[];
  value: string[];
  onChange: (value: string[]) => void;
  placeholder?: string;
}) {
  const [isOpen, setIsOpen] = useState(false);

  const toggleOption = (optionValue: string) => {
    if (value.includes(optionValue)) {
      onChange(value.filter(v => v !== optionValue));
    } else {
      onChange([...value, optionValue]);
    }
  };

  const selectedLabels = options
    .filter(opt => value.includes(opt.value))
    .map(opt => opt.label)
    .join(", ");

  return (
    <div className="relative">
      <button
        type="button"
        onClick={() => setIsOpen(!isOpen)}
        className="w-full rounded-xl border border-slate-300/60 dark:border-slate-700/60 bg-white/80 dark:bg-slate-900/80 px-3 py-2 text-left outline-none focus:ring-2 focus:ring-violet-500 flex items-center justify-between"
      >
        <span className={selectedLabels ? "text-slate-900 dark:text-slate-100" : "text-slate-500 dark:text-slate-400"}>
          {selectedLabels || placeholder}
        </span>
        <svg className={`h-4 w-4 transition-transform ${isOpen ? 'rotate-180' : ''}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
        </svg>
      </button>

      {isOpen && (
        <div className="absolute z-10 mt-1 w-full rounded-xl border border-slate-300/60 dark:border-slate-700/60 bg-white dark:bg-slate-900 shadow-lg max-h-60 overflow-auto">
          {options.map((option) => (
            <button
              key={option.value}
              type="button"
              onClick={() => toggleOption(option.value)}
              className={[
                "w-full px-3 py-2 text-left hover:bg-slate-100 dark:hover:bg-slate-800 flex items-center justify-between",
                value.includes(option.value) ? "bg-violet-50 dark:bg-violet-950/20 text-violet-700 dark:text-violet-300" : "text-slate-700 dark:text-slate-200"
              ].join(" ")}
            >
              {option.label}
              {value.includes(option.value) && (
                <span className="text-violet-600 dark:text-violet-400">✓</span>
              )}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}

function StepMonetizeContest({
  submissionTypes,
  setSubmissionTypes,
  // sell
  price,
  setPrice,
  licenseTypes,
  setLicenseTypes,
  printOnDemand,
  setPrintOnDemand,
  sellPrompt,
  setSellPrompt,
  promptPrice,
  setPromptPrice,
  // contest
  selectedContest,
  setSelectedContest,
  agreedToRules,
  setAgreedToRules,
  agreedToTerms,
  setAgreedToTerms,
}: {
  submissionTypes: SubmissionType[];
  setSubmissionTypes: (v: SubmissionType[]) => void;
  price?: number;
  setPrice: (n?: number) => void;
  licenseTypes: string[];
  setLicenseTypes: (v: string[]) => void;
  printOnDemand: boolean;
  setPrintOnDemand: (b: boolean) => void;
  sellPrompt: boolean;
  setSellPrompt: (b: boolean) => void;
  promptPrice?: number;
  setPromptPrice: (n?: number) => void;
  selectedContest?: string;
  setSelectedContest: (v?: string) => void;
  agreedToRules: boolean;
  setAgreedToRules: (b: boolean) => void;
  agreedToTerms: boolean;
  setAgreedToTerms: (b: boolean) => void;
}) {
  return (
    <div className="space-y-6">
      <SubmissionTypeTabs value={submissionTypes} onChange={setSubmissionTypes} />

      {/* SELL */}
      {submissionTypes.includes("sell") && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className="block text-sm font-medium text-slate-800 dark:text-slate-200 mb-1">
              Price (USD) *
            </label>
            <input
              type="number"
              min={0}
              step="0.01"
              value={price ?? ""}
              onChange={(e) => setPrice(e.target.value ? Number(e.target.value) : undefined)}
              placeholder="e.g. 19.99"
              className="w-full rounded-xl border border-slate-300/60 dark:border-slate-700/60 bg-white/80 dark:bg-slate-900/80 px-3 py-2 outline-none focus:ring-2 focus:ring-violet-500"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-slate-800 dark:text-slate-200 mb-1">
              License Types *
            </label>
            <MultiSelectDropdown
              options={LICENSES}
              value={licenseTypes}
              onChange={setLicenseTypes}
              placeholder="Select license types..."
            />
          </div>

          <div className="md:col-span-2">
            <label className="inline-flex items-center gap-2">
              <input
                type="checkbox"
                checked={printOnDemand}
                onChange={(e) => setPrintOnDemand(e.target.checked)}
                className="h-4 w-4 rounded border-slate-300 text-violet-600 focus:ring-violet-500"
              />
              <span className="text-sm text-slate-800 dark:text-slate-200">
                Enable Print-on-Demand
              </span>
            </label>
            <p className="text-xs text-slate-600 dark:text-slate-300 mt-1">
              Allow customers to order prints of your artwork
            </p>
          </div>

          <div className="md:col-span-2">
            <label className="inline-flex items-center gap-2">
              <input
                type="checkbox"
                checked={sellPrompt}
                onChange={(e) => setSellPrompt(e.target.checked)}
                className="h-4 w-4 rounded border-slate-300 text-violet-600 focus:ring-violet-500"
              />
              <span className="text-sm text-slate-800 dark:text-slate-200">
                Also sell the AI prompt
              </span>
            </label>
            <p className="text-xs text-slate-600 dark:text-slate-300 mt-1">
              Allow buyers to purchase the exact prompt used to create this artwork
            </p>

            {sellPrompt && (
              <div className="mt-3">
                <label className="block text-sm font-medium text-slate-800 dark:text-slate-200 mb-1">
                  Prompt Price (USD) *
                </label>
                <input
                  type="number"
                  min={0}
                  step="0.01"
                  value={promptPrice ?? ""}
                  onChange={(e) => setPromptPrice(e.target.value ? Number(e.target.value) : undefined)}
                  placeholder="e.g. 5.99"
                  className="w-full rounded-xl border border-slate-300/60 dark:border-slate-700/60 bg-white/80 dark:bg-slate-900/80 px-3 py-2 outline-none focus:ring-2 focus:ring-violet-500"
                />
                <p className="text-xs text-slate-600 dark:text-slate-300 mt-1">
                  Recommended: $2-10 for prompts
                </p>
              </div>
            )}
          </div>
        </div>
      )}

      {/* CONTEST */}
      {submissionTypes.includes("contest") && (
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-slate-800 dark:text-slate-200 mb-1">
              Select Contest *
            </label>
            <select
              value={selectedContest ?? ""}
              onChange={(e) =>
                setSelectedContest(e.target.value ? e.target.value : undefined)
              }
              className="w-full rounded-xl border border-slate-300/60 dark:border-slate-700/60 bg-white/80 dark:bg-slate-900/80 px-3 py-2 outline-none focus:ring-2 focus:ring-violet-500"
            >
              <option value="">Choose contest</option>
              {CONTESTS.map((c) => (
                <option key={c.id} value={c.id}>
                  {c.label}
                </option>
              ))}
            </select>
          </div>

          <label className="inline-flex items-center gap-2">
            <input
              type="checkbox"
              checked={agreedToRules}
              onChange={(e) => setAgreedToRules(e.target.checked)}
              className="h-4 w-4 rounded border-slate-300 text-violet-600 focus:ring-violet-500"
            />
            <span className="text-sm text-slate-800 dark:text-slate-200">
              I agree to the contest rules and confirm I own the rights.
            </span>
          </label>

          <div className="text-xs text-slate-600 dark:text-slate-300 flex items-start gap-2">
            <Info className="h-4 w-4 mt-0.5" />
            <p>
              Submissions may be featured on the homepage Top 5. Make sure your
              asset meets the contest theme and community guidelines.
            </p>
          </div>
        </div>
      )}

      {/* GALLERY ONLY */}
      {submissionTypes.includes("general") && !submissionTypes.includes("sell") && !submissionTypes.includes("contest") && (
        <div className="rounded-xl border border-slate-300/60 dark:border-slate-700/60 p-4 bg-white/70 dark:bg-slate-900/70 text-sm text-slate-700 dark:text-slate-200">
          This upload will appear in your gallery and can be shared with the
          community. You can convert it to a listing or contest submission
          later.
        </div>
      )}

      {/* USER AGREEMENTS */}
      <div className="space-y-4 pt-4 border-t border-slate-300/60 dark:border-slate-700/60">
        <h3 className="text-sm font-medium text-slate-800 dark:text-slate-200">
          User Agreements
        </h3>
        
        <div className="space-y-3">
          <label className="flex items-start gap-3">
            <input
              type="checkbox"
              checked={agreedToTerms}
              onChange={(e) => setAgreedToTerms(e.target.checked)}
              className="h-4 w-4 rounded border-slate-300 text-violet-600 focus:ring-violet-500 mt-0.5"
            />
            <div className="text-sm">
              <span className="text-slate-800 dark:text-slate-200">
                I agree to the{" "}
                <a href="/terms" className="text-violet-600 hover:text-violet-700 underline">
                  Terms of Service
                </a>{" "}
                and{" "}
                <a href="/privacy" className="text-violet-600 hover:text-violet-700 underline">
                  Privacy Policy
                </a>
                {" "}*
              </span>
              <p className="text-xs text-slate-600 dark:text-slate-300 mt-1">
                Required for all submissions
              </p>
            </div>
          </label>

          <label className="flex items-start gap-3">
            <input
              type="checkbox"
              className="h-4 w-4 rounded border-slate-300 text-violet-600 focus:ring-violet-500 mt-0.5"
            />
            <div className="text-sm">
              <span className="text-slate-800 dark:text-slate-200">
                I confirm that I own the rights to this content and it doesn't infringe on any copyrights
              </span>
              <p className="text-xs text-slate-600 dark:text-slate-300 mt-1">
                Recommended for legal protection
              </p>
            </div>
          </label>

          <label className="flex items-start gap-3">
            <input
              type="checkbox"
              className="h-4 w-4 rounded border-slate-300 text-violet-600 focus:ring-violet-500 mt-0.5"
            />
            <div className="text-sm">
              <span className="text-slate-800 dark:text-slate-200">
                I want to receive email notifications about my submissions and sales
              </span>
              <p className="text-xs text-slate-600 dark:text-slate-300 mt-1">
                Optional marketing communications
              </p>
            </div>
          </label>
        </div>
      </div>
    </div>
  );
}
