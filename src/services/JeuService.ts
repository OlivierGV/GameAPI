import JeuRepo from '@src/repos/JeuRepo';
import { IJeu } from '@src/models/Jeu';


// **** Variables **** //

export const USER_NOT_FOUND_ERR = 'User not found';


// **** Functions **** //

/**
 * Get all users.
 */
function getAll(): Promise<IJeu[]> {
  return JeuRepo.getAll();
}

/**
 * Get all users.
 */
function getBy(terme : String): Promise<IJeu[]> {
  return JeuRepo.getBy(terme);
}

/**
 * Get all users.
 */
function getRating(min : number, max : number): Promise<IJeu[]> {
  return JeuRepo.getRating(min, max);
}

/**
 * Add one user.
 */
function addOne(jeu: IJeu): Promise<void> {
  return JeuRepo.add(jeu);
}

/**
 * Update one user.
 */
async function updateOne(jeu: IJeu): Promise<void> {
  return JeuRepo.update(jeu);
}

/**
 * Delete a user by their id.
 */
async function _delete(theme: String): Promise<void> {
  return JeuRepo.delete(theme);
}


// **** Export default **** //

export default {
  getAll,
  getBy,
  getRating,
  addOne,
  updateOne,
  delete: _delete,
} as const;
