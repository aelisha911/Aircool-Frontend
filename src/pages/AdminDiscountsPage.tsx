import { FormEvent, useMemo, useState } from "react";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";
import { AlertTriangle, PencilLine, Trash2 } from "lucide-react";
import {
  createAdminDiscount,
  deleteAdminDiscount,
  fetchAdminDiscounts,
  updateAdminDiscount,
  type AdminDiscount,
} from "@/services/api";
import { adminLogout } from "@/lib/adminAuth";
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
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const { toast } = useToast();

  const [title, setTitle] = useState("");
  const [imageFile, setImageFile] = useState<File | null>(null);
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
        });
        return;
      }

      if (!imageFile) {
        throw new Error("Image is required for a new discount.");
      }

      await createAdminDiscount({
        title: title.trim(),
        imageFile,
      });
    },
    onSuccess: async () => {
      await queryClient.invalidateQueries({ queryKey: ["admin-discounts"] });
      await queryClient.invalidateQueries({ queryKey: ["latest-discount-image"] });
      toast({
        title: editingDiscount ? "Discount updated" : "Discount created",
      });
      setTitle("");
      setImageFile(null);
      setEditingDiscount(null);
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
      await queryClient.invalidateQueries({ queryKey: ["latest-discount-image"] });
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
  };

  const handleCancelEdit = () => {
    setEditingDiscount(null);
    setTitle("");
    setImageFile(null);
  };

  const handleLogout = () => {
    adminLogout();
    navigate("/admin/login", { replace: true });
  };

  return (
    <main className="min-h-screen bg-muted/20 px-4 py-8">
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

      <div className="mx-auto flex w-full max-w-6xl flex-col gap-8">
        <div className="flex flex-col gap-3 rounded-2xl border border-border bg-background p-6 shadow-sm sm:flex-row sm:items-center sm:justify-between">
          <div>
            <h1 className="text-2xl font-bold text-foreground">Admin Discount Panel</h1>
            <p className="text-sm text-muted-foreground">Add, edit, and delete discount title and image.</p>
          </div>
          <button
            type="button"
            onClick={handleLogout}
            className="h-10 rounded-md border border-input px-4 text-sm font-medium text-foreground transition hover:bg-muted"
          >
            Logout
          </button>
        </div>

        <div className="rounded-2xl border border-border bg-background p-6 shadow-sm">
          <h2 className="text-lg font-semibold text-foreground">{editingDiscount ? "Edit Discount" : "Add Discount"}</h2>
          <form className="mt-4 grid gap-4" onSubmit={handleSubmit}>
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
                required={!editingDiscount}
              />
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
                    <th className="px-4 py-3 text-xs font-semibold uppercase tracking-wide text-muted-foreground">Title</th>
                    <th className="px-4 py-3 text-xs font-semibold uppercase tracking-wide text-muted-foreground">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {discounts.map((discount) => (
                    <tr key={discount.id} className="border-t border-border align-middle">
                      <td className="px-4 py-3">
                        <img
                          src={discount.imageUrl}
                          alt={discount.title}
                          className="h-16 w-28 rounded-md object-cover"
                          loading="lazy"
                        />
                      </td>
                      <td className="px-4 py-3 text-sm font-medium text-foreground">{discount.title}</td>
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
    </main>
  );
};

export default AdminDiscountsPage;
