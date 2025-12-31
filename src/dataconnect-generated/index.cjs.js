const { queryRef, executeQuery, mutationRef, executeMutation, validateArgs } = require('firebase/data-connect');

const connectorConfig = {
  connector: 'example',
  service: 'ourkeep',
  location: 'us-east4'
};
exports.connectorConfig = connectorConfig;

const createNewNoteRef = (dcOrVars, vars) => {
  const { dc: dcInstance, vars: inputVars} = validateArgs(connectorConfig, dcOrVars, vars, true);
  dcInstance._useGeneratedSdk();
  return mutationRef(dcInstance, 'CreateNewNote', inputVars);
}
createNewNoteRef.operationName = 'CreateNewNote';
exports.createNewNoteRef = createNewNoteRef;

exports.createNewNote = function createNewNote(dcOrVars, vars) {
  return executeMutation(createNewNoteRef(dcOrVars, vars));
};

const getMyNotesRef = (dc) => {
  const { dc: dcInstance} = validateArgs(connectorConfig, dc, undefined);
  dcInstance._useGeneratedSdk();
  return queryRef(dcInstance, 'GetMyNotes');
}
getMyNotesRef.operationName = 'GetMyNotes';
exports.getMyNotesRef = getMyNotesRef;

exports.getMyNotes = function getMyNotes(dc) {
  return executeQuery(getMyNotesRef(dc));
};

const updateNoteRef = (dcOrVars, vars) => {
  const { dc: dcInstance, vars: inputVars} = validateArgs(connectorConfig, dcOrVars, vars, true);
  dcInstance._useGeneratedSdk();
  return mutationRef(dcInstance, 'UpdateNote', inputVars);
}
updateNoteRef.operationName = 'UpdateNote';
exports.updateNoteRef = updateNoteRef;

exports.updateNote = function updateNote(dcOrVars, vars) {
  return executeMutation(updateNoteRef(dcOrVars, vars));
};

const deleteNoteRef = (dcOrVars, vars) => {
  const { dc: dcInstance, vars: inputVars} = validateArgs(connectorConfig, dcOrVars, vars, true);
  dcInstance._useGeneratedSdk();
  return mutationRef(dcInstance, 'DeleteNote', inputVars);
}
deleteNoteRef.operationName = 'DeleteNote';
exports.deleteNoteRef = deleteNoteRef;

exports.deleteNote = function deleteNote(dcOrVars, vars) {
  return executeMutation(deleteNoteRef(dcOrVars, vars));
};
