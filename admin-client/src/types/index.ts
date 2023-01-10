import { ChangeEvent } from "react";

export interface PhotoType {
  id: string;
  url: string;
  public_id?: string;
}

export interface ArticleType {
  category: string;
  headline: string;
  body: string;
  authored_by: string;
  authored_by_id: number | undefined;
  graphics_by: string;
  graphics_by_id: number | undefined;
  date: string;
  time: string;
}

export interface ErrorType {
  for: string;
  message: string;
}

export interface JournalistType {
  first_name: string;
  last_name: string;
  course: string;
  position: string;
  photos: PhotoType[];
}

export interface ArticleContextType {
  articleDetails: ArticleType;
  hasCustomDate: boolean;
  onInputChangeHandler: (
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => void;
  onDropdownItemSelectedHandler: (
    inputName: string,
    name: string,
    id: number
  ) => void;
  onToggleHasCustomDateHandler: () => void;
}

export interface TextInputPropType {
  labelPlaceholder: string;
  inputName: string;
  hasError: boolean;
  isTextarea?: boolean;
}

export interface DropdownSelectInputPropType extends TextInputPropType {}

export interface DropdownOptionsType {
  id: number;
  name: string;
  position: string;
}
