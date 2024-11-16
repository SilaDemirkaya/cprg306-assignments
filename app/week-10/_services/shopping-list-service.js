import { db } from "../_utils/firebase";
import { collection, getDocs, addDoc, query } from "firebase/firestore";

/**
 * Fetch all items for a user from Firestore.
 * @param {string} userId - The authenticated user's ID.
 * @returns {Promise<Array>} List of items.
 */
export async function getItems(userId) {
    const items = [];
    const q = query(collection(db, `users/${userId}/items`));
    const querySnapshot = await getDocs(q);
    querySnapshot.forEach((doc) => {
        items.push({ id: doc.id, ...doc.data() });
    });
    return items;
}

/**
 * Add a new item to Firestore for a specific user.
 * @param {string} userId - The authenticated user's ID.
 * @param {Object} item - The item to add, including name, quantity, and category.
 * @returns {Promise<string>} The ID of the added item.
 */
export async function addItem(userId, item) {
    const docRef = await addDoc(collection(db, `users/${userId}/items`), item);
    return docRef.id;
}
