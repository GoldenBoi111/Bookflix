import { useStore } from "zustand";
import { createStore } from "zustand/vanilla";
import { persist, createJSONStorage } from "zustand/middleware";
import type { Book } from "@/utils/constants";

interface Store {
  toReadList: Book[];
  alreadyReadList: Book[];
  addToToRead: (book: Book) => void;
  addToAlreadyRead: (book: Book) => void;
  removeFromToRead: (id: number) => void;
  removeFromAlreadyRead: (id: number) => void;
  isInToRead: (id: number) => boolean;
  isInAlreadyRead: (id: number) => boolean;
  toggleStatus: (book: Book) => void; // Move between lists
}

const readingListStore = createStore<Store>()(
  persist(
    (set, get) => ({
      toReadList: [],
      alreadyReadList: [],
      addToToRead: (book) =>
        set((state) => ({
          toReadList: state.toReadList.some((b) => b.id === book.id)
            ? state.toReadList
            : [...state.toReadList, { ...book, status: 'to-read' }],
        })),
      addToAlreadyRead: (book) =>
        set((state) => ({
          alreadyReadList: state.alreadyReadList.some((b) => b.id === book.id)
            ? state.alreadyReadList
            : [...state.alreadyReadList, { ...book, status: 'already-read' }],
        })),
      removeFromToRead: (id) =>
        set((state) => ({
          toReadList: state.toReadList.filter((b) => b.id !== id),
        })),
      removeFromAlreadyRead: (id) =>
        set((state) => ({
          alreadyReadList: state.alreadyReadList.filter((b) => b.id !== id),
        })),
      isInToRead: (id) => get().toReadList.some((b) => b.id === id),
      isInAlreadyRead: (id) => get().alreadyReadList.some((b) => b.id === id),
      toggleStatus: (book) => {
        const state = get();
        const isInToRead = state.toReadList.some(b => b.id === book.id);
        const isInAlreadyRead = state.alreadyReadList.some(b => b.id === book.id);

        if (isInToRead) {
          // Move from To Read to Already Read
          set({
            toReadList: state.toReadList.filter(b => b.id !== book.id),
            alreadyReadList: state.alreadyReadList.some(b => b.id === book.id)
              ? state.alreadyReadList
              : [...state.alreadyReadList, { ...book, status: 'already-read' }]
          });
        } else if (isInAlreadyRead) {
          // Move from Already Read to To Read
          set({
            alreadyReadList: state.alreadyReadList.filter(b => b.id !== book.id),
            toReadList: state.toReadList.some(b => b.id === book.id)
              ? state.toReadList
              : [...state.toReadList, { ...book, status: 'to-read' }]
          });
        } else {
          // Add to To Read by default
          set({
            toReadList: [...state.toReadList, { ...book, status: 'to-read' }]
          });
        }
      }
    }),
    {
      name: "reading-list",
      storage: createJSONStorage(() => localStorage),
      partialize: (state) => ({
        toReadList: state.toReadList,
        alreadyReadList: state.alreadyReadList
      }),
    }
  )
);

export const useReadingList = () => useStore(readingListStore);
