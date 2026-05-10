import axios from "axios";

export const getApiBaseUrl = () =>
  import.meta.env.DEV ? "" : import.meta.env.VITE_API_URL || "http://localhost:5000";

export const getBackendOrigin = () =>
  import.meta.env.DEV ? "http://localhost:5000" : import.meta.env.VITE_API_URL || "http://localhost:5000";

const API = axios.create({
  baseURL: getApiBaseUrl(),
  headers: {
    "Content-Type": "application/json",
  },
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
  imageUrl: string;
  imageAlt?: string;
};
export type AdminDiscount = {
  id: string;
  title: string;
  imageUrl: string;
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

const toRecord = (value: unknown) => {
  if (!value || typeof value !== "object" || Array.isArray(value)) {
    return null;
  }

  return value as Record<string, unknown>;
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
  if (!imageUrl) {
    return null;
  }

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

  return { imageUrl, imageAlt };
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
  if (!id || !imageUrl) {
    return null;
  }

  return {
    id,
    title,
    imageUrl,
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

  const nestedArray = pickArrayField(payloadObject, ["data", "discounts", "items", "result"]);
  if (nestedArray) {
    return nestedArray;
  }

  return [payloadObject];
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
        return normalizedImage;
      }
    }

    return null;
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

export const createAdminDiscount = (payload: { title: string; imageFile: File }) => {
  const formData = new FormData();
  formData.append("title", payload.title);
  formData.append("image", payload.imageFile);

  return API.post("/api/discounts", formData);
};

export const updateAdminDiscount = (payload: {
  id: string;
  title: string;
  imageFile?: File | null;
}) => {
  const formData = new FormData();
  formData.append("title", payload.title);
  if (payload.imageFile) {
    formData.append("image", payload.imageFile);
  }

  return API.put(`/api/discounts/${payload.id}`, formData);
};

export const deleteAdminDiscount = (id: string) => API.delete(`/api/discounts/${id}`);

export default API;