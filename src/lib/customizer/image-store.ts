import type { StoredImage } from "./types";

const DB_NAME = "ygdrassil-customizer";
const DB_VERSION = 1;
const STORE_NAME = "images";
const SLUG_INDEX = "slug";

function openDb(): Promise<IDBDatabase> {
  return new Promise((resolve, reject) => {
    if (typeof indexedDB === "undefined") {
      reject(new Error("IndexedDB tidak tersedia"));
      return;
    }

    const request = indexedDB.open(DB_NAME, DB_VERSION);

    request.onupgradeneeded = () => {
      const db = request.result;
      if (!db.objectStoreNames.contains(STORE_NAME)) {
        const store = db.createObjectStore(STORE_NAME, { keyPath: "id" });
        store.createIndex(SLUG_INDEX, "slug", { unique: false });
      }
    };

    request.onsuccess = () => resolve(request.result);
    request.onerror = () =>
      reject(request.error ?? new Error("Gagal membuka IndexedDB"));
  });
}

export async function putImage(image: StoredImage): Promise<void> {
  const db = await openDb();

  await new Promise<void>((resolve, reject) => {
    const transaction = db.transaction(STORE_NAME, "readwrite");
    transaction.objectStore(STORE_NAME).put(image);
    transaction.oncomplete = () => resolve();
    transaction.onerror = () =>
      reject(transaction.error ?? new Error("Gagal menyimpan gambar"));
  });

  db.close();
}

export async function getImage(id: string): Promise<StoredImage | null> {
  const db = await openDb();

  const result = await new Promise<StoredImage | null>((resolve, reject) => {
    const transaction = db.transaction(STORE_NAME, "readonly");
    const request = transaction.objectStore(STORE_NAME).get(id);
    request.onsuccess = () => resolve((request.result as StoredImage) ?? null);
    request.onerror = () =>
      reject(request.error ?? new Error("Gagal membaca gambar"));
  });

  db.close();
  return result;
}

export async function deleteImage(id: string): Promise<void> {
  const db = await openDb();

  await new Promise<void>((resolve, reject) => {
    const transaction = db.transaction(STORE_NAME, "readwrite");
    transaction.objectStore(STORE_NAME).delete(id);
    transaction.oncomplete = () => resolve();
    transaction.onerror = () =>
      reject(transaction.error ?? new Error("Gagal menghapus gambar"));
  });

  db.close();
}

export async function listImages(slug: string): Promise<StoredImage[]> {
  const db = await openDb();

  const result = await new Promise<StoredImage[]>((resolve, reject) => {
    const transaction = db.transaction(STORE_NAME, "readonly");
    const index = transaction.objectStore(STORE_NAME).index(SLUG_INDEX);
    const request = index.getAll(slug);
    request.onsuccess = () => resolve((request.result as StoredImage[]) ?? []);
    request.onerror = () =>
      reject(request.error ?? new Error("Gagal membaca daftar gambar"));
  });

  db.close();
  return result;
}

export async function deleteImagesBySlug(slug: string): Promise<void> {
  const db = await openDb();

  await new Promise<void>((resolve, reject) => {
    const transaction = db.transaction(STORE_NAME, "readwrite");
    const index = transaction.objectStore(STORE_NAME).index(SLUG_INDEX);
    const request = index.openCursor(slug);

    request.onsuccess = () => {
      const cursor = request.result;
      if (!cursor) return;
      cursor.delete();
      cursor.continue();
    };

    transaction.oncomplete = () => resolve();
    transaction.onerror = () =>
      reject(transaction.error ?? new Error("Gagal menghapus gambar"));
  });

  db.close();
}
