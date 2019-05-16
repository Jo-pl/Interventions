export interface IProbleme {
    id: number,
    prenom: string,
    nom: string,
    typeProbleme: number,
    notification: string,
    telephone?: string,
    courriel?: string,
    courrielConfirmation?: string,
    nounite?: number,
    description: string,
    dateProbleme: Date,
}