import { IJeu, Jeu } from '@src/models/Jeu';
import mongoose from 'mongoose';

const uri =
  'mongodb://localhost:27017/jeux?readPreference=primary&ssl=false';

/**
 * Obtenir tous les jeux
 * @returns un tableau de jeux
 */
async function getAll(): Promise<IJeu[]> {
  try {
    await mongoose.connect(process.env.MONGODB_URI!);
    const jeux : Array<IJeu> = await Jeu.find();
    return jeux;
  } finally {
    mongoose.connection.close();
  }
}

/**
 * Permet de retrouver des jeux en fonction d'un terme
 * @param terme 
 * @returns un tableau de jeux
 */
async function getBy(terme : String): Promise<IJeu[]> {
  try {
    await mongoose.connect(process.env.MONGODB_URI!);
    const reponse : Array<IJeu> = await Jeu.find({ name : terme })
    return reponse;
  } finally {
    mongoose.connection.close();
  }
}

/**
 * Permet de retrouver des jeux depuis une tranche de notes
 * @param min la plus basse note
 * @param max la plus haute note
 * @returns un tableau de jeux
 */
async function getRating(min : number, max : number): Promise<IJeu[]> {
  try {
    await mongoose.connect(process.env.MONGODB_URI!);
    /** 
    /* Requête mongo inspiré de : https://stackoverflow.com/questions/48365283/how-to-find-values-between-a-range-in-mongodb 
    */
    const reponse : Array<IJeu> = await Jeu.find({ aggregated_rating_count : { $gte :  min, $lte : max} })
    return reponse;
  } finally {
    mongoose.connection.close();
  }
}

/**
 * Permet d'ajouter un jeu
 * @param jeu 
 */
async function add(jeu: IJeu): Promise<void> {
  try {
    await mongoose.connect(process.env.MONGODB_URI!);
    await Jeu.insertMany(jeu);
  } finally {
    mongoose.connection.close();
  }
}

/**
 * Permet de mettre un jeu à jour
 * @param jeu 
 */
async function update(jeu: IJeu): Promise<void> {
  try {
    const id = jeu._id;
    await mongoose.connect(process.env.MONGODB_URI!);
    console.log(await Jeu.findById(id));
    await Jeu.findByIdAndUpdate(id, jeu);
  } finally {
    mongoose.connection.close();
  }
}

/**
 * Permet de supprimer des jeux qui possèdent un thème précis
 * @param theme 
 */
async function delete_(theme: String): Promise<void> {
  try {
    await mongoose.connect(process.env.MONGODB_URI!);
    await Jeu.deleteMany({themes : theme});
  } finally {
    mongoose.connection.close();
  }
}


// **** Export default **** //

export default {
  getAll,
  getBy,
  getRating,
  add,
  update,
  delete: delete_,
} as const;
