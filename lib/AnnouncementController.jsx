import {
  addDoc,
  collection,
  deleteDoc,
  doc,
  getDoc,
  getDocs,
  orderBy,
  query,
  serverTimestamp,
  updateDoc,
  where,
} from "firebase/firestore";
import { db } from "./firebaseConfig";
import { useId } from "react";

const COLLECTION_NAME = "announcements";

export class AnnouncementController {
  static async createAnnouncement(postData, userId) {
    try {
      if (!userId) {
        throw new Error("User must be authenticated !");
      }

      const docData = {
        ...postData,
        userId: userId,
        createdAt: serverTimestamp(),
        updatedAt: serverTimestamp(),
      };

      const docRef = await addDoc(collection(db, COLLECTION_NAME), docData);

      return {
        id: docRef.id,
        ...docData,
      };
    } catch (error) {
      console.error("Error creating announcement : ", error);
      throw error;
    }
  }

  static async getAll() {
    try {
      const q = query(
        collection(db, COLLECTION_NAME),
        orderBy("createdAt", "desc")
      );

      const querySnapshot = await getDocs(q);

      const announcements = [];
      querySnapshot.forEach((doc) => {
        announcements.push({
          id: doc.id,
          ...doc.data(),
        });
      });

      return announcements;
    } catch (error) {
      console.error("Error getting announcements : ", error);
      throw error;
    }
  }

  static async getAnnouncementByUser(userId) {
    try {
      const q = query(
        collection(db, COLLECTION_NAME),
        where("userid", "==", userId),
        orderBy("createdAt", "desc")
      );

      const querySnapshot = await getDocs(q);

      const announcements = [];

      querySnapshot.forEach((doc) => {
        announcements.push({
          id: doc.id,
          ...doc.data(),
        });
      });

      return announcements;
    } catch (error) {
      console.error("Error getting announcements by  users : ", error);

      throw error;
    }
  }

  static async getAnnouncementById(announcementId) {
    try {
      const docRef = doc(db, COLLECTION_NAME, announcementId);

      const docSnap = await getDoc(docRef);

      if (docSnap.exists()) {
        return {
          id: docSnap.id,
          ...docSnap.data(),
        };
      } else {
        throw new Error("Announcement not found");
      }
    } catch (error) {
      console.error("Error getting announcement :", error);
      throw error;
    }
  }

  static async updateAnnouncement(announcementId, updateData, userId) {
    try {
      if (!userId) {
        throw new Error("User must be authenticated !");
      }

      const existingAnnouncement = await this.getAnnouncementById(
        announcementId
      );

      if (existingAnnouncement.userId !== userId) {
        throw new Error(
          "Unauthorized : You can only update your own announcements"
        );
      }

      const docRef = doc(db, COLLECTION_NAME, announcementId);

      const updatedData = {
        ...updateData,
        updatedAt: serverTimestamp(),
      };

      await updateDoc(docRef, updatedData);

      return {
        id: announcementId,
        ...existingAnnouncement,
        ...updatedData,
      };
    } catch (error) {
      console.error("Error updating announcement : ", error);

      throw error;
    }
  }

  static async deleteAnnouncement(announcementId, userId) {
    try {
      if (!userId) {
        throw new Error("User must be authenticated ");
      }

      const existingAnnouncement = await this.getAnnouncementById(
        announcementId
      );

      if (existingAnnouncement.userId !== userId) {
        throw new Error(
          "Unauthorized : You can only delete your own announcements"
        );
      }

      const docRef = doc(db, COLLECTION_NAME, announcementId);

      await deleteDoc(docRef);

      return {
        message: "Post deleted successfully",
      };
    } catch (error) {
      console.error("Error deleting announcement :", error);

      throw error;
    }
  }
}
