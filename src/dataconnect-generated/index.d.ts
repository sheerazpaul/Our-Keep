import { ConnectorConfig, DataConnect, QueryRef, QueryPromise, MutationRef, MutationPromise } from 'firebase/data-connect';

export const connectorConfig: ConnectorConfig;

export type TimestampString = string;
export type UUIDString = string;
export type Int64String = string;
export type DateString = string;




export interface CreateNewNoteData {
  note_insert: Note_Key;
}

export interface CreateNewNoteVariables {
  title: string;
  content: string;
  isFavorite?: boolean | null;
}

export interface DeleteNoteData {
  note_delete?: Note_Key | null;
}

export interface DeleteNoteVariables {
  id: UUIDString;
}

export interface GetMyNotesData {
  notes: ({
    id: UUIDString;
    title: string;
    content: string;
    isFavorite?: boolean | null;
    createdAt: TimestampString;
    updatedAt: TimestampString;
  } & Note_Key)[];
}

export interface NoteTag_Key {
  noteId: UUIDString;
  tagId: UUIDString;
  __typename?: 'NoteTag_Key';
}

export interface Note_Key {
  id: UUIDString;
  __typename?: 'Note_Key';
}

export interface Tag_Key {
  id: UUIDString;
  __typename?: 'Tag_Key';
}

export interface UpdateNoteData {
  note_update?: Note_Key | null;
}

export interface UpdateNoteVariables {
  id: UUIDString;
  title?: string | null;
  content?: string | null;
  isFavorite?: boolean | null;
}

export interface User_Key {
  id: UUIDString;
  __typename?: 'User_Key';
}

interface CreateNewNoteRef {
  /* Allow users to create refs without passing in DataConnect */
  (vars: CreateNewNoteVariables): MutationRef<CreateNewNoteData, CreateNewNoteVariables>;
  /* Allow users to pass in custom DataConnect instances */
  (dc: DataConnect, vars: CreateNewNoteVariables): MutationRef<CreateNewNoteData, CreateNewNoteVariables>;
  operationName: string;
}
export const createNewNoteRef: CreateNewNoteRef;

export function createNewNote(vars: CreateNewNoteVariables): MutationPromise<CreateNewNoteData, CreateNewNoteVariables>;
export function createNewNote(dc: DataConnect, vars: CreateNewNoteVariables): MutationPromise<CreateNewNoteData, CreateNewNoteVariables>;

interface GetMyNotesRef {
  /* Allow users to create refs without passing in DataConnect */
  (): QueryRef<GetMyNotesData, undefined>;
  /* Allow users to pass in custom DataConnect instances */
  (dc: DataConnect): QueryRef<GetMyNotesData, undefined>;
  operationName: string;
}
export const getMyNotesRef: GetMyNotesRef;

export function getMyNotes(): QueryPromise<GetMyNotesData, undefined>;
export function getMyNotes(dc: DataConnect): QueryPromise<GetMyNotesData, undefined>;

interface UpdateNoteRef {
  /* Allow users to create refs without passing in DataConnect */
  (vars: UpdateNoteVariables): MutationRef<UpdateNoteData, UpdateNoteVariables>;
  /* Allow users to pass in custom DataConnect instances */
  (dc: DataConnect, vars: UpdateNoteVariables): MutationRef<UpdateNoteData, UpdateNoteVariables>;
  operationName: string;
}
export const updateNoteRef: UpdateNoteRef;

export function updateNote(vars: UpdateNoteVariables): MutationPromise<UpdateNoteData, UpdateNoteVariables>;
export function updateNote(dc: DataConnect, vars: UpdateNoteVariables): MutationPromise<UpdateNoteData, UpdateNoteVariables>;

interface DeleteNoteRef {
  /* Allow users to create refs without passing in DataConnect */
  (vars: DeleteNoteVariables): MutationRef<DeleteNoteData, DeleteNoteVariables>;
  /* Allow users to pass in custom DataConnect instances */
  (dc: DataConnect, vars: DeleteNoteVariables): MutationRef<DeleteNoteData, DeleteNoteVariables>;
  operationName: string;
}
export const deleteNoteRef: DeleteNoteRef;

export function deleteNote(vars: DeleteNoteVariables): MutationPromise<DeleteNoteData, DeleteNoteVariables>;
export function deleteNote(dc: DataConnect, vars: DeleteNoteVariables): MutationPromise<DeleteNoteData, DeleteNoteVariables>;

