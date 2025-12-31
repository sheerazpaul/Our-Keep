# Generated TypeScript README
This README will guide you through the process of using the generated JavaScript SDK package for the connector `example`. It will also provide examples on how to use your generated SDK to call your Data Connect queries and mutations.

**If you're looking for the `React README`, you can find it at [`dataconnect-generated/react/README.md`](./react/README.md)**

***NOTE:** This README is generated alongside the generated SDK. If you make changes to this file, they will be overwritten when the SDK is regenerated.*

# Table of Contents
- [**Overview**](#generated-javascript-readme)
- [**Accessing the connector**](#accessing-the-connector)
  - [*Connecting to the local Emulator*](#connecting-to-the-local-emulator)
- [**Queries**](#queries)
  - [*GetMyNotes*](#getmynotes)
- [**Mutations**](#mutations)
  - [*CreateNewNote*](#createnewnote)
  - [*UpdateNote*](#updatenote)
  - [*DeleteNote*](#deletenote)

# Accessing the connector
A connector is a collection of Queries and Mutations. One SDK is generated for each connector - this SDK is generated for the connector `example`. You can find more information about connectors in the [Data Connect documentation](https://firebase.google.com/docs/data-connect#how-does).

You can use this generated SDK by importing from the package `@dataconnect/generated` as shown below. Both CommonJS and ESM imports are supported.

You can also follow the instructions from the [Data Connect documentation](https://firebase.google.com/docs/data-connect/web-sdk#set-client).

```typescript
import { getDataConnect } from 'firebase/data-connect';
import { connectorConfig } from '@dataconnect/generated';

const dataConnect = getDataConnect(connectorConfig);
```

## Connecting to the local Emulator
By default, the connector will connect to the production service.

To connect to the emulator, you can use the following code.
You can also follow the emulator instructions from the [Data Connect documentation](https://firebase.google.com/docs/data-connect/web-sdk#instrument-clients).

```typescript
import { connectDataConnectEmulator, getDataConnect } from 'firebase/data-connect';
import { connectorConfig } from '@dataconnect/generated';

const dataConnect = getDataConnect(connectorConfig);
connectDataConnectEmulator(dataConnect, 'localhost', 9399);
```

After it's initialized, you can call your Data Connect [queries](#queries) and [mutations](#mutations) from your generated SDK.

# Queries

There are two ways to execute a Data Connect Query using the generated Web SDK:
- Using a Query Reference function, which returns a `QueryRef`
  - The `QueryRef` can be used as an argument to `executeQuery()`, which will execute the Query and return a `QueryPromise`
- Using an action shortcut function, which returns a `QueryPromise`
  - Calling the action shortcut function will execute the Query and return a `QueryPromise`

The following is true for both the action shortcut function and the `QueryRef` function:
- The `QueryPromise` returned will resolve to the result of the Query once it has finished executing
- If the Query accepts arguments, both the action shortcut function and the `QueryRef` function accept a single argument: an object that contains all the required variables (and the optional variables) for the Query
- Both functions can be called with or without passing in a `DataConnect` instance as an argument. If no `DataConnect` argument is passed in, then the generated SDK will call `getDataConnect(connectorConfig)` behind the scenes for you.

Below are examples of how to use the `example` connector's generated functions to execute each query. You can also follow the examples from the [Data Connect documentation](https://firebase.google.com/docs/data-connect/web-sdk#using-queries).

## GetMyNotes
You can execute the `GetMyNotes` query using the following action shortcut function, or by calling `executeQuery()` after calling the following `QueryRef` function, both of which are defined in [dataconnect-generated/index.d.ts](./index.d.ts):
```typescript
getMyNotes(): QueryPromise<GetMyNotesData, undefined>;

interface GetMyNotesRef {
  ...
  /* Allow users to create refs without passing in DataConnect */
  (): QueryRef<GetMyNotesData, undefined>;
}
export const getMyNotesRef: GetMyNotesRef;
```
You can also pass in a `DataConnect` instance to the action shortcut function or `QueryRef` function.
```typescript
getMyNotes(dc: DataConnect): QueryPromise<GetMyNotesData, undefined>;

interface GetMyNotesRef {
  ...
  (dc: DataConnect): QueryRef<GetMyNotesData, undefined>;
}
export const getMyNotesRef: GetMyNotesRef;
```

If you need the name of the operation without creating a ref, you can retrieve the operation name by calling the `operationName` property on the getMyNotesRef:
```typescript
const name = getMyNotesRef.operationName;
console.log(name);
```

### Variables
The `GetMyNotes` query has no variables.
### Return Type
Recall that executing the `GetMyNotes` query returns a `QueryPromise` that resolves to an object with a `data` property.

The `data` property is an object of type `GetMyNotesData`, which is defined in [dataconnect-generated/index.d.ts](./index.d.ts). It has the following fields:
```typescript
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
```
### Using `GetMyNotes`'s action shortcut function

```typescript
import { getDataConnect } from 'firebase/data-connect';
import { connectorConfig, getMyNotes } from '@dataconnect/generated';


// Call the `getMyNotes()` function to execute the query.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await getMyNotes();

// You can also pass in a `DataConnect` instance to the action shortcut function.
const dataConnect = getDataConnect(connectorConfig);
const { data } = await getMyNotes(dataConnect);

console.log(data.notes);

// Or, you can use the `Promise` API.
getMyNotes().then((response) => {
  const data = response.data;
  console.log(data.notes);
});
```

### Using `GetMyNotes`'s `QueryRef` function

```typescript
import { getDataConnect, executeQuery } from 'firebase/data-connect';
import { connectorConfig, getMyNotesRef } from '@dataconnect/generated';


// Call the `getMyNotesRef()` function to get a reference to the query.
const ref = getMyNotesRef();

// You can also pass in a `DataConnect` instance to the `QueryRef` function.
const dataConnect = getDataConnect(connectorConfig);
const ref = getMyNotesRef(dataConnect);

// Call `executeQuery()` on the reference to execute the query.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await executeQuery(ref);

console.log(data.notes);

// Or, you can use the `Promise` API.
executeQuery(ref).then((response) => {
  const data = response.data;
  console.log(data.notes);
});
```

# Mutations

There are two ways to execute a Data Connect Mutation using the generated Web SDK:
- Using a Mutation Reference function, which returns a `MutationRef`
  - The `MutationRef` can be used as an argument to `executeMutation()`, which will execute the Mutation and return a `MutationPromise`
- Using an action shortcut function, which returns a `MutationPromise`
  - Calling the action shortcut function will execute the Mutation and return a `MutationPromise`

The following is true for both the action shortcut function and the `MutationRef` function:
- The `MutationPromise` returned will resolve to the result of the Mutation once it has finished executing
- If the Mutation accepts arguments, both the action shortcut function and the `MutationRef` function accept a single argument: an object that contains all the required variables (and the optional variables) for the Mutation
- Both functions can be called with or without passing in a `DataConnect` instance as an argument. If no `DataConnect` argument is passed in, then the generated SDK will call `getDataConnect(connectorConfig)` behind the scenes for you.

Below are examples of how to use the `example` connector's generated functions to execute each mutation. You can also follow the examples from the [Data Connect documentation](https://firebase.google.com/docs/data-connect/web-sdk#using-mutations).

## CreateNewNote
You can execute the `CreateNewNote` mutation using the following action shortcut function, or by calling `executeMutation()` after calling the following `MutationRef` function, both of which are defined in [dataconnect-generated/index.d.ts](./index.d.ts):
```typescript
createNewNote(vars: CreateNewNoteVariables): MutationPromise<CreateNewNoteData, CreateNewNoteVariables>;

interface CreateNewNoteRef {
  ...
  /* Allow users to create refs without passing in DataConnect */
  (vars: CreateNewNoteVariables): MutationRef<CreateNewNoteData, CreateNewNoteVariables>;
}
export const createNewNoteRef: CreateNewNoteRef;
```
You can also pass in a `DataConnect` instance to the action shortcut function or `MutationRef` function.
```typescript
createNewNote(dc: DataConnect, vars: CreateNewNoteVariables): MutationPromise<CreateNewNoteData, CreateNewNoteVariables>;

interface CreateNewNoteRef {
  ...
  (dc: DataConnect, vars: CreateNewNoteVariables): MutationRef<CreateNewNoteData, CreateNewNoteVariables>;
}
export const createNewNoteRef: CreateNewNoteRef;
```

If you need the name of the operation without creating a ref, you can retrieve the operation name by calling the `operationName` property on the createNewNoteRef:
```typescript
const name = createNewNoteRef.operationName;
console.log(name);
```

### Variables
The `CreateNewNote` mutation requires an argument of type `CreateNewNoteVariables`, which is defined in [dataconnect-generated/index.d.ts](./index.d.ts). It has the following fields:

```typescript
export interface CreateNewNoteVariables {
  title: string;
  content: string;
  isFavorite?: boolean | null;
}
```
### Return Type
Recall that executing the `CreateNewNote` mutation returns a `MutationPromise` that resolves to an object with a `data` property.

The `data` property is an object of type `CreateNewNoteData`, which is defined in [dataconnect-generated/index.d.ts](./index.d.ts). It has the following fields:
```typescript
export interface CreateNewNoteData {
  note_insert: Note_Key;
}
```
### Using `CreateNewNote`'s action shortcut function

```typescript
import { getDataConnect } from 'firebase/data-connect';
import { connectorConfig, createNewNote, CreateNewNoteVariables } from '@dataconnect/generated';

// The `CreateNewNote` mutation requires an argument of type `CreateNewNoteVariables`:
const createNewNoteVars: CreateNewNoteVariables = {
  title: ..., 
  content: ..., 
  isFavorite: ..., // optional
};

// Call the `createNewNote()` function to execute the mutation.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await createNewNote(createNewNoteVars);
// Variables can be defined inline as well.
const { data } = await createNewNote({ title: ..., content: ..., isFavorite: ..., });

// You can also pass in a `DataConnect` instance to the action shortcut function.
const dataConnect = getDataConnect(connectorConfig);
const { data } = await createNewNote(dataConnect, createNewNoteVars);

console.log(data.note_insert);

// Or, you can use the `Promise` API.
createNewNote(createNewNoteVars).then((response) => {
  const data = response.data;
  console.log(data.note_insert);
});
```

### Using `CreateNewNote`'s `MutationRef` function

```typescript
import { getDataConnect, executeMutation } from 'firebase/data-connect';
import { connectorConfig, createNewNoteRef, CreateNewNoteVariables } from '@dataconnect/generated';

// The `CreateNewNote` mutation requires an argument of type `CreateNewNoteVariables`:
const createNewNoteVars: CreateNewNoteVariables = {
  title: ..., 
  content: ..., 
  isFavorite: ..., // optional
};

// Call the `createNewNoteRef()` function to get a reference to the mutation.
const ref = createNewNoteRef(createNewNoteVars);
// Variables can be defined inline as well.
const ref = createNewNoteRef({ title: ..., content: ..., isFavorite: ..., });

// You can also pass in a `DataConnect` instance to the `MutationRef` function.
const dataConnect = getDataConnect(connectorConfig);
const ref = createNewNoteRef(dataConnect, createNewNoteVars);

// Call `executeMutation()` on the reference to execute the mutation.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await executeMutation(ref);

console.log(data.note_insert);

// Or, you can use the `Promise` API.
executeMutation(ref).then((response) => {
  const data = response.data;
  console.log(data.note_insert);
});
```

## UpdateNote
You can execute the `UpdateNote` mutation using the following action shortcut function, or by calling `executeMutation()` after calling the following `MutationRef` function, both of which are defined in [dataconnect-generated/index.d.ts](./index.d.ts):
```typescript
updateNote(vars: UpdateNoteVariables): MutationPromise<UpdateNoteData, UpdateNoteVariables>;

interface UpdateNoteRef {
  ...
  /* Allow users to create refs without passing in DataConnect */
  (vars: UpdateNoteVariables): MutationRef<UpdateNoteData, UpdateNoteVariables>;
}
export const updateNoteRef: UpdateNoteRef;
```
You can also pass in a `DataConnect` instance to the action shortcut function or `MutationRef` function.
```typescript
updateNote(dc: DataConnect, vars: UpdateNoteVariables): MutationPromise<UpdateNoteData, UpdateNoteVariables>;

interface UpdateNoteRef {
  ...
  (dc: DataConnect, vars: UpdateNoteVariables): MutationRef<UpdateNoteData, UpdateNoteVariables>;
}
export const updateNoteRef: UpdateNoteRef;
```

If you need the name of the operation without creating a ref, you can retrieve the operation name by calling the `operationName` property on the updateNoteRef:
```typescript
const name = updateNoteRef.operationName;
console.log(name);
```

### Variables
The `UpdateNote` mutation requires an argument of type `UpdateNoteVariables`, which is defined in [dataconnect-generated/index.d.ts](./index.d.ts). It has the following fields:

```typescript
export interface UpdateNoteVariables {
  id: UUIDString;
  title?: string | null;
  content?: string | null;
  isFavorite?: boolean | null;
}
```
### Return Type
Recall that executing the `UpdateNote` mutation returns a `MutationPromise` that resolves to an object with a `data` property.

The `data` property is an object of type `UpdateNoteData`, which is defined in [dataconnect-generated/index.d.ts](./index.d.ts). It has the following fields:
```typescript
export interface UpdateNoteData {
  note_update?: Note_Key | null;
}
```
### Using `UpdateNote`'s action shortcut function

```typescript
import { getDataConnect } from 'firebase/data-connect';
import { connectorConfig, updateNote, UpdateNoteVariables } from '@dataconnect/generated';

// The `UpdateNote` mutation requires an argument of type `UpdateNoteVariables`:
const updateNoteVars: UpdateNoteVariables = {
  id: ..., 
  title: ..., // optional
  content: ..., // optional
  isFavorite: ..., // optional
};

// Call the `updateNote()` function to execute the mutation.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await updateNote(updateNoteVars);
// Variables can be defined inline as well.
const { data } = await updateNote({ id: ..., title: ..., content: ..., isFavorite: ..., });

// You can also pass in a `DataConnect` instance to the action shortcut function.
const dataConnect = getDataConnect(connectorConfig);
const { data } = await updateNote(dataConnect, updateNoteVars);

console.log(data.note_update);

// Or, you can use the `Promise` API.
updateNote(updateNoteVars).then((response) => {
  const data = response.data;
  console.log(data.note_update);
});
```

### Using `UpdateNote`'s `MutationRef` function

```typescript
import { getDataConnect, executeMutation } from 'firebase/data-connect';
import { connectorConfig, updateNoteRef, UpdateNoteVariables } from '@dataconnect/generated';

// The `UpdateNote` mutation requires an argument of type `UpdateNoteVariables`:
const updateNoteVars: UpdateNoteVariables = {
  id: ..., 
  title: ..., // optional
  content: ..., // optional
  isFavorite: ..., // optional
};

// Call the `updateNoteRef()` function to get a reference to the mutation.
const ref = updateNoteRef(updateNoteVars);
// Variables can be defined inline as well.
const ref = updateNoteRef({ id: ..., title: ..., content: ..., isFavorite: ..., });

// You can also pass in a `DataConnect` instance to the `MutationRef` function.
const dataConnect = getDataConnect(connectorConfig);
const ref = updateNoteRef(dataConnect, updateNoteVars);

// Call `executeMutation()` on the reference to execute the mutation.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await executeMutation(ref);

console.log(data.note_update);

// Or, you can use the `Promise` API.
executeMutation(ref).then((response) => {
  const data = response.data;
  console.log(data.note_update);
});
```

## DeleteNote
You can execute the `DeleteNote` mutation using the following action shortcut function, or by calling `executeMutation()` after calling the following `MutationRef` function, both of which are defined in [dataconnect-generated/index.d.ts](./index.d.ts):
```typescript
deleteNote(vars: DeleteNoteVariables): MutationPromise<DeleteNoteData, DeleteNoteVariables>;

interface DeleteNoteRef {
  ...
  /* Allow users to create refs without passing in DataConnect */
  (vars: DeleteNoteVariables): MutationRef<DeleteNoteData, DeleteNoteVariables>;
}
export const deleteNoteRef: DeleteNoteRef;
```
You can also pass in a `DataConnect` instance to the action shortcut function or `MutationRef` function.
```typescript
deleteNote(dc: DataConnect, vars: DeleteNoteVariables): MutationPromise<DeleteNoteData, DeleteNoteVariables>;

interface DeleteNoteRef {
  ...
  (dc: DataConnect, vars: DeleteNoteVariables): MutationRef<DeleteNoteData, DeleteNoteVariables>;
}
export const deleteNoteRef: DeleteNoteRef;
```

If you need the name of the operation without creating a ref, you can retrieve the operation name by calling the `operationName` property on the deleteNoteRef:
```typescript
const name = deleteNoteRef.operationName;
console.log(name);
```

### Variables
The `DeleteNote` mutation requires an argument of type `DeleteNoteVariables`, which is defined in [dataconnect-generated/index.d.ts](./index.d.ts). It has the following fields:

```typescript
export interface DeleteNoteVariables {
  id: UUIDString;
}
```
### Return Type
Recall that executing the `DeleteNote` mutation returns a `MutationPromise` that resolves to an object with a `data` property.

The `data` property is an object of type `DeleteNoteData`, which is defined in [dataconnect-generated/index.d.ts](./index.d.ts). It has the following fields:
```typescript
export interface DeleteNoteData {
  note_delete?: Note_Key | null;
}
```
### Using `DeleteNote`'s action shortcut function

```typescript
import { getDataConnect } from 'firebase/data-connect';
import { connectorConfig, deleteNote, DeleteNoteVariables } from '@dataconnect/generated';

// The `DeleteNote` mutation requires an argument of type `DeleteNoteVariables`:
const deleteNoteVars: DeleteNoteVariables = {
  id: ..., 
};

// Call the `deleteNote()` function to execute the mutation.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await deleteNote(deleteNoteVars);
// Variables can be defined inline as well.
const { data } = await deleteNote({ id: ..., });

// You can also pass in a `DataConnect` instance to the action shortcut function.
const dataConnect = getDataConnect(connectorConfig);
const { data } = await deleteNote(dataConnect, deleteNoteVars);

console.log(data.note_delete);

// Or, you can use the `Promise` API.
deleteNote(deleteNoteVars).then((response) => {
  const data = response.data;
  console.log(data.note_delete);
});
```

### Using `DeleteNote`'s `MutationRef` function

```typescript
import { getDataConnect, executeMutation } from 'firebase/data-connect';
import { connectorConfig, deleteNoteRef, DeleteNoteVariables } from '@dataconnect/generated';

// The `DeleteNote` mutation requires an argument of type `DeleteNoteVariables`:
const deleteNoteVars: DeleteNoteVariables = {
  id: ..., 
};

// Call the `deleteNoteRef()` function to get a reference to the mutation.
const ref = deleteNoteRef(deleteNoteVars);
// Variables can be defined inline as well.
const ref = deleteNoteRef({ id: ..., });

// You can also pass in a `DataConnect` instance to the `MutationRef` function.
const dataConnect = getDataConnect(connectorConfig);
const ref = deleteNoteRef(dataConnect, deleteNoteVars);

// Call `executeMutation()` on the reference to execute the mutation.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await executeMutation(ref);

console.log(data.note_delete);

// Or, you can use the `Promise` API.
executeMutation(ref).then((response) => {
  const data = response.data;
  console.log(data.note_delete);
});
```

