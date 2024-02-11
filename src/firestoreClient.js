const Firestore = require("@google-cloud/firestore");
const path = require("path");
const payload = require("./payload");

//cloud provider routing flags
const useMTChargerCloud = false;
const useDCChargerCloud = true;
//cloud provide routing flags

/**
 * @Class
 * @description FirestoreClient Class
 * @note a class that allows the interaction with Cloud Firestore
 */
class FirestoreClient {
  /**
   * @Member FirestoreClient Class
   * @Constructor
   */
  constructor() {
    if (useMTChargerCloud && !useDCChargerCloud) {
      this.firestore = new Firestore({
        projectId: "energystoragesystem",
        keyFilename: path.join(__dirname, "../keys/mtChargerCreds.json"),
      });
      console.log("Using MT_CHARGER_CLOUD!");
    } else if (useDCChargerCloud && !useMTChargerCloud) {
      this.firestore = new Firestore({
        projectId: "mt-energy-storage-system",
        keyFilename: path.join(__dirname, "../keys/dcChargerCreds.json"),
      });
      console.log("Using DC_CHARGER_CLOUD!");
    } else {
      console.error("NO CLOUD PROVIDER SPECIFIED");
    }
  }

  /**
   * @Member FirestoreClient Class
   * @async
   * @Method
   * @param {Any} collection collection id
   * @param {Object} data data
   * @description Method used for saving given data to a given collection located in Cloud Firestore
   */
  async save(collection, data) {
    console.log("Publishing to project:", this.firestore.projectId);
    const docRef = this.firestore.collection(collection).doc();
    await docRef.set(data);
  }

  /**
   * @Member FirestoreClient Class
   * @async
   * @Method
   * @param {Any} rootCol root collection id
   * @param {Any} rootDocName root document id
   * @param {Any} subCol sub collection id
   * @param {Object} subColData sub collection data
   * @description Method used for saving given data to a given sub collection located in Cloud Firestore
   */
  async saveSubCollection(rootCol, rootDocName, subCol, subColData) {
    console.log("Publishing to project:", this.firestore.projectId);
    const docRef = this.firestore
      .collection(rootCol)
      .doc(rootDocName)
      .collection(subCol)
      .doc(subColData.docName);
    await docRef.set(subCol);
  }

  /**
   * @Member FirestoreClient Class
   * @async
   * @Method
   * @param {String} path destination path
   * @param {Object} data data
   * @description Method used for saving given data to a given sub collection by its path located in Cloud Firestore
   */
  async saveByPath(path, data) {
    console.log("Publishing to project:", this.firestore.projectId);
    const docRef = this.firestore.doc(path);
    await docRef.set(data);
  }

  /**
   * @Member FirestoreClient Class
   * @async
   * @Method
   * @param {String} path destination path
   * @description Method used for retrieving given data from a given collection by its path located in Cloud Firestore
   */
  async getByPath(path) {
    const docRef = this.firestore.doc(path);
    const response = await docRef.get();
    return response.data();
  }

  /**
   * @Member FirestoreClient Class
   * @async
   * @Method
   * @param {String} colName collection name
   * @description Method used for retrieving given data from a given collection located in Cloud Firestore
   */
  async getCollection(colName) {
    const colRef = this.firestore.collection(colName);
    const response = await colRef.get();
    return response;
  }
}

module.exports = new FirestoreClient();
