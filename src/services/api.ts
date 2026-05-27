import axios from "axios";

export const getApiBaseUrl = () =>
  import.meta.env.VITE_API_URL || "http://localhost:5000";

export const getBackendOrigin = () =>
  import.meta.env.VITE_API_URL || "http://localhost:5000";

const API = axios.create({
  baseURL: getApiBaseUrl(),
});

export type ContactFormPayload = {
  name: string;
  email: string;
  phone: string;
  city: string;
  message: string;
};

// Homepage discount helpers removed — feature deprecated
export type DiscountImage = {
  imageUrl?: string;
  imageAlt?: string;
  videoUrl?: string;
  isInactive?: boolean;
  isActive?: boolean;
};

export type AdminDiscount = {
  id: string;
  title: string;
  imageUrl?: string;
  videoUrl?: string;
  isInactive?: boolean;
  isActive?: boolean;
};

export type AdminReview = {
  id: string;
  reviewer?: string;
  review: string;
  rating?: number;
  isInactive?: boolean;
  isActive?: boolean;
};

const toAbsoluteUrl = (value?: string) => {
  if (!value) {
    return undefined;
  }

  const cleanedValue = value.replace(/\\/g, "/").trim();

  if (cleanedValue.startsWith("data:")) {
    return cleanedValue;
  }

  if (cleanedValue.startsWith("//")) {
    return `http:${cleanedValue}`;
  }

  if (/^https?:\/\//i.test(cleanedValue)) {
    return cleanedValue;
  }

  if (/^www\./i.test(cleanedValue)) {
    return `https://${cleanedValue}`;
  }

  const normalizedPath = cleanedValue.startsWith("/")
    ? cleanedValue
    : `/${cleanedValue}`;
  return `${getBackendOrigin()}${normalizedPath}`;
};

const pickStringField = (source: Record<string, unknown>, keys: string[]) => {
  for (const key of keys) {
    const candidate = source[key];
    if (typeof candidate === "string" && candidate.trim().length > 0) {
      return candidate;
    }
  }

  return undefined;
};

const pickArrayField = (source: Record<string, unknown>, keys: string[]) => {
  for (const key of keys) {
    const candidate = source[key];
    if (Array.isArray(candidate)) {
      return candidate;
    }
  }

  return undefined;
};

const pickNumberField = (source: Record<string, unknown>, keys: string[]) => {
  for (const key of keys) {
    const candidate = source[key];
    if (typeof candidate === "number" && !Number.isNaN(candidate)) {
      return candidate;
    }
    if (typeof candidate === "string") {
      const numberValue = Number(candidate);
      if (!Number.isNaN(numberValue)) {
        return numberValue;
      }
    }
  }

  return undefined;
};

const toRecord = (value: unknown) => {
  if (!value || typeof value !== "object" || Array.isArray(value)) {
    return null;
  }

  return value as Record<string, unknown>;
};

const parseBoolean = (value: unknown): boolean | undefined => {
  if (typeof value === "boolean") return value;
  if (typeof value === "number") return value !== 0;
  if (typeof value === "string") {
    const v = value.trim().toLowerCase();
    if (v === "true" || v === "1" || v === "yes") return true;
    if (v === "false" || v === "0" || v === "no") return false;
  }

  return undefined;
};

const normalizeDiscountImage = (source: Record<string, unknown>): DiscountImage | null => {
  const imageValue = pickStringField(source, [
    "imageUrl",
    "image",
    "imagePath",
    "image_url",
    "ImageUrl",
    "Image",
    "ImagePath",
    "Image_Url",
    "photo",
    "Photo",
  ]);

  const imageUrl = toAbsoluteUrl(imageValue);

  const imageAlt = pickStringField(source, [
    "imageAlt",
    "image_alt",
    "ImageAlt",
    "Image_Alt",
    "title",
    "Title",
    "name",
    "Name",
  ]);

  const videoValue = pickVideoField(source, [
    "videoUrl",
    "video",
    "video_url",
    "videoFile",
    "video_file",
    "VideoUrl",
    "Video",
    "videoPath",
    "video_path",
    "mediaUrl",
    "media_url",
  ]);

  const videoUrl = toAbsoluteUrl(videoValue);

  if (!imageUrl && !videoUrl) {
    return null;
  }

  return { imageUrl, imageAlt, videoUrl };
};

const pickVideoField = (source: Record<string, unknown>, keys: string[]) => {
  for (const key of keys) {
    const candidate = source[key];
    if (typeof candidate === "string" && candidate.trim().length > 0) {
      return candidate;
    }
  }

  return undefined;
};

const normalizeAdminDiscount = (source: Record<string, unknown>): AdminDiscount | null => {
  const id = pickStringField(source, ["id", "_id", "discountId", "DiscountId"]);
  const title = pickStringField(source, ["title", "Title", "name", "Name"]) ?? "Untitled";
  const imageValue = pickStringField(source, [
    "imageUrl",
    "image",
    "imagePath",
    "image_url",
    "ImageUrl",
    "Image",
    "ImagePath",
    "Image_Url",
    "photo",
    "Photo",
  ]);

  const imageUrl = toAbsoluteUrl(imageValue);
  if (!id) {
    return null;
  }

  const videoValue = pickVideoField(source, [
    "videoUrl",
    "video",
    "video_url",
    "videoFile",
    "video_file",
    "VideoUrl",
    "Video",
    "videoPath",
    "video_path",
    "mediaUrl",
    "media_url",
  ]);

  const videoUrl = toAbsoluteUrl(videoValue);

  const isInactive = parseBoolean(
    source["isInactive"] ?? source["inactive"] ?? source["is_inactive"] ?? source["IsInactive"] ?? source["inactiveFlag"]
  );

  const isActiveVal = parseBoolean(
    source["isActive"] ?? source["active"] ?? source["is_active"] ?? source["IsActive"]
  );

  // Prefer explicit isActive when present, otherwise use isInactive
  const finalIsInactive = typeof isActiveVal === "boolean" ? !isActiveVal : isInactive;

  return {
    id,
    title,
    imageUrl,
    videoUrl,
    isInactive: finalIsInactive,
    isActive: typeof isActiveVal === "boolean" ? isActiveVal : undefined,
  };
};

const normalizeAdminReview = (source: Record<string, unknown>): AdminReview | null => {
  const id = pickStringField(source, ["id", "_id", "reviewId", "ReviewId"]);
  const review = pickStringField(source, ["review", "message", "text", "comment", "feedback"]) ?? "";
  if (!id ) {
    return null;
  }

  const reviewer = pickStringField(source, ["reviewer", "name", "author", "customer", "user"]);
  const rating = pickNumberField(source, ["rating", "stars", "score", "ratingValue"]);

  const isInactive = parseBoolean(
    source["isInactive"] ?? source["inactive"] ?? source["is_inactive"] ?? source["IsInactive"] ?? source["inactiveFlag"]
  );

  const isActiveVal = parseBoolean(
    source["isActive"] ?? source["active"] ?? source["is_active"] ?? source["IsActive"]
  );

  const finalIsInactive = typeof isActiveVal === "boolean" ? !isActiveVal : isInactive;

  return {
    id,
    reviewer,
    review,
    rating,
    isInactive: finalIsInactive,
    isActive: typeof isActiveVal === "boolean" ? isActiveVal : undefined,
  };
};

const extractDiscountItems = (payload: unknown) => {
  if (Array.isArray(payload)) {
    return payload;
  }

  const payloadObject = toRecord(payload);
  if (!payloadObject) {
    return [];
  }

  const nestedArray = pickArrayField(payloadObject, ["data", "discounts", "reviews", "items", "result", "results"]);
  if (nestedArray) {
    return nestedArray;
  }

  return [payloadObject];
};

const isDiscountActive = (itemObject: Record<string, unknown>) => {
  const isActiveVal = parseBoolean(
    itemObject["isActive"] ?? itemObject["active"] ?? itemObject["is_active"]
  );

  const isInactiveVal = parseBoolean(
    itemObject["isInactive"] ?? itemObject["inactive"] ?? itemObject["is_inactive"]
  );

  if (typeof isActiveVal === "boolean") {
    return isActiveVal;
  }

  if (typeof isInactiveVal === "boolean") {
    return !isInactiveVal;
  }

  return true;
};

export const sendContactForm = (data: ContactFormPayload) =>
  API.post("/api/send-email", data);

export const fetchLatestDiscountImage = () =>
  API.get<unknown>("/api/discounts").then((response) => {
    const discountItems = extractDiscountItems(response.data);

    for (const item of discountItems) {
      const itemObject = toRecord(item);
      if (!itemObject) {
        continue;
      }

      const normalizedImage = normalizeDiscountImage(itemObject);
      if (normalizedImage) {
        if (!isDiscountActive(itemObject)) {
          continue;
        }

        return {
          ...normalizedImage,
          isInactive: false,
        };
      }
    }

    return null;
  });

export const fetchActiveDiscounts = () =>
  API.get<unknown>("/api/discounts").then((response) => {
    const discountItems = extractDiscountItems(response.data);

    const activeDiscounts: DiscountImage[] = [];

    for (const item of discountItems) {
      const itemObject = toRecord(item);
      if (!itemObject || !isDiscountActive(itemObject)) {
        continue;
      }

      const normalizedDiscount = normalizeDiscountImage(itemObject);
      if (normalizedDiscount) {
        activeDiscounts.push(normalizedDiscount);
      }
    }

    return activeDiscounts;
  });

export const fetchAdminDiscounts = () =>
  API.get<unknown>("/api/discounts").then((response) => {
    const discountItems = extractDiscountItems(response.data);

    const normalizedItems: AdminDiscount[] = [];
    for (const item of discountItems) {
      const itemObject = toRecord(item);
      if (!itemObject) {
        continue;
      }

      const normalized = normalizeAdminDiscount(itemObject);
      if (normalized) {
        normalizedItems.push(normalized);
      }
    }

    return normalizedItems;
  });

export const createAdminDiscount = (payload: { title: string; imageFile?: File | null; videoFile?: File | null; videoUrl?: string; isInactive?: boolean }) => {
  const formData = new FormData();
  formData.append("title", payload.title);
  if (payload.imageFile) {
    formData.append("image", payload.imageFile);
  }
  if (payload.videoFile) {
    formData.append("videoUrl", payload.videoFile);
  } else if (payload.videoUrl) {
    formData.append("videoUrl", payload.videoUrl);
  }
  if (typeof payload.isInactive !== "undefined") formData.append("isInactive", String(payload.isInactive));

  return API.post("/api/discounts", formData);
};

export const updateAdminDiscount = (payload: {
  id: string;
  title: string;
  imageFile?: File | null;
  videoFile?: File | null;
  videoUrl?: string | null;
  isInactive?: boolean | null;
}) => {
  const formData = new FormData();
  formData.append("title", payload.title);
  if (payload.imageFile) {
    formData.append("image", payload.imageFile);
  }
  if (payload.videoFile) {
    formData.append("videoUrl", payload.videoFile);
  } else if (typeof payload.videoUrl !== "undefined" && payload.videoUrl !== null) {
    formData.append("videoUrl", payload.videoUrl);
  }
  if (typeof payload.isInactive !== "undefined" && payload.isInactive !== null) {
    formData.append("isInactive", String(payload.isInactive));
  }

  return API.put(`/api/discounts/${payload.id}`, formData);
};

export const deleteAdminDiscount = (id: string) => API.delete(`/api/discounts/${id}`);

export const fetchAdminReviews = () =>
  API.get("/api/reviews").then((response) => {
    // console.log("API Response:", response.data);

    const reviewItems = extractDiscountItems(response.data);

    const normalizedItems: AdminReview[] = [];

    for (const item of reviewItems) {
      // console.log("Review Item:", item);

      const itemObject = toRecord(item);

      const normalized = normalizeAdminReview(itemObject);

      // console.log("Normalized:", normalized);

      if (normalized) {
        normalizedItems.push(normalized);
      }
    }

    return normalizedItems;
  });

const buildReviewRequest = (payload: {
  reviewer?: string;
  review?: string;
  rating?: number | null;
  isInactive?: boolean | null;
}) => {
  const body: Record<string, unknown> = {};

  if (typeof payload.reviewer === "string") {
    body.reviewer = payload.reviewer.trim();
  }

  if (typeof payload.review === "string") {
    body.review = payload.review.trim();
  }

  if (typeof payload.rating !== "undefined" && payload.rating !== null) {
    body.rating = payload.rating;
  }

  if (typeof payload.isInactive !== "undefined" && payload.isInactive !== null) {
    body.isInactive = payload.isInactive;
    body.isActive = !payload.isInactive;
    body.active = !payload.isInactive;
  }

  return body;
};

export const createAdminReview = (payload: {
  reviewer?: string;
  review ?: string;
  rating?: number;
  isInactive?: boolean;
}) => API.post("/api/reviews", buildReviewRequest(payload));

export const updateAdminReview = (payload: {
  id: string;
  reviewer?: string;
  review?: string;
  rating?: number | null;
  isInactive?: boolean | null;
}) => {
  const body = buildReviewRequest(payload);
  return API.put(`/api/reviews/${payload.id}`, body);
};

export const deleteAdminReview = (id: string) => API.delete(`/api/reviews/${id}`);

export default API;