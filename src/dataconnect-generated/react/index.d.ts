import { CreateNewNoteData, CreateNewNoteVariables, GetMyNotesData, UpdateNoteData, UpdateNoteVariables, DeleteNoteData, DeleteNoteVariables } from '../';
import { UseDataConnectQueryResult, useDataConnectQueryOptions, UseDataConnectMutationResult, useDataConnectMutationOptions} from '@tanstack-query-firebase/react/data-connect';
import { UseQueryResult, UseMutationResult} from '@tanstack/react-query';
import { DataConnect } from 'firebase/data-connect';
import { FirebaseError } from 'firebase/app';


export function useCreateNewNote(options?: useDataConnectMutationOptions<CreateNewNoteData, FirebaseError, CreateNewNoteVariables>): UseDataConnectMutationResult<CreateNewNoteData, CreateNewNoteVariables>;
export function useCreateNewNote(dc: DataConnect, options?: useDataConnectMutationOptions<CreateNewNoteData, FirebaseError, CreateNewNoteVariables>): UseDataConnectMutationResult<CreateNewNoteData, CreateNewNoteVariables>;

export function useGetMyNotes(options?: useDataConnectQueryOptions<GetMyNotesData>): UseDataConnectQueryResult<GetMyNotesData, undefined>;
export function useGetMyNotes(dc: DataConnect, options?: useDataConnectQueryOptions<GetMyNotesData>): UseDataConnectQueryResult<GetMyNotesData, undefined>;

export function useUpdateNote(options?: useDataConnectMutationOptions<UpdateNoteData, FirebaseError, UpdateNoteVariables>): UseDataConnectMutationResult<UpdateNoteData, UpdateNoteVariables>;
export function useUpdateNote(dc: DataConnect, options?: useDataConnectMutationOptions<UpdateNoteData, FirebaseError, UpdateNoteVariables>): UseDataConnectMutationResult<UpdateNoteData, UpdateNoteVariables>;

export function useDeleteNote(options?: useDataConnectMutationOptions<DeleteNoteData, FirebaseError, DeleteNoteVariables>): UseDataConnectMutationResult<DeleteNoteData, DeleteNoteVariables>;
export function useDeleteNote(dc: DataConnect, options?: useDataConnectMutationOptions<DeleteNoteData, FirebaseError, DeleteNoteVariables>): UseDataConnectMutationResult<DeleteNoteData, DeleteNoteVariables>;
