const FirestoreClient = require("./firestoreClient.js");

/**
 * @Member firestoreCoop Module
 * @async
 * @Function
 * @param {Any} collection destination collection
 * @param {Object} payload payload to be saved
 * @description Function responsible for publishing given data into a given collection located in Cloud Firestore
 */
const firestoreWrite = async (collection, payload) => {
  console.log("Publishing message directly to Firestore:");
  await FirestoreClient.save(collection, payload);
};

/**
 * @Member firestoreCoop Module
 * @async
 * @Function
 * @param {Any} collection collection
 * @param {Any} docName document name
 * @param {Any} subCol subcollection name
 * @param {Object} payload payload to be saved
 * @description Function responsible for saving given data into a given subcollection
 */
const saveSubcollection = async (collection, docName, subCol, payload) => {
  await FirestoreClient.saveSubCollection(collection, docName, subCol, payload);
};

/**
 * @Member firestoreCoop Module
 * @async
 * @Function
 * @param {Any} path path
 * @param {Object} payload payload to be saved
 * @description Function responsible for saving given data into a given subcollection by its path
 */
const saveByPath = async (path, payload) => {
  await FirestoreClient.saveByPath(path, payload);
};

/**
 * @Member firestoreCoop Module
 * @async
 * @Function
 * @param {Any} path path
 * @description Function responsible for retrieving given data from a given collection or subcollection by its path
 */
const getByPath = async (path) => {
  const result = await FirestoreClient.getByPath(
    "restaurants/burgerHut/reviews/secondReview"
  );
  console.log(result);
};

/**
 * @Member firestoreCoop Module
 * @async
 * @Function
 * @param {Any} collection collection
 * @description Function responsible for retrieving given collection
 */
const getCollection = async (collection) => {
  const result = await FirestoreClient.getCollection("ESS-DATA");
  console.log("DOCS:", result.docs);
  console.log("ID:", result);
};

module.exports = {
  firestoreWrite: firestoreWrite,
  saveSubcollection: saveSubcollection,
  saveByPath: saveByPath,
  getByPath: getByPath,
  getCollection: getCollection,
};
