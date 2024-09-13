import mongoose, { Schema, model } from 'mongoose';

// **** Types **** //

interface IGenre {
  name: string;
  url : string;
}

export interface IJeu {
  _id: string; // Si tu utilises ObjectId, adapte ce champ en conséquence
  aggregated_rating_count?: number;
  first_release_date: Date;
  genres?: IGenre[];
  name?: string;
  platforms: string[];
  summary?: string;
  themes: string[];
}

const GenreSchema = new Schema<IGenre>({
  name: { type : String, required: [true, "Un genre doit possédé un nom."] },
  url : { type : String, required: [true, "Un genre doit être sourcé. "] }
})

const JeuSchema = new Schema<IJeu>({
  _id: { type : String },
  aggregated_rating_count: { 
    type : Number},
  first_release_date: { 
    type : Date,
    /**
     * Le code suivant a été partiellement inspiré de :
     * https://stackoverflow.com/questions/61762380/mongoose-how-to-restrict-date-to-be-bigger-than-today%C2%B4s-date
     * Il a ensuite été modifié par ChatGPT pour répondre à des besoins précis.
     */
    validate: {
      validator: function (value: Date)
      {
        const inputDate = new Date(value);
        // Vérifie si la valeur est une instance de Date et si elle est valide
        if (isNaN(inputDate.getTime())) {
          return false;
        }
        // Vérifie si la date est après le 31 décembre de l'année courante
        const yearEnd = new Date(2023, 11, 31); // 31 décembre de l'année en cours
        return inputDate > yearEnd;
      },
      message: props => `${props.value} doit être après le 31 décembre 2023.`
    }
  },
  genres : { type : [GenreSchema]},
  name : { type : String },
  platforms : { type : [String]}, 
  summary : { type : String },
  themes : { type : [String]},
})

mongoose.pluralize(null);
export const Jeu = model<IJeu>('Jeux', JeuSchema);