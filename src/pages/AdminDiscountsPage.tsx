import { FormEvent, useMemo, useState } from "react";

import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { AlertTriangle, PencilLine, Trash2 } from "lucide-react";
import {
  createAdminDiscount,
  deleteAdminDiscount,
  fetchAdminDiscounts,
  updateAdminDiscount,
  type AdminDiscount,
} from "@/services/api";
import { useToast } from "@/hooks/use-toast";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

const AdminDiscountsPage = () => {
  const queryClient = useQueryClient();
  const { toast } = useToast();

  const [title, setTitle] = useState("");
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [videoUrl, setVideoUrl] = useState<string>("");
  const [isInactive, setIsInactive] = useState<boolean>(false);
  const [videoFile, setVideoFile] = useState<File | null>(null);
  const [togglingId, setTogglingId] = useState<string | null>(null);
  const [formKey, setFormKey] = useState(0);
  const [editingDiscount, setEditingDiscount] = useState<AdminDiscount | null>(null);
  const [discountToDelete, setDiscountToDelete] = useState<AdminDiscount | null>(null);

  const { data: discounts = [], isLoading } = useQuery({
    queryKey: ["admin-discounts"],
    queryFn: fetchAdminDiscounts,
  });

  const saveMutation = useMutation({
    mutationFn: async () => {
      if (!title.trim()) {
        throw new Error("Title is required.");
      }

      if (editingDiscount) {
        await updateAdminDiscount({
          id: editingDiscount.id,
          title: title.trim(),
          imageFile,
          videoFile: videoFile ?? null,
          videoUrl: videoUrl || null,
          isInactive: isInactive ?? null,
        });
        return;
      }

      await createAdminDiscount({
        title: title.trim(),
        imageFile,
        videoFile: videoFile ?? undefined,
        videoUrl: videoUrl || undefined,
        isInactive: isInactive || undefined,
      });
    },
    onSuccess: async () => {
      await queryClient.invalidateQueries({ queryKey: ["admin-discounts"] });
      await queryClient.invalidateQueries({ queryKey: ["active-discounts"] });
      toast({
        title: editingDiscount ? "Discount updated" : "Discount created",
      });
      setTitle("");
      setImageFile(null);
      setVideoUrl("");
      setVideoFile(null);
      setIsInactive(false);
      setEditingDiscount(null);
      setFormKey((currentKey) => currentKey + 1);
    },
    onError: (error: unknown) => {
      const message = error instanceof Error ? error.message : "Could not save discount.";
      toast({
        title: "Save failed",
        description: message,
        variant: "destructive",
      });
    },
  });

  const deleteMutation = useMutation({
    mutationFn: (id: string) => deleteAdminDiscount(id),
    onSuccess: async () => {
      await queryClient.invalidateQueries({ queryKey: ["admin-discounts"] });
      await queryClient.invalidateQueries({ queryKey: ["active-discounts"] });
      toast({
        title: "Discount deleted",
      });
    },
    onError: async (error: unknown) => {
      let message = "Could not delete this discount.";

      if (error instanceof Error) {
        message = error.message;
      }

      if (error && typeof error === "object" && "response" in error) {
        const response = (error as { response?: { data?: unknown } }).response;
        const responseData = response?.data;

        if (typeof responseData === "string" && responseData.trim()) {
          message = responseData;
        } else if (
          responseData &&
          typeof responseData === "object" &&
          "message" in responseData &&
          typeof (responseData as { message?: unknown }).message === "string"
        ) {
          message = (responseData as { message: string }).message;
        }
      }

      toast({
        title: "Delete failed",
        description: message,
        variant: "destructive",
      });
    },
  });

  const handleDelete = (discount: AdminDiscount) => {
    setDiscountToDelete(discount);
  };

  const confirmDelete = () => {
    if (!discountToDelete) {
      return;
    }

    deleteMutation.mutate(discountToDelete.id, {
      onSettled: () => setDiscountToDelete(null),
    });
  };

  const activeCount = useMemo(() => discounts.filter((discount) => !discount.isInactive).length, [discounts]);
  const inactiveCount = useMemo(() => discounts.filter((discount) => discount.isInactive).length, [discounts]);

  const submitLabel = useMemo(() => {
    if (saveMutation.isPending) {
      return "Saving...";
    }

    return editingDiscount ? "Update Discount" : "Add Discount";
  }, [editingDiscount, saveMutation.isPending]);

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    saveMutation.mutate();
  };

  const handleStartEdit = (discount: AdminDiscount) => {
    setEditingDiscount(discount);
    setTitle(discount.title);
    setImageFile(null);
    setVideoUrl(discount.videoUrl ?? "");
    setIsInactive(Boolean(discount.isInactive));
    setVideoFile(null);
  };

  const handleCancelEdit = () => {
    setEditingDiscount(null);
    setTitle("");
    setImageFile(null);
    setVideoUrl("");
    setIsInactive(false);
    setVideoFile(null);
    setFormKey((currentKey) => currentKey + 1);
  };

  return (
    <div className="bg-muted/20 px-4 py-8">
      <Dialog open={Boolean(discountToDelete)} onOpenChange={(open) => !open && setDiscountToDelete(null)}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader className="items-center text-center sm:items-start sm:text-left">
            <div className="flex h-12 w-12 items-center justify-center rounded-full bg-red-100 text-red-600">
              <AlertTriangle className="h-6 w-6" />
            </div>
            <DialogTitle className="mt-3 text-xl">Delete discount?</DialogTitle>
            <DialogDescription className="text-sm leading-6">
              {discountToDelete
                ? `Are you sure you want to delete "${discountToDelete.title}"? This action cannot be undone.`
                : "Are you sure you want to delete this discount? This action cannot be undone."}
            </DialogDescription>
          </DialogHeader>

          <DialogFooter className="mt-2 gap-2 sm:gap-3">
            <button
              type="button"
              onClick={() => setDiscountToDelete(null)}
              className="h-11 rounded-md border border-input px-5 text-sm font-semibold text-foreground transition hover:bg-muted"
            >
              Cancel
            </button>
            <button
              type="button"
              onClick={confirmDelete}
              disabled={deleteMutation.isPending}
              className="inline-flex h-11 items-center gap-2 rounded-md bg-red-600 px-5 text-sm font-semibold text-white transition hover:bg-red-700 disabled:cursor-not-allowed disabled:opacity-60"
            >
              <Trash2 className="h-4 w-4" />
              Delete
            </button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      <div className="mx-auto w-full max-w-6xl space-y-8">
        <div className="rounded-2xl border border-border bg-background p-6 shadow-sm">
  <div className="space-y-3">
    <div>
      <h1 className="text-3xl font-bold text-foreground">
        Admin Discount Panel
      </h1>
      <p className="mt-2 text-sm text-muted-foreground">
        Manage discount assets, activation state, and homepage visibility from one place.
      </p>
    </div>

    <div className="grid gap-4 sm:grid-cols-3">
      <div className="rounded-2xl border border-border bg-muted/70 p-4">
        <p className="text-xs uppercase tracking-[0.24em] text-muted-foreground">
          Total discounts
        </p>
        <p className="mt-2 text-2xl font-semibold text-foreground">
          {discounts.length}
        </p>
      </div>

      <div className="rounded-2xl border border-border bg-muted/70 p-4">
        <p className="text-xs uppercase tracking-[0.24em] text-muted-foreground">
          Active
        </p>
        <p className="mt-2 text-2xl font-semibold text-foreground">
          {activeCount}
        </p>
      </div>

      <div className="rounded-2xl border border-border bg-muted/70 p-4">
        <p className="text-xs uppercase tracking-[0.24em] text-muted-foreground">
          Inactive
        </p>
        <p className="mt-2 text-2xl font-semibold text-foreground">
          {inactiveCount}
        </p>
      </div>
    </div>
  </div>
</div>
        <div className="space-y-6">
          <div className="rounded-2xl border border-border bg-background p-6 shadow-sm">
            <h2 className="text-lg font-semibold text-foreground">{editingDiscount ? "Edit Discount" : "Add Discount"}</h2>
            <form key={formKey} className="mt-4 grid gap-4" onSubmit={handleSubmit}>
              <div>
                <label htmlFor="discount-title" className="mb-1 block text-sm font-medium text-foreground">
                  Title
                </label>
                <input
                  id="discount-title"
                  type="text"
                  value={title}
                  onChange={(event) => setTitle(event.target.value)}
                  className="h-11 w-full rounded-md border border-input bg-background px-3 text-sm outline-none ring-offset-background focus-visible:ring-2 focus-visible:ring-ring"
                  placeholder="Summer AC Offer"
                  required
                />
              </div>

              <div>
                <label htmlFor="discount-image" className="mb-1 block text-sm font-medium text-foreground">
                  Image {editingDiscount ? "(optional for edit)" : ""}
                </label>
                <input
                  id="discount-image"
                  type="file"
                  accept="image/*"
                  onChange={(event) => setImageFile(event.target.files?.[0] ?? null)}
                  className="block w-full rounded-md border border-input bg-background px-3 py-2 text-sm text-foreground"
                  required={false}
                />
                {editingDiscount && (
                  <div className="mt-3 rounded-lg border border-dashed border-border bg-muted/20 p-3">
                    {editingDiscount.imageUrl ? (
                      <img
                        src={editingDiscount.imageUrl}
                        alt={editingDiscount.title}
                        className="h-32 w-full rounded-md object-contain bg-background"
                      />
                    ) : (
                      <div className="flex h-32 items-center justify-center rounded-md bg-background text-sm text-muted-foreground">
                        No image saved
                      </div>
                    )}
                  </div>
                )}
              </div>

              <div>
                <label htmlFor="discount-video-file" className="mb-1 block text-sm font-medium text-foreground">Choose video file (optional)</label>
                <input
                  id="discount-video-file"
                  type="file"
                  accept="video/*"
                  onChange={(e) => setVideoFile(e.target.files?.[0] ?? null)}
                  className="block w-full rounded-md border border-input bg-background px-3 py-2 text-sm text-foreground"
                />
                {editingDiscount && (
                  <div className="mt-3 rounded-lg border border-dashed border-border bg-muted/20 p-3">
                    {editingDiscount.videoUrl ? (
                      <video
                        controls
                        src={editingDiscount.videoUrl}
                        className="h-32 w-full rounded-md object-contain bg-background"
                      />
                    ) : (
                      <div className="flex h-32 items-center justify-center rounded-md bg-background text-sm text-muted-foreground">
                        No video saved
                      </div>
                    )}
                  </div>
                )}
              </div>

              <div className="flex items-center gap-2">
                <input
                  id="discount-inactive"
                  type="checkbox"
                  checked={!isInactive}
                  onChange={(e) => setIsInactive(!e.target.checked)}
                  className="h-4 w-4 rounded border-input bg-background"
                />
                <label htmlFor="discount-inactive" className="text-sm text-foreground">Mark as active (show on homepage)</label>
              </div>

              <div className="flex flex-wrap gap-3">
                <button
                  type="submit"
                  disabled={saveMutation.isPending}
                  className="h-11 rounded-md bg-primary px-5 text-sm font-semibold text-primary-foreground transition hover:opacity-90 disabled:cursor-not-allowed disabled:opacity-60"
                >
                  {submitLabel}
                </button>

                {editingDiscount && (
                  <button
                    type="button"
                    onClick={handleCancelEdit}
                    className="h-11 rounded-md border border-input px-5 text-sm font-semibold text-foreground transition hover:bg-muted"
                  >
                    Cancel Edit
                  </button>
                )}
              </div>
            </form>
          </div>
        </div>

        <div className="rounded-2xl border border-border bg-background p-6 shadow-sm">
          <h2 className="text-lg font-semibold text-foreground">Saved Discounts</h2>

          {isLoading ? (
            <p className="mt-4 text-sm text-muted-foreground">Loading discounts...</p>
          ) : discounts.length === 0 ? (
            <p className="mt-4 text-sm text-muted-foreground">No discounts found.</p>
          ) : (
            <div className="mt-4 overflow-x-auto rounded-xl border border-border">
              <table className="w-full min-w-[760px] border-collapse bg-card text-left">
                <thead className="bg-muted/60">
                  <tr>
                    <th className="px-4 py-3 text-xs font-semibold uppercase tracking-wide text-muted-foreground">Image</th>
                    <th className="px-4 py-3 text-xs font-semibold uppercase tracking-wide text-muted-foreground">Video</th>
                    <th className="px-4 py-3 text-xs font-semibold uppercase tracking-wide text-muted-foreground">Title</th>
                    <th className="px-4 py-3 text-xs font-semibold uppercase tracking-wide text-muted-foreground">Activated</th>
                    <th className="px-4 py-3 text-xs font-semibold uppercase tracking-wide text-muted-foreground">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {discounts.map((discount) => (
                    <tr key={discount.id} className="border-t border-border align-middle">
                      <td className="px-4 py-3">
                        {discount.imageUrl ? (
                          <img
                            src={discount.imageUrl}
                            alt={discount.title}
                            className="h-16 w-28 rounded-md object-cover"
                            loading="lazy"
                          />
                        ) : (
                          <div className="flex h-16 w-28 items-center justify-center rounded-md border border-dashed border-border bg-muted text-xs text-muted-foreground">
                            No image
                          </div>
                        )}
                      </td>
                      <td className="px-4 py-3 text-sm text-foreground">
                        {discount.videoUrl ? (
                          <a href={discount.videoUrl} target="_blank" rel="noreferrer" className="text-sm text-primary underline">
                            View
                          </a>
                        ) : (
                          <span className="text-sm text-muted-foreground">—</span>
                        )}
                      </td>
                      <td className="px-4 py-3 text-sm font-medium text-foreground">{discount.title}</td>
                      <td className="px-4 py-3 text-sm text-foreground">
                        <label className="inline-flex items-center gap-2">
                          <input
                            type="checkbox"
                            checked={!discount.isInactive}
                            disabled={togglingId === discount.id}
                            onChange={async () => {
                              const newInactive = !discount.isInactive;
                              setTogglingId(discount.id);
                              try {
                                await updateAdminDiscount({
                                  id: discount.id,
                                  title: discount.title,
                                  isInactive: newInactive,
                                });

                                // Refresh admin list
                                await queryClient.invalidateQueries({ queryKey: ["admin-discounts"] });
                                await queryClient.invalidateQueries({ queryKey: ["active-discounts"] });

                                toast({
                                  title: newInactive ? "Discount deactivated" : "Discount activated",
                                });
                              } catch (err: unknown) {
                                const message = err instanceof Error ? err.message : "Could not update discount.";
                                toast({
                                  title: "Update failed",
                                  description: message,
                                  variant: "destructive",
                                });
                              } finally {
                                setTogglingId(null);
                              }
                            }}
                          />
                          <span className="text-sm">{discount.isInactive ? "Deactivated" : "Activated"}</span>
                        </label>
                      </td>
                      <td className="px-4 py-3">
                        <div className="flex gap-2">
                          <button
                            type="button"
                            onClick={() => handleStartEdit(discount)}
                            className="inline-flex h-9 items-center gap-2 rounded-md bg-emerald-600 px-4 text-sm font-medium text-white transition hover:bg-emerald-700"
                          >
                            <PencilLine className="h-4 w-4" />
                            Edit
                          </button>
                          <button
                            type="button"
                            onClick={() => handleDelete(discount)}
                            disabled={deleteMutation.isPending}
                            className="inline-flex h-9 items-center gap-2 rounded-md bg-red-600 px-4 text-sm font-medium text-white transition hover:bg-red-700 disabled:cursor-not-allowed disabled:opacity-60"
                          >
                            <Trash2 className="h-4 w-4" />
                            Delete
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default AdminDiscountsPage;
