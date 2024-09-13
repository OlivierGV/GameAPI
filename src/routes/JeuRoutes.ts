import HttpStatusCodes from '@src/common/HttpStatusCodes';
import JeuService from '@src/services/JeuService';
import { IJeu } from '@src/models/Jeu';
import { IReq, IRes } from './common/types';


// **** Functions **** //

/**
 * Aller chercher tous les jeux
 * @param _
 * @param res 
 * @returns un tableau de jeux
 */
async function getAll(_: IReq, res: IRes) {
  const jeux : Array<IJeu> = await JeuService.getAll();
  return res.status(HttpStatusCodes.OK).json({ jeux });
}

/**
 * Aller chercher des jeux par un terme.
 * @param req 
 * @param res 
 * @returns un tableau de jeux
 */
async function getBy(req: IReq, res: IRes) {
  const terme : string = String(req.params.terme); 
  const jeux : Array<IJeu> = await JeuService.getBy(String(terme));
  return res.status(HttpStatusCodes.OK).json({ jeux });
}

/**
 * Aller chercher des jeux par une tranche de notes
 * @param req 
 * @param res 
 * @returns un tableau de jeux
 */
async function getRating(req: IReq, res: IRes) {
  const min : number = Number(req.params.min);
  const max : number = Number(req.params.max);
  const jeux : Array<IJeu> = await JeuService.getRating(min, max);
  return res.status(HttpStatusCodes.OK).json({ jeux });
}

/**
 * Ajouter un jeu
 * @param req 
 * @param res 
 * @returns un code
 */
async function add(req: IReq, res: IRes) {
  const jeu : Partial<IJeu> = req.body;
  if(jeu) {
    await JeuService.addOne(jeu as IJeu);
    return res.status(HttpStatusCodes.CREATED).end();
  } else {
    return res.status(HttpStatusCodes.NOT_ACCEPTABLE).end();
  }
}

/**
 * Mettre à jour un jeu
 * @param req 
 * @param res 
 * @returns un code
 */
async function update(req: IReq, res: IRes) {
  const jeu : Partial<IJeu> = req.body;
  if(jeu._id == undefined){
    return res.status(HttpStatusCodes.BAD_REQUEST).json({ "Veuillez insérer un ID" : 400})
  }
  await JeuService.updateOne(jeu as IJeu);
  return res.status(HttpStatusCodes.OK).end();
}

/**
 * Supprimer des jeux par un terme
 * @param req 
 * @param res 
 * @returns un code
 */
async function delete_(req: IReq, res: IRes) {
  const theme : string = String(req.params.theme);
  await JeuService.delete(theme);
  return res.status(HttpStatusCodes.OK).end();
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
