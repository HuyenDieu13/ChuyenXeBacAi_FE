export enum Gender {
  MALE = "MALE",     
  FEMALE = "FEMALE",
}

export const GENDER_LABEL: Record<Gender, string> = {
  [Gender.MALE]: "Nam",
  [Gender.FEMALE]: "Nữ",
};
