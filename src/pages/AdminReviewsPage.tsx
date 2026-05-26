import { FormEvent, useMemo, useState } from "react";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { AlertTriangle, PencilLine, Trash2 } from "lucide-react";
import {
  createAdminReview,
  deleteAdminReview,
  fetchAdminReviews,
  updateAdminReview,
  type AdminReview,
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

const AdminReviewsPage = () => {
  const queryClient = useQueryClient();
  const { toast } = useToast();

  const [reviewer, setReviewer] = useState("");
  const [review, setReview] = useState("");
  const [rating, setRating] = useState("");
  const [isInactive, setIsInactive] = useState<boolean>(false);
  const [editingReview, setEditingReview] = useState<AdminReview | null>(null);
  const [reviewToDelete, setReviewToDelete] = useState<AdminReview | null>(null);
  const [formKey, setFormKey] = useState(0);

  const { data: reviews = [], isLoading } = useQuery({
    queryKey: ["admin-reviews"],
    queryFn: fetchAdminReviews,
  });

  const activeCount = useMemo(() => reviews.filter((item) => !item.isInactive).length, [reviews]);
  const inactiveCount = useMemo(() => reviews.filter((item) => item.isInactive).length, [reviews]);

  const saveMutation = useMutation({
    mutationFn: async () => {
      

      const payload = {
        reviewer: reviewer.trim() || undefined,
        review: review.trim() || undefined,
        rating: rating.trim() ? Number(rating) : undefined,
        isInactive: isInactive || undefined,
      };

      if (editingReview) {
        await updateAdminReview({
          id: editingReview.id,
          reviewer: payload.reviewer,
          review: payload.review,
          rating: payload.rating ?? null,
          isInactive: payload.isInactive ?? null,
        });
        return;
      }

      await createAdminReview(payload);
    },
    onSuccess: async () => {
      await queryClient.invalidateQueries({ queryKey: ["admin-reviews"] });
      toast({
        title: editingReview ? "Review updated" : "Review created",
      });
      setReviewer("");
      setReview("");
      setRating("");
      setIsInactive(false);
      setEditingReview(null);
      setFormKey((currentKey) => currentKey + 1);
    },
    onError: (error: unknown) => {
      const message = error instanceof Error ? error.message : "Could not save review.";
      toast({
        title: "Save failed",
        description: message,
        variant: "destructive",
      });
    },
  });

  const deleteMutation = useMutation({
    mutationFn: (id: string) => deleteAdminReview(id),
    onSuccess: async () => {
      await queryClient.invalidateQueries({ queryKey: ["admin-reviews"] });
      toast({
        title: "Review deleted",
      });
    },
    onError: (error: unknown) => {
      const message = error instanceof Error ? error.message : "Could not delete review.";
      toast({
        title: "Delete failed",
        description: message,
        variant: "destructive",
      });
    },
  });

  const handleDelete = (review: AdminReview) => {
    setReviewToDelete(review);
  };

  const confirmDelete = () => {
    if (!reviewToDelete) {
      return;
    }

    deleteMutation.mutate(reviewToDelete.id, {
      onSettled: () => setReviewToDelete(null),
    });
  };

  const submitLabel = useMemo(() => {
    if (saveMutation.isPending) {
      return "Saving...";
    }

    return editingReview ? "Update Review" : "Add Review";
  }, [editingReview, saveMutation.isPending]);

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    saveMutation.mutate();
  };

  const handleStartEdit = (reviewItem: AdminReview) => {
   setEditingReview(reviewItem);
  setReviewer(reviewItem.reviewer ?? "");
  setReview(reviewItem.review ?? "");
  setRating(reviewItem.rating?.toString() ?? "");
  setIsInactive(Boolean(reviewItem.isInactive));
  };

  const handleCancelEdit = () => {
    setEditingReview(null);
    setReviewer("");
    setReview("");
    setRating("");
    setIsInactive(false);
    setFormKey((currentKey) => currentKey + 1);
  };

  return (
    <div className="bg-muted/20 px-4 py-8">
      <Dialog open={Boolean(reviewToDelete)} onOpenChange={(open) => !open && setReviewToDelete(null)}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader className="items-center text-center sm:items-start sm:text-left">
            <div className="flex h-12 w-12 items-center justify-center rounded-full bg-red-100 text-red-600">
              <AlertTriangle className="h-6 w-6" />
            </div>
            <DialogTitle className="mt-3 text-xl">Delete review?</DialogTitle>
            <DialogDescription className="text-sm leading-6">
              {reviewToDelete
                ? `Are you sure you want to delete this review by ${reviewToDelete.reviewer ?? "an author"}? This action cannot be undone.`
                : "Are you sure you want to delete this review? This action cannot be undone."}
            </DialogDescription>
          </DialogHeader>

          <DialogFooter className="mt-2 gap-2 sm:gap-3">
            <button
              type="button"
              onClick={() => setReviewToDelete(null)}
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
        Admin Review Panel
      </h1>

      <p className="mt-2 text-sm text-muted-foreground">
        Manage review entries and control which reviews appear publicly.
      </p>
    </div>

    <div className="grid gap-4 sm:grid-cols-3">
      <div className="rounded-2xl border border-border bg-muted/70 p-4">
        <p className="text-xs uppercase tracking-[0.24em] text-muted-foreground">
          Total reviews
        </p>
        <p className="mt-2 text-2xl font-semibold text-foreground">
          {reviews.length}
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
            <h2 className="text-lg font-semibold text-foreground">{editingReview ? "Edit Review" : "Add Review"}</h2>
            <form key={formKey} className="mt-4 grid gap-4" onSubmit={handleSubmit}>
              <div>
                <label htmlFor="reviewer-name" className="mb-1 block text-sm font-medium text-foreground">
                  Reviewer name
                </label>
                <input
                  id="reviewer-name"
                  type="text"
                  value={reviewer}
                  onChange={(event) => setReviewer(event.target.value)}
                  className="h-11 w-full rounded-md border border-input bg-background px-3 text-sm outline-none ring-offset-background focus-visible:ring-2 focus-visible:ring-ring"
                  placeholder="John Doe"
                  required
                />
              </div>

              <div>
                <label htmlFor="review-text" className="mb-1 block text-sm font-medium text-foreground">
                  Review text
                </label>
                <textarea
                  id="review-text"
                  rows={5}
                  value={review}
                  onChange={(event) => setReview(event.target.value)}
                  className="w-full rounded-md border border-input bg-background px-3 py-3 text-sm outline-none ring-offset-background focus-visible:ring-2 focus-visible:ring-ring"
                  placeholder="Enter the customer review here"
                  
                />
              </div>

              <div>
                <label htmlFor="review-rating" className="mb-1 block text-sm font-medium text-foreground">
                  Rating (optional)
                </label>
                <input
                  id="review-rating"
                  type="number"
                  min={1}
                  max={5}
                  step="0.1"
                  value={rating}
                  onChange={(event) => setRating(event.target.value)}
                  className="h-11 w-40 rounded-md border border-input bg-background px-3 text-sm outline-none ring-offset-background focus-visible:ring-2 focus-visible:ring-ring"
                  placeholder="5"
                  
                />
              </div>

              <div className="flex items-center gap-2">
                <input
                  id="review-inactive"
                  type="checkbox"
                  checked={!isInactive}
                  onChange={(e) => setIsInactive(!e.target.checked)}
                  className="h-4 w-4 rounded border-input bg-background"
                />
                <label htmlFor="review-inactive" className="text-sm text-foreground">
                  Mark review as active
                </label>
              </div>

              <div className="flex flex-wrap gap-3">
                <button
                  type="submit"
                  disabled={saveMutation.isPending}
                  className="h-11 rounded-md bg-primary px-5 text-sm font-semibold text-primary-foreground transition hover:opacity-90 disabled:cursor-not-allowed disabled:opacity-60"
                >
                  {submitLabel}
                </button>
                {editingReview && (
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
          <h2 className="text-lg font-semibold text-foreground">Saved Reviews</h2>
          {isLoading ? (
            <p className="mt-4 text-sm text-muted-foreground">Loading reviews...</p>
          ) : reviews.length === 0 ? (
            <p className="mt-4 text-sm text-muted-foreground">No reviews found.</p>
          ) : (
            <div className="mt-4 overflow-x-auto rounded-xl border border-border">
              <table className="w-full min-w-[760px] border-collapse bg-card text-left">
                <thead className="bg-muted/60">
                  <tr>
                    <th className="px-4 py-3 text-xs font-semibold uppercase tracking-wide text-muted-foreground">Reviewer</th>
                    <th className="px-4 py-3 text-xs font-semibold uppercase tracking-wide text-muted-foreground">Review</th>
                    <th className="px-4 py-3 text-xs font-semibold uppercase tracking-wide text-muted-foreground">Rating</th>
                    <th className="px-4 py-3 text-xs font-semibold uppercase tracking-wide text-muted-foreground">Activated</th>
                    <th className="px-4 py-3 text-xs font-semibold uppercase tracking-wide text-muted-foreground">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {reviews.map((reviewItem) => (
                    <tr key={reviewItem.id} className="border-t border-border align-middle">
                      <td className="px-4 py-3 text-sm font-medium text-foreground">
                        {reviewItem.reviewer ?? "Anonymous"}
                      </td>
                      <td className="px-4 py-3 text-sm text-foreground">
  {reviewItem.review
    ? reviewItem.review.length > 100
      ? `${reviewItem.review.slice(0, 100)}...`
      : reviewItem.review
    : "—"}
</td>
                      <td className="px-4 py-3 text-sm text-foreground">
                        {reviewItem.rating ?? "—"}
                      </td>
                      <td className="px-4 py-3 text-sm text-foreground">
                        <label className="inline-flex items-center gap-2">
                          <input
                            type="checkbox"
                            checked={!reviewItem.isInactive}
                            disabled={deleteMutation.isPending}
                            onChange={async () => {
                              const newInactive = !reviewItem.isInactive;
                              try {
                                await updateAdminReview({
                                  id: reviewItem.id,
                                  reviewer: reviewItem.reviewer,
                                  review: reviewItem.review,
                                  rating: reviewItem.rating ?? null,
                                  isInactive: newInactive,
                                });
                                await queryClient.invalidateQueries({ queryKey: ["admin-reviews"] });
                                toast({
                                  title: newInactive ? "Review deactivated" : "Review activated",
                                });
                              } catch (err: unknown) {
                                const message = err instanceof Error ? err.message : "Could not update review.";
                                toast({
                                  title: "Update failed",
                                  description: message,
                                  variant: "destructive",
                                });
                              }
                            }}
                          />
                          <span className="text-sm">{reviewItem.isInactive ? "Deactivated" : "Activated"}</span>
                        </label>
                      </td>
                      <td className="px-4 py-3">
                        <div className="flex gap-2">
                          <button
                            type="button"
                            onClick={() => handleStartEdit(reviewItem)}
                            className="inline-flex h-9 items-center gap-2 rounded-md bg-emerald-600 px-4 text-sm font-medium text-white transition hover:bg-emerald-700"
                          >
                            <PencilLine className="h-4 w-4" />
                            Edit
                          </button>
                          <button
                            type="button"
                            onClick={() => handleDelete(reviewItem)}
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

export default AdminReviewsPage;
