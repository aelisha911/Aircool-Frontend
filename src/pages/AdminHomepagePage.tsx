import { useState } from "react";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { ArrowDown, ArrowUp, Plus, Save, Trash2 } from "lucide-react";
import { defaultHomepageSections, type HomepageSection, type HomepageSectionType } from "@/data/homepage";
import { fetchHomepageSections, saveHomepageSections } from "@/services/api";
import { useToast } from "@/hooks/use-toast";

const sectionTypes: HomepageSectionType[] = ["hero", "services", "discounts", "benefits", "testimonials", "cta", "custom"];

const AdminHomepagePage = () => {
  const queryClient = useQueryClient();
  const { toast } = useToast();
  const { data: remoteSections, isLoading } = useQuery({ queryKey: ["homepage-sections"], queryFn: fetchHomepageSections });
  const [draft, setDraft] = useState<HomepageSection[] | null>(null);
  const [itemsText, setItemsText] = useState<Record<string, string>>({});
  const sections = draft ?? remoteSections ?? defaultHomepageSections;

  const saveMutation = useMutation({
    mutationFn: () => saveHomepageSections(sections),
    onSuccess: async (persistedSections) => {
      queryClient.setQueryData(["homepage-sections"], persistedSections);
      setDraft(null);
      toast({ title: "Homepage saved" });
    },
    onError: (error: unknown) => {
      let message = error instanceof Error ? error.message : "Could not save homepage.";
      if (error && typeof error === "object" && "response" in error) {
        const responseData = (error as { response?: { data?: unknown } }).response?.data;
        if (responseData && typeof responseData === "object" && "message" in responseData && typeof responseData.message === "string") {
          message = responseData.message;
        }
      }
      toast({ title: "Save failed", description: message, variant: "destructive" });
    },
  });

  const update = (index: number, patch: Partial<HomepageSection>) => {
    setDraft(sections.map((section, currentIndex) => currentIndex === index ? { ...section, ...patch } : section));
  };
  const move = (index: number, direction: -1 | 1) => {
    const target = index + direction;
    if (target < 0 || target >= sections.length) return;
    const next = [...sections];
    [next[index], next[target]] = [next[target], next[index]];
    setDraft(next);
  };
  const updateItems = (index: number, value: string) => {
    const section = sections[index];
    setItemsText((current) => ({ ...current, [section.id]: value }));
    try {
      const items = JSON.parse(value) as HomepageSection["items"];
      if (!Array.isArray(items)) throw new Error("Items must be an array.");
      update(index, { items });
    } catch { /* Keep the draft text editable until it becomes valid JSON. */ }
  };
  const validateItems = (index: number) => {
    const section = sections[index];
    const value = itemsText[section.id];
    if (!value) return;
    try {
      const items = JSON.parse(value) as HomepageSection["items"];
      if (!Array.isArray(items)) throw new Error();
    } catch {
      toast({ title: "Invalid items JSON", description: "Use an array of objects with title and description fields.", variant: "destructive" });
      setItemsText((current) => ({ ...current, [section.id]: JSON.stringify(section.items ?? [], null, 2) }));
    }
  };

  if (isLoading) return <p className="p-6 text-muted-foreground">Loading homepage...</p>;

  return (
    <div className="mx-auto w-full max-w-5xl space-y-6">
      <div className="flex flex-wrap items-center justify-between gap-4">
        <div><h1 className="text-3xl font-bold">Homepage</h1><p className="mt-1 text-sm text-muted-foreground">Add, remove, edit, enable, and reorder every homepage section.</p></div>
        <button type="button" onClick={() => saveMutation.mutate()} disabled={saveMutation.isPending} className="inline-flex items-center gap-2 rounded-lg bg-primary px-4 py-2 text-sm font-semibold text-white disabled:opacity-60"><Save size={16} />{saveMutation.isPending ? "Saving..." : "Save homepage"}</button>
      </div>
      {sections.map((section, index) => (
        <div key={section.id} className="rounded-2xl border border-border bg-background p-5 shadow-sm">
          <div className="mb-4 flex flex-wrap items-center justify-between gap-3">
            <div className="flex items-center gap-2"><span className="rounded-full bg-muted px-3 py-1 text-xs font-semibold">{index + 1}</span><input value={section.id} onChange={(event) => update(index, { id: event.target.value })} className="rounded border border-input px-2 py-1 text-sm font-semibold" aria-label="Section ID" /></div>
            <div className="flex items-center gap-2">
              <button type="button" onClick={() => move(index, -1)} disabled={index === 0} className="rounded border p-2 disabled:opacity-30" aria-label="Move section up"><ArrowUp size={16} /></button>
              <button type="button" onClick={() => move(index, 1)} disabled={index === sections.length - 1} className="rounded border p-2 disabled:opacity-30" aria-label="Move section down"><ArrowDown size={16} /></button>
              <button type="button" onClick={() => setDraft(sections.filter((_, currentIndex) => currentIndex !== index))} className="rounded border border-red-200 p-2 text-red-600" aria-label="Delete section"><Trash2 size={16} /></button>
            </div>
          </div>
          <div className="grid gap-4 md:grid-cols-2">
            <label className="text-sm font-medium">Type<select value={section.type} onChange={(event) => update(index, { type: event.target.value as HomepageSectionType })} className="mt-1 w-full rounded border border-input bg-background px-3 py-2">{sectionTypes.map((type) => <option key={type}>{type}</option>)}</select></label>
            <label className="flex items-center gap-2 pt-7 text-sm font-medium"><input type="checkbox" checked={section.enabled} onChange={(event) => update(index, { enabled: event.target.checked })} /> Visible on homepage</label>
            <label className="text-sm font-medium">Eyebrow<input value={section.eyebrow ?? ""} onChange={(event) => update(index, { eyebrow: event.target.value })} className="mt-1 w-full rounded border border-input px-3 py-2" /></label>
            <label className="text-sm font-medium">Title<input value={section.title} onChange={(event) => update(index, { title: event.target.value })} className="mt-1 w-full rounded border border-input px-3 py-2" /></label>
            <label className="text-sm font-medium md:col-span-2">Body<textarea value={section.body ?? ""} onChange={(event) => update(index, { body: event.target.value })} rows={3} className="mt-1 w-full rounded border border-input px-3 py-2" /></label>
            <label className="text-sm font-medium">Button text<input value={section.buttonText ?? ""} onChange={(event) => update(index, { buttonText: event.target.value })} className="mt-1 w-full rounded border border-input px-3 py-2" /></label>
            <label className="text-sm font-medium">Button URL<input value={section.buttonUrl ?? ""} onChange={(event) => update(index, { buttonUrl: event.target.value })} className="mt-1 w-full rounded border border-input px-3 py-2" /></label>
            <label className="text-sm font-medium md:col-span-2">Image URL<input value={section.imageUrl ?? ""} onChange={(event) => update(index, { imageUrl: event.target.value })} className="mt-1 w-full rounded border border-input px-3 py-2" /></label>
            <label className="text-sm font-medium md:col-span-2">Items (JSON)<textarea value={itemsText[section.id] ?? JSON.stringify(section.items ?? [], null, 2)} onChange={(event) => updateItems(index, event.target.value)} onBlur={() => validateItems(index)} rows={5} className="mt-1 w-full rounded border border-input px-3 py-2 font-mono text-xs" placeholder='[{"title":"Example","description":"Example text","icon":"Award"}]' /></label>
          </div>
        </div>
      ))}
      <button type="button" onClick={() => setDraft([...sections, { id: `custom-${Date.now()}`, type: "custom", title: "New section", enabled: true }])} className="inline-flex items-center gap-2 rounded-lg border border-primary px-4 py-2 text-sm font-semibold text-primary"><Plus size={16} /> Add section</button>
    </div>
  );
};

export default AdminHomepagePage;
