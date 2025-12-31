import { queryRef, executeQuery, mutationRef, executeMutation, validateArgs } from 'firebase/data-connect';

export const connectorConfig = {
  connector: 'example',
  service: 'ourkeep',
  location: 'us-east4'
};

export const createNewNoteRef = (dcOrVars, vars) => {
  const { dc: dcInstance, vars: inputVars} = validateArgs(connectorConfig, dcOrVars, vars, true);
  dcInstance._useGeneratedSdk();
  return mutationRef(dcInstance, 'CreateNewNote', inputVars);
}
createNewNoteRef.operationName = 'CreateNewNote';

export function createNewNote(dcOrVars, vars) {
  return executeMutation(createNewNoteRef(dcOrVars, vars));
}

export const getMyNotesRef = (dc) => {
  const { dc: dcInstance} = validateArgs(connectorConfig, dc, undefined);
  dcInstance._useGeneratedSdk();
  return queryRef(dcInstance, 'GetMyNotes');
}
getMyNotesRef.operationName = 'GetMyNotes';

export function getMyNotes(dc) {
  return executeQuery(getMyNotesRef(dc));
}

export const updateNoteRef = (dcOrVars, vars) => {
  const { dc: dcInstance, vars: inputVars} = validateArgs(connectorConfig, dcOrVars, vars, true);
  dcInstance._useGeneratedSdk();
  return mutationRef(dcInstance, 'UpdateNote', inputVars);
}
updateNoteRef.operationName = 'UpdateNote';

export function updateNote(dcOrVars, vars) {
  return executeMutation(updateNoteRef(dcOrVars, vars));
}

export const deleteNoteRef = (dcOrVars, vars) => {
  const { dc: dcInstance, vars: inputVars} = validateArgs(connectorConfig, dcOrVars, vars, true);
  dcInstance._useGeneratedSdk();
  return mutationRef(dcInstance, 'DeleteNote', inputVars);
}
deleteNoteRef.operationName = 'DeleteNote';

export function deleteNote(dcOrVars, vars) {
  return executeMutation(deleteNoteRef(dcOrVars, vars));
}

